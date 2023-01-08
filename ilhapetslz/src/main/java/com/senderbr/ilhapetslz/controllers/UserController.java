package com.senderbr.ilhapetslz.controllers;

import com.senderbr.ilhapetslz.entities.User;
import com.senderbr.ilhapetslz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<User>> readUserFiltered(@RequestParam("username") String username, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserFilteredByUsername(username, pageable));
    }

    @GetMapping("/name")
    public ResponseEntity<User> readUserFiltered(@RequestParam("username") String username){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByEmail(username));
    }

    @GetMapping("/nome")
    public ResponseEntity<User> readUserFilteredbyName(@RequestParam("name") String username){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByUsername(username));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@RequestBody User user,
                                                      @PathVariable("userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(user, userId));
    }
    @GetMapping("/{userId}")
    public ResponseEntity<User> getEspecificUser(@PathVariable("userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userId));
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> readAll(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }
    @GetMapping("/pages")
    public ResponseEntity<Page<User>> readPaginated(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsersPaginated(pageable));
    }
    @PutMapping("/setpassword")
    public ResponseEntity<String> setUserPassword(@RequestParam Map<String, String> passwordMap){
        String token = passwordMap.get("token");
        String password = passwordMap.get("password");
        userService.setNewPassword(token, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @GetMapping("/resetpassword")
    public ResponseEntity<Void> resetPassword(@RequestParam String email){
        userService.resetPassword(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
