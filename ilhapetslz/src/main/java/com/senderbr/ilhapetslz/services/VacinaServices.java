package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Blog;
import com.senderbr.ilhapetslz.entities.Vacina;
import com.senderbr.ilhapetslz.repositories.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class VacinaServices {

    @Autowired
    VacinaRepository repository;

    @Transactional
    public Vacina post(Vacina vacina){return repository.save(vacina);}

    public Page<Vacina> get(Pageable pageable){return repository.findAll(pageable);}

    public Page<Vacina> getByNameLike(String term, Pageable pageable){return repository.findByNameContainingIgnoreCase(term,pageable);}

    public List<Vacina> getByNameLikeListed(String term){return repository.findByNameContainingIgnoreCase(term);}

    public Vacina getById(Long id){
        Optional<Vacina> optVacina = repository.findById(id);
        Vacina vacina = optVacina.orElseThrow(()->new EntityNotFoundException("No such Vacina"));
        return vacina;
    }

    public Vacina put(Long id, Vacina vacina){
        Vacina oldVacina = this.getById(id);
        oldVacina.setName(vacina.getName());
        oldVacina.setDoses(vacina.getDoses());

        return this.post(oldVacina);
    }

    @Transactional
    public void delete(Long id){
        Vacina oldVacina = this.getById(id);

        repository.delete(oldVacina);
    }



}
