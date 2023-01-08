package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.email.EmailLayout;
import com.senderbr.ilhapetslz.email.EmailService;
import com.senderbr.ilhapetslz.entities.ConfirmationToken;
import com.senderbr.ilhapetslz.entities.User;
import com.senderbr.ilhapetslz.repositories.ConfirmationTokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ConfirmationTokenService {

    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    EmailService emailSender;

    public void saveConfirmationToken(ConfirmationToken confirmationToken){
        confirmationTokenRepository.save(confirmationToken);
    }

    public ConfirmationToken getConfirmationToken(String token){
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token).orElseThrow(
                ()->new EntityNotFoundException("Token don't exist")
        );
        return confirmationToken;
    }

    public void createTokenAndSendEmail(User user, boolean isNewUser){
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(2),
                user
        );
        EmailLayout emailLayout = new EmailLayout();
        String emailbody = isNewUser ? emailLayout.buildNewUserEmail(user, token) :
                emailLayout.buildPasswordRecoverEmail(user, token);
        emailSender.send(user.getEmail(), emailbody);
        this.saveConfirmationToken(confirmationToken);
    }
}
