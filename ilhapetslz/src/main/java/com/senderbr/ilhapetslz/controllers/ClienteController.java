package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Cliente;
import com.senderbr.ilhapetslz.services.ClienteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteServices clienteServices;

    @PostMapping
    ResponseEntity<Cliente> post(@RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteServices.post(cliente));
    }

    @GetMapping("/pages")
    ResponseEntity<Page<Cliente>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.get(pageable));
    }

    @GetMapping("/search")
    ResponseEntity<Page<Cliente>> getSearchAllPaginated(@RequestParam String term,Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.getByNameLike(term,pageable));
    }

    @GetMapping("/nome")
    ResponseEntity<Cliente> getClienteByItsName(@RequestParam String name){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.getByName(name));
    }

    @GetMapping("/list")
    ResponseEntity<List<Cliente>> getSearchAllNotPaginated(@RequestParam String term){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.getByNameLikeList(term));
    }

    @GetMapping("{clienteId}")
    ResponseEntity<Cliente> getById(@PathVariable("clienteId") Long clienteId){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.getById(clienteId));
    }

    @PutMapping("{clienteId}")
    ResponseEntity<Cliente> put(@PathVariable("clienteId") Long clienteId,
                                @RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.OK).body(clienteServices.put(clienteId,cliente));
    }

    @DeleteMapping("{clienteId}")
    ResponseEntity<Void> delete(@PathVariable("clienteId") Long clienteId){
        clienteServices.delete(clienteId);
        return ResponseEntity.noContent().build();
    }

}
