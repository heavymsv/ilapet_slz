package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.Blog;
import com.senderbr.ilhapetslz.entities.ImagemNome;
import com.senderbr.ilhapetslz.services.BlogServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    BlogServices blogServices;


    @PostMapping("/img")
    public ResponseEntity<ImagemNome> postImage(//@RequestBody Blog blog,
                                     @RequestParam("file") MultipartFile file,
                                     RedirectAttributes redirectAttributes){
        String fileName = blogServices.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

           // return "redirect:/";

        return  ResponseEntity.status(HttpStatus.CREATED).body(new ImagemNome(fileName));
    }

    @PostMapping
    public ResponseEntity<Blog> post(@RequestBody Blog blog){
        return ResponseEntity.status(HttpStatus.CREATED).body(blogServices.post(blog));
    }

    @GetMapping("/pages")
    public ResponseEntity<Page<Blog>> getAllPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(blogServices.get(pageable));
    }

    @GetMapping("/banner")
    public ResponseEntity<List<Blog>> getFirst3(){
        return ResponseEntity.status(HttpStatus.OK).body(blogServices.get3first());
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Blog>> getAllByName(@RequestParam String term, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(blogServices.getByNameLike(term,pageable));
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> getById(@PathVariable("blogId") Long blogId){
        return ResponseEntity.status(HttpStatus.OK).body(blogServices.getById(blogId));
    }

    @PutMapping("/{blogId}")
    public ResponseEntity<Blog> put(@PathVariable("blogId") Long blogId,
                                    @RequestBody Blog blog){
        return ResponseEntity.status(HttpStatus.OK).body(blogServices.put(blogId,blog));
    }

    @DeleteMapping("/{blogId}")
    public ResponseEntity<Void> delete(@PathVariable("blogId") Long blogId){
        blogServices.delete(blogId);
        return ResponseEntity.noContent().build();
    }
}
