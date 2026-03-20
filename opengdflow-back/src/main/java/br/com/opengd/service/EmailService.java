package br.com.opengd.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender mailSender;


    public void sendResetCode(String to, String token, String urlResetPassword) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        String resetLink = urlResetPassword + token;

        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject("OpenGD - Recuperação de Senha");
        helper.setText(
                "<p>Você solicitou a recuperação de senha em " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) + ".</p>" +
                        "<p>Seu código de verificação é: <a href=\"" + resetLink + "\">" + token + "</a></p>" +
                        "<p>Esse código expira em 60 minutos.</p>",
                true
        );

        mailSender.send(mimeMessage);
    }

//    public void sendResetCode(String to, String token) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(from);
//        message.setTo(to);
//        message.setSubject("OpenGD - Recuperação de Senha");
//        message.setText("Você solicitou a recuperação de senha. \n"
//                + "Seu código de verificação é: " + token + "\n"
//                + "Esse código expira em 60 minutos.");
//        mailSender.send(message);
//    }
}
