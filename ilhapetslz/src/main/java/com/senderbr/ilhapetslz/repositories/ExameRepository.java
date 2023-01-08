package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Exame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExameRepository extends JpaRepository<Exame,Long> {

    Page<Exame>  findByNameContainingIgnoreCase(String term, Pageable pageable);

    List<Exame> findByNameContainingIgnoreCase(String term);

}
