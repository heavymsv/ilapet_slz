package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Procedimentos;
import com.senderbr.ilhapetslz.services.ProcedimentosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procedimento")
public class ProcedimentosController {
    @Autowired
    ProcedimentosServices procedimentoServices;

    @PostMapping
    ResponseEntity<Procedimentos> post(@RequestBody Procedimentos procedimento){
        return ResponseEntity.status(HttpStatus.CREATED).body(procedimentoServices.post(procedimento));
    }

    @PutMapping("{procedimentoId}")
    ResponseEntity<Procedimentos> put(@RequestBody Procedimentos procedimento,
                                      @PathVariable("procedimentoId") Long procedimentoId){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.put(procedimentoId,procedimento));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Procedimentos>> getAllPaginated(Pageable pageable,
                                                        @RequestParam(value = "pendente", defaultValue = "") String pendente){
        if(pendente.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.get(pageable));
        }else if(pendente.equals("true")){
            return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getPendentes(pageable));
        }else if(pendente.equals("false")){
            return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getNaoPendentes(pageable));
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.get(pageable));
        }
    }

    @GetMapping("/list")
    ResponseEntity<List<Procedimentos>> getSearchAllNotPaginated( @RequestParam String petId){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getByPet(Long.parseLong(petId)));
    }

    @GetMapping("/vet")
    ResponseEntity<Page<Procedimentos>> getByVet( @RequestParam String vetId, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getByVeterinario(Long.parseLong(vetId), pageable));
    }

    @GetMapping("{procedimentoId}")
    ResponseEntity<Procedimentos> getById(@PathVariable("procedimentoId") Long procedimentoId){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getById(procedimentoId));
    }

    @GetMapping("/listall")
    ResponseEntity<List<Procedimentos>> getAllCalendar(@RequestParam("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getByCalendar(id));
    }

    @GetMapping("/listproceds")
    ResponseEntity<Page<Procedimentos>> getSearchItems(@RequestParam("op") int op,
                                                       @RequestParam("name") String name,
                                                       @RequestParam("pendente") boolean pendente,
                                                       Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(procedimentoServices.getByVarious(pageable,pendente,name,op));
    }

    @DeleteMapping("{procedimentoId}")
    ResponseEntity<Void> delete(@PathVariable("procedimentoId") Long procedimentoId){
        procedimentoServices.delete(procedimentoId);
        return ResponseEntity.noContent().build();
    }
}

