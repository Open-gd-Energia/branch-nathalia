package br.com.opengd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Properties;

@RestController
@RequestMapping("/version")
@RequiredArgsConstructor
public class VersionController {

    @GetMapping
    public String getBuildTimestamp() {
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("build.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            return "Versão gerada em: " + DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
                    .withZone(ZoneId.of("America/Sao_Paulo"))
                    .format(Instant.parse(prop.getProperty("build.timestamp")));
        } catch (IOException e) {
            return "Erro ao ler build.properties: " + e.getMessage();
        }
    }

//    @GetMapping
//    @ResponseBody
//    @Operation(summary = "Version", description = "Retorna a data de hora que foi gerada a versão")
//    public String getBuildTimestamp() {
//
//        try {
//            Path path = Paths.get(VersionUtil.class.getProtectionDomain().getCodeSource().getLocation().toURI());
//            BasicFileAttributes attr = Files.readAttributes(path, BasicFileAttributes.class);
//            Instant creationTime = attr.creationTime().toInstant();
//            return "Versão gerada em: "+DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
//                    .withZone(ZoneId.of("America/Sao_Paulo"))
//                    .format(creationTime);
//        } catch (Exception e) {
//            return "Erro ao obter a data: " + e.getMessage();
//        }
//    }
//
//    @GetMapping
//    @ResponseBody
//    @Operation(summary = "Jar Name", description = "Retorna o nome do arquivo .jar que está sendo executado")
//    public String getJarName() {
//        try {
//            Path path = Paths.get(VersionController.class.getProtectionDomain().getCodeSource().getLocation().toURI());
//            return "Nome do arquivo .jar: " + path.getFileName().toString();
//        } catch (URISyntaxException e) {
//            return "Erro ao obter o nome do arquivo .jar: " + e.getMessage();
//        }
//    }
}