package com.senderbr.ilhapetslz.repositories;


import com.senderbr.ilhapetslz.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByName(String username);
    Page<User> findByUsernameContainingIgnoreCase(String searchTerm, Pageable pageable);
    Optional<User> findUserByEmail(String username);

}
