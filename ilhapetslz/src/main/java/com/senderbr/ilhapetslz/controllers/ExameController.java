package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Exame;
import com.senderbr.ilhapetslz.services.ExameServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exame")
public class ExameController {
    @Autowired
    ExameServices exameServices;

    @PostMapping
    ResponseEntity<Exame> post(@RequestBody Exame exame){
        return ResponseEntity.status(HttpStatus.CREATED).body(exameServices.post(exame));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Exame>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(exameServices.get(pageable));
    }

    @GetMapping("/search")
    ResponseEntity<Page<Exame>> getSearchAllPaginated(@RequestParam String term,Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(exameServices.getByNameLike(term,pageable));
    }

    @GetMapping("/list")
    ResponseEntity<List<Exame>> getSearchAllNotPaginated(@RequestParam String term){
        return ResponseEntity.status(HttpStatus.OK).body(exameServices.getByNameLikeListed(term));
    }

    @GetMapping("{exameId}")
    ResponseEntity<Exame> getById(@PathVariable("exameId") Long exameId){
        return ResponseEntity.status(HttpStatus.OK).body(exameServices.getById(exameId));
    }

    @PutMapping("{exameId}")
    ResponseEntity<Exame> put(@PathVariable("exameId") Long exameId,
                                @RequestBody Exame exame){
        return ResponseEntity.status(HttpStatus.OK).body(exameServices.put(exameId,exame));
    }

    @DeleteMapping("{exameId}")
    ResponseEntity<Void> delete(@PathVariable("exameId") Long exameId){
        exameServices.delete(exameId);
        return ResponseEntity.noContent().build();
    }
}
