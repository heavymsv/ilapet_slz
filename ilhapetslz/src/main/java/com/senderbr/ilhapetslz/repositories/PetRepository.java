package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet,Long> {
    List<Pet> findByNameContainingIgnoreCaseAndUserId(String term, Long id);
    List<Pet> findByUserId(Long id);
}
