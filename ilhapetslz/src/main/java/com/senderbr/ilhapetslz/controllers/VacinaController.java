package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Pet;
import com.senderbr.ilhapetslz.entities.Vacina;
import com.senderbr.ilhapetslz.services.VacinaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vacina")
public class VacinaController {

    @Autowired
    VacinaServices vacinaServices;

    @PostMapping
    ResponseEntity<Vacina> post(@RequestBody Vacina vacina){
        return ResponseEntity.status(HttpStatus.CREATED).body(vacinaServices.post(vacina));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Vacina>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(vacinaServices.get(pageable));
    }

    @GetMapping("/search")
    ResponseEntity<Page<Vacina>> getAllPaginated(@RequestParam String term,Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(vacinaServices.getByNameLike(term,pageable));
    }

    @GetMapping("/list")
    ResponseEntity<List<Vacina>> getSearchAllNotPaginated(@RequestParam String term){
        return ResponseEntity.status(HttpStatus.OK).body(vacinaServices.getByNameLikeListed(term));
    }

    @GetMapping("{vacinaId}")
    ResponseEntity<Vacina> getById(@PathVariable("vacinaId") Long vacinaId){
        return ResponseEntity.status(HttpStatus.OK).body(vacinaServices.getById(vacinaId));
    }

    @PutMapping("{vacinaId}")
    ResponseEntity<Vacina> put(@PathVariable("vacinaId") Long vacinaId,
                            @RequestBody Vacina vacina){
        return ResponseEntity.status(HttpStatus.OK).body(vacinaServices.put(vacinaId,vacina));
    }

    @DeleteMapping("{vacinaId}")
    ResponseEntity<Void> delete(@PathVariable("vacinaId") Long vacinaId){
        vacinaServices.delete(vacinaId);
        return ResponseEntity.noContent().build();
    }

}
