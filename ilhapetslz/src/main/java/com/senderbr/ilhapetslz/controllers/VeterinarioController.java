package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Veterinario;
import com.senderbr.ilhapetslz.services.VeterinarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veterinario")
public class VeterinarioController {

    @Autowired
    VeterinarioServices veterinarioServices;

    @PostMapping
    ResponseEntity<Veterinario> post(@RequestBody Veterinario veterinario){
        return ResponseEntity.status(HttpStatus.CREATED).body(veterinarioServices.post(veterinario));
    }

    @PostMapping("/weekdays/{veterinarioId}")
    ResponseEntity<Veterinario> postWeekdays(@RequestBody List<Integer> weekdays,
                                             @PathVariable("veterinarioId") Long veterinarioId)
    {
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.postWeekdays(veterinarioId, weekdays));
    }

    @PostMapping("/hours/{veterinarioId}")
    ResponseEntity<Veterinario> postHours(@RequestBody List<List<String>> hours,
                                             @PathVariable("veterinarioId") Long veterinarioId)
    {
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.postHours(veterinarioId, hours));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Veterinario>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.get(pageable));
    }

    @GetMapping("/search")
    ResponseEntity<Page<Veterinario>> getAllPaginated(@RequestParam String term,Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.getByNameLike(term,pageable));
    }

    @GetMapping("/list")
    ResponseEntity<List<Veterinario>> getSearchAllNotPaginated(@RequestParam String term){
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.getByNameLikeListed(term));
    }

    @GetMapping("/{veterinarioId}")
    ResponseEntity<Veterinario> getById(@PathVariable("veterinarioId") Long veterinarioId){
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.getById(veterinarioId));
    }

    @PutMapping("/{veterinarioId}")
    ResponseEntity<Veterinario> put(@PathVariable("veterinarioId") Long veterinarioId,
                               @RequestBody Veterinario veterinario){
        return ResponseEntity.status(HttpStatus.OK).body(veterinarioServices.put(veterinarioId,veterinario));
    }

    @DeleteMapping("/{veterinarioId}")
    ResponseEntity<Void> delete(@PathVariable("veterinarioId") Long veterinarioId){
        veterinarioServices.delete(veterinarioId);
        return ResponseEntity.noContent().build();
    }


}
