package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Exame;
import com.senderbr.ilhapetslz.repositories.ExameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ExameServices {

    @Autowired
    ExameRepository repository;

    @Transactional
    public Exame post(Exame exame){
        return repository.save(exame);
    }

    public Page<Exame> get(Pageable pageable){return repository.findAll(pageable);}

    public Page<Exame> getByNameLike(String term, Pageable pageable){return repository.findByNameContainingIgnoreCase(term,pageable);}

    public List<Exame> getByNameLikeListed(String term){return repository.findByNameContainingIgnoreCase(term);}

    public Exame getById(Long id){
        Optional<Exame> optExame = repository.findById(id);
        Exame exame = optExame.orElseThrow(()->new EntityNotFoundException("No such Exam"));
        return exame;
    }

    public Exame put(Long id, Exame exame){
        Exame oldExame = this.getById(id);
        oldExame.setName(exame.getName());

        return this.post(oldExame);
    }

    @Transactional
    public void delete(Long id){
        Exame oldExame = this.getById(id);

        repository.delete(oldExame);
    }

}
