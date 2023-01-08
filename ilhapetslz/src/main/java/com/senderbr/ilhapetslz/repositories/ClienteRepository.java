package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,Long> {

    Cliente findByName(String name);
    Cliente findByEmail(String email);

    Page<Cliente> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Cliente> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email, Pageable pageable);
    List<Cliente> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);

}
