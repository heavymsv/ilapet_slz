package com.senderbr.ilhapetslz.services;


import com.senderbr.ilhapetslz.entities.ConfirmationToken;
import com.senderbr.ilhapetslz.entities.User;
import com.senderbr.ilhapetslz.enums.AccessLevel;
import com.senderbr.ilhapetslz.repositories.RoleRepository;
import com.senderbr.ilhapetslz.repositories.UserRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    ConfirmationTokenService confirmationTokenService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @SneakyThrows
    @Transactional
    public User createUser(User user){
        //boolean usernameExists = userRepository.findUserByName(user.getUsername()).isPresent();
        boolean emailExists = userRepository.findUserByEmail(user.getEmail()).isPresent();
//        if(usernameExists){
//            throw new SQLIntegrityConstraintViolationException("Username already taken.");
       // } else
        if(emailExists){
            throw new SQLIntegrityConstraintViolationException("Email already registered.");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        if(user.getAccessLevel()==null)
            user.setAccessLevel(roleRepository.findByAuthority(AccessLevel.ROLE_CLIENT));
        User savedUser = userRepository.save(user);

        //confirmationTokenService.createTokenAndSendEmail(user, true);
        return savedUser;
    }

    public void resetPassword(String email){
        User user = userRepository.findUserByEmail(email).orElseThrow(
                ()->new EntityNotFoundException("Email " + email + " is not registered")
        );
        confirmationTokenService.createTokenAndSendEmail(user, false);
    }

    public User getUserByUsername(String username){
        User user = userRepository.findUserByName(username).orElseThrow(
                ()->new EntityNotFoundException("User " + username + " do not exist")
        );
        return user;
    }

    public User getUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(
                ()->new EntityNotFoundException("User email " + email + " do not exist")
        );
        return user;
    }

    public User getUserById(Long userId){
        User savedUser = userRepository.findById(userId).orElseThrow(
                ()->new EntityNotFoundException("User not found.")
        );
        return savedUser;
    }
    public Page<User> getUserFilteredByUsername(String searchTerm, Pageable pageable){
        Page<User> userFiltered = userRepository.findByUsernameContainingIgnoreCase(searchTerm, pageable);
//        Page<UserDTO> userDTOFiltered = userFiltered.stream().map(user->new UserDTO(user)).collect(Collectors.toList());

        return userFiltered;
    }

    public List<User> getAllUsers(){
        List<User> userList = userRepository.findAll();
        List<User> userDTOList = userList;
        return userDTOList;
    }

    public User updateUserIsEnable(Long userId, boolean isActivating){
        User savedUser = this.getUserById(userId);
        savedUser.setEnabled(isActivating);
        return userRepository.save(savedUser);
    }

    public void setNewPassword(String token, String password){
        ConfirmationToken confirmationToken = confirmationTokenService.getConfirmationToken(token);
        if (confirmationToken.getConfirmedAt() != null){
            throw new IllegalArgumentException("Token has already been used.");
        }
        if(confirmationToken.getExpiredAt().isBefore(LocalDateTime.now())){
            throw new IllegalArgumentException("Token has expired");
        }
        confirmationToken.setConfirmedAt(LocalDateTime.now());
        User user = this.getUserById(confirmationToken.getUser().getId());
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User savedUser = userRepository.findUserByEmail(email).orElseThrow(
                ()->new UsernameNotFoundException("User not found.")
        );
        return savedUser;
    }

    public User updateUser(User user, Long userId) {
        User savedUser = this.getUserById(userId);
        User updatedUser = user;
        updatedUser.setPassword(savedUser.getPassword());
        return userRepository.save(updatedUser);
    }

    public Page<User> getUsersPaginated(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}
