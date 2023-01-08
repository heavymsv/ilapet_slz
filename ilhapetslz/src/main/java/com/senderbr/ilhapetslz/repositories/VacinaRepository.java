package com.senderbr.ilhapetslz.repositories;


import com.senderbr.ilhapetslz.entities.Vacina;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacinaRepository extends JpaRepository<Vacina, Long> {
    Page<Vacina> findByNameContainingIgnoreCase(String term, Pageable pageable);
    List<Vacina> findByNameContainingIgnoreCase(String term);
}
