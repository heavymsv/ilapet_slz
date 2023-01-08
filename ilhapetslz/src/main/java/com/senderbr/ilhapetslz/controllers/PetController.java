package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Pet;
import com.senderbr.ilhapetslz.services.PetServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    PetServices petServices;

    @PostMapping
    ResponseEntity<Pet> post(@RequestBody Pet pet){
        return ResponseEntity.status(HttpStatus.CREATED).body(petServices.post(pet));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Pet>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(petServices.get(pageable));
    }

    @GetMapping("/list")
    ResponseEntity<List<Pet>> getSearchAllNotPaginated(@RequestParam String term,@RequestParam Long clienteId){
        return ResponseEntity.status(HttpStatus.OK).body(petServices.getByNameLike(term,clienteId));
    }

    @GetMapping("/owner")
    ResponseEntity<List<Pet>> getSearchAllByOwner(@RequestParam Long id){
        return ResponseEntity.status(HttpStatus.OK).body(petServices.getByOwner(id));
    }

    @GetMapping("{petId}")
    ResponseEntity<Pet> getById(@PathVariable("petId") Long petId){
        return ResponseEntity.status(HttpStatus.OK).body(petServices.getById(petId));
    }

    @PutMapping("{petId}")
    ResponseEntity<Pet> put(@PathVariable("petId") Long petId,
                              @RequestBody Pet pet){
        return ResponseEntity.status(HttpStatus.OK).body(petServices.put(petId,pet));
    }

    @DeleteMapping("{petId}")
    ResponseEntity<Void> delete(@PathVariable("petId") Long petId){
        petServices.delete(petId);
        return ResponseEntity.noContent().build();
    }
}
