package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Role;
import com.senderbr.ilhapetslz.enums.AccessLevel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByAuthority(AccessLevel roleClient);
}
