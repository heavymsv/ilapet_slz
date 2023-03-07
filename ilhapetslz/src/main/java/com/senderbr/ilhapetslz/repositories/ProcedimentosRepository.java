package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Procedimentos;
import com.senderbr.ilhapetslz.entities.Veterinario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProcedimentosRepository extends JpaRepository<Procedimentos,Long> {

    Page<Procedimentos> findByPendenteFalseOrderByDate(Pageable pageable);
    Page<Procedimentos> findByPendenteTrueOrderByDate(Pageable pageable);
    List<Procedimentos> findByPetId(Long id);
    Page<Procedimentos> findByVeterinarioId(Long id, Pageable pageable);
    List<Procedimentos> findByPetUserIdAndPendenteFalseOrderByDate(Long clienteId);

    Page<Procedimentos> findByPetNameContainingAndPendenteEqualsOrderByDate(String name, boolean pendente, Pageable pageable);

    Page<Procedimentos> findByVeterinarioNameContainingAndPendenteEqualsOrderByDate(String name, boolean pendente, Pageable pageable);

    Page<Procedimentos> findByPetUserUsernameContainingAndPendenteEqualsOrderByDate(String name, boolean pendente, Pageable pageable);

    List<Procedimentos> findByProcedimentoIdAndDateAndVeterinario(int procedimentoId, LocalDateTime date, Veterinario veterinario);
}
