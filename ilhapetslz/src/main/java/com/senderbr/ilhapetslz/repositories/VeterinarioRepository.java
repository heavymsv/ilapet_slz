package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Veterinario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {

    Page<Veterinario> findByNameContainingIgnoreCase(String term, Pageable pageable);
    List<Veterinario> findByNameContainingIgnoreCase(String term);


}
