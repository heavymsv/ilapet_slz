package com.senderbr.ilhapetslz.repositories;

import com.senderbr.ilhapetslz.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;



@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {



    Page<Blog> findAllByOrderByDataPub(Pageable pageable);

    List<Blog> findTop3ByOrderByDataPub();



    Page<Blog> findByTituloContainingIgnoreCase(String term, Pageable pageable);
}

