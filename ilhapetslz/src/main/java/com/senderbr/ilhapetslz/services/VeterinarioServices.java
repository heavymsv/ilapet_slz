package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Blog;
import com.senderbr.ilhapetslz.entities.Veterinario;
import com.senderbr.ilhapetslz.repositories.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class VeterinarioServices {

    @Autowired
    VeterinarioRepository repository;

    @Transactional
    public Veterinario post(Veterinario veterinario){return repository.save(veterinario);}

    public Page<Veterinario> get(Pageable pageable){return repository.findAll(pageable);}

    public Page<Veterinario> getByNameLike(String term, Pageable pageable){return repository.findByNameContainingIgnoreCase(term,pageable);}

    public List<Veterinario> getByNameLikeListed(String term){return repository.findByNameContainingIgnoreCase(term);}

    public Veterinario getById(Long id){
        Optional<Veterinario> optVeterinario = repository.findById(id);
        Veterinario veterinario = optVeterinario.orElseThrow(()->new EntityNotFoundException("No such Post"));
        return veterinario;
    }

    public Veterinario put(Long id, Veterinario veterinario){
        Veterinario oldVeterinario = this.getById(id);
        oldVeterinario.setName(veterinario.getName());

        return this.post(oldVeterinario);
    }

    @Transactional
    public void delete(Long id){
        Veterinario oldVeterinario = this.getById(id);

        repository.delete(oldVeterinario);
    }

}
