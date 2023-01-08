package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Blog;
import com.senderbr.ilhapetslz.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class BlogServices {

    @Autowired
    BlogRepository repository;

    @Autowired
    FileSystemStorageService fileSystemStorageService;

    @Transactional
    public Blog post(Blog blog){return repository.save(blog);}

    public Page<Blog> get(Pageable pageable){return repository.findAllByOrderByDataPub(pageable);}

    public Page<Blog> getByNameLike(String term, Pageable pageable){return repository.findByTituloContainingIgnoreCase(term,pageable);}

    public Blog getById(Long id){
        Optional<Blog> optBlog = repository.findById(id);
        Blog blog = optBlog.orElseThrow(()->new EntityNotFoundException("No such Post"));
        return blog;
    }

    public List<Blog> get3first(){
        return repository.findTop3ByOrderByDataPub();
    }


    public Blog put(Long id, Blog blog){
        Blog oldBlog = this.getById(id);
        oldBlog.setTexto(blog.getTexto());
        oldBlog.setTitulo(blog.getTitulo());

        return this.post(oldBlog);
    }

    @Transactional
    public void delete(Long id){
        Blog oldBlog = this.getById(id);

        repository.delete(oldBlog);
    }

    public String store(MultipartFile file) {
        return fileSystemStorageService.storeReturnName(file);
    }
}
