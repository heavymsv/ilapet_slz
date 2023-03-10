package com.senderbr.ilhapetslz.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class EmailService implements EmailSender{

    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String emailSender;
    @Override
    @Async
    public void send(String to, String email) {
        System.out.println();
        System.out.println(emailSender);
        System.out.println();
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Ilha pet Veterinária");
            helper.setFrom(emailSender, "Ilha Pet SLZ");
            mailSender.send(mimeMessage);
        } catch (MessagingException | UnsupportedEncodingException e){
            //TODO: change thrown error type
            throw new IllegalArgumentException("Failed to send email");
        }
    }
}
