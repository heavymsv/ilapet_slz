package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Cliente;
import com.senderbr.ilhapetslz.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServices {

    @Autowired
    ClienteRepository repository;

    @Transactional
    public Cliente post(Cliente cliente){
        Cliente clienteRepetido = repository.findByEmail(cliente.getEmail());
        if(clienteRepetido!=null){
            if(cliente.getId() != clienteRepetido.getId()){
                throw new IllegalArgumentException("E-mail is a unique field");
            }
        }

        return repository.save(cliente);
    }

    public Page<Cliente> get(Pageable pageable){return repository.findAll(pageable);}

    public Page<Cliente> getByNameLike(String term, Pageable pageable){return repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(term,term,pageable);}

    public List<Cliente> getByNameLikeList(String term){return repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(term,term);}

    public Cliente getById(Long id){
        Optional<Cliente> optCliente = repository.findById(id);
        Cliente cliente = optCliente.orElseThrow(()->new EntityNotFoundException("No such Cliente"));
        return cliente;
    }

    public Cliente put(Long id, Cliente cliente){
        Cliente oldCliente = this.getById(id);
        oldCliente.setName(cliente.getName());
        oldCliente.setEmail(cliente.getEmail());

        return this.post(oldCliente);
    }

    @Transactional
    public void delete(Long id){
        Cliente oldCliente = this.getById(id);

        repository.delete(oldCliente);
    }

    public Cliente getByName(String name) {
        Cliente opt = repository.findByEmail(name);
        return opt;
    }
}
