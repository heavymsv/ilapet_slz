package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Blog;
import com.senderbr.ilhapetslz.entities.Pet;
import com.senderbr.ilhapetslz.repositories.ClienteRepository;
import com.senderbr.ilhapetslz.repositories.PetRepository;
import com.senderbr.ilhapetslz.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class PetServices {

    @Autowired
    PetRepository repository;

    @Autowired
    UserService userService;

    @Transactional
    public Pet post(Pet pet){

        pet.setUser(userService.getUserById(pet.getUser().getId()));

        return repository.save(pet);
    }

    public Page<Pet> get(Pageable pageable){return repository.findAll(pageable);}

    public List<Pet> getByNameLike(String term, Long idCliente){return repository.findByNameContainingIgnoreCaseAndUserId(term,idCliente);}

    public Pet getById(Long id){
        Optional<Pet> optPet = repository.findById(id);
        Pet pet = optPet.orElseThrow(()->new EntityNotFoundException("No such Pet"));
        return pet;
    }

    public Pet put(Long id, Pet pet){
        Pet oldPet = this.getById(id);
        oldPet.setName(pet.getName());

        return this.post(oldPet);
    }

    @Transactional
    public void delete(Long id){
        Pet oldPet = this.getById(id);

        repository.delete(oldPet);
    }

    public List<Pet> getByOwner(Long id) {
        return repository.findByUserId(id);
    }
}
