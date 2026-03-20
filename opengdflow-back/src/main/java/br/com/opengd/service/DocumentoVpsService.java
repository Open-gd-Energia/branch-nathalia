package br.com.opengd.service;

import br.com.opengd.exception.BusinessException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class DocumentoVpsService {

    @Value("${opengd.documento.vps.path}")
    private String diretorioBase;

    @PostConstruct
    public void init() throws BusinessException {
        try {
            Path diretorio = Paths.get(diretorioBase);
            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }
        } catch (IOException e) {
            throw new BusinessException("Erro ao criar o diretório base: " + e.getMessage());
        }
    }

    public String upload(String file) throws BusinessException {
        try {
            byte[] dados = Base64.getDecoder().decode(file);
            String nomeSalvo = "Documento-" + UUID.randomUUID();
            Path destino = Paths.get(diretorioBase, nomeSalvo);
            Files.write(destino, dados);
            return nomeSalvo;
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Base64 inválido.");
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessException("Erro ao salvar o arquivo.");
        }
    }


    public String download(String nomeArquivo) throws BusinessException {
        try {
            Path caminho = Paths.get(diretorioBase, nomeArquivo);
            if (!Files.exists(caminho)) {
                throw new BusinessException("Arquivo não encontrado.");
            }
            byte[] dados = Files.readAllBytes(caminho);
            return Base64.getEncoder().encodeToString(dados);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessException("Erro ao ler o arquivo.");
        }
    }

    public Boolean delete(String nomeArquivo) throws BusinessException {
        try {
            Path caminho = Paths.get(diretorioBase, nomeArquivo);
            if (Files.exists(caminho)) {
                Files.delete(caminho);
                return true;
            } else {
                throw new BusinessException("Arquivo " + nomeArquivo + " não encontrado.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessException("Erro ao deletar o arquivo " + nomeArquivo + ".");
        }
    }
}
