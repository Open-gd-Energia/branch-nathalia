package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.DocumentoMapper;
import br.com.opengd.controller.request.DocumentoRequest;
import br.com.opengd.controller.response.DocumentoFileResponse;
import br.com.opengd.controller.response.DocumentoResponse;
import br.com.opengd.entity.*;
import br.com.opengd.enums.DocumentoHost;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.*;
import br.com.opengd.service.DocumentoVpsService;
import br.com.opengd.usecase.DocumentoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DocumentoUseCaseImpl implements DocumentoUseCase {

    private final DocumentoVpsService documentoVpsService;

    @Autowired
    DocumentoRepository documentoRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    RepresentanteRepository representanteRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    DocumentoMapper documentoMapper;

    public DocumentoUseCaseImpl(DocumentoVpsService documentoVpsService) {
        this.documentoVpsService = documentoVpsService;
    }

    @Override
    public DocumentoResponse create(DocumentoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Documento save = documentoMapper.toEntity(request);
        validate(save, request);
        return documentoMapper.toResponse(documentoRepository.save(save));
    }

    @Override
    public List<DocumentoResponse> findByAttributes(Map<String, String> params) {
        return documentoMapper.toResponseList(documentoRepository.findByDynamicQuery(params));
    }

    @Override
    public DocumentoResponse update(Long id, DocumentoRequest request) throws BusinessException {
        Documento save = documentoRepository.findById(id).orElseThrow(() -> new BusinessException("Documento não encontrado!"));
        validateDuplicate(save, request);
        documentoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return documentoMapper.toResponse(documentoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Documento> objOptional = documentoRepository.findById(id);
        if (objOptional.isPresent()) {
            String url = objOptional.get().getUrl();
            DocumentoHost host = objOptional.get().getHost();
            try {
                documentoRepository.delete(objOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Documento em uso, não é possivel apagar!");
            }
            if (host.equals(DocumentoHost.VPS_LOCAL)) {
                documentoVpsService.delete(url);
            }
            return true;
        } else {
            throw new BusinessException("Documento não encontrado!");
        }
    }

    @Override
    public DocumentoFileResponse get(Long id) throws BusinessException {
        Optional<Documento> objOptional = documentoRepository.findById(id);
        if (objOptional.isPresent()) {
            DocumentoFileResponse response = documentoMapper.toResponseFile(objOptional.get());
            if (response.getHost().equals(DocumentoHost.VPS_LOCAL)) {
                String base64 = documentoVpsService.download(response.getUrl());
                response.setBase64(base64);
            }
            return response;
        } else {
            throw new BusinessException("Documento não encontrado!");
        }
    }


    private void validate(Documento save, DocumentoRequest request) throws BusinessException {
        boolean hasUsina = request.getUsina() != null && request.getUsina().getId() != null;
        boolean hasConsumidor = request.getConsumidor() != null && request.getConsumidor().getId() != null;
        boolean hasRepresentante = request.getRepresentante() != null && request.getRepresentante().getId() != null;
        boolean hasUsuario = request.getUsuario() != null && request.getUsuario().getId() != null;

        int ownershipCount = 0;
        ownershipCount += hasUsina ? 1 : 0;
        ownershipCount += hasConsumidor ? 1 : 0;
        ownershipCount += hasRepresentante ? 1 : 0;
        ownershipCount += hasUsuario ? 1 : 0;

        // Ambiguidade: os 4 vínculos são opcionais e o código anterior podia setar múltiplos owners.
        // Regra explícita (bloco 5):
        // - no create: deve existir exatamente 1 owner
        // - no update: se o request trouxer algum owner, então deve existir exatamente 1 e os demais serão limpos
        boolean isUpdate = save != null && save.getId() != null;
        if (ownershipCount == 0) {
            if (!isUpdate) {
                throw new BusinessException("Documento deve ter exatamente um vínculo (usina, consumidor, representante ou usuario).");
            }
        } else if (ownershipCount > 1) {
            throw new BusinessException("Documento deve ter apenas um vínculo (usina OR consumidor OR representante OR usuario).");
        } else {
            // Garante que o Documento fique com apenas uma FK de owner.
            save.setUsina(null);
            save.setConsumidor(null);
            save.setRepresentante(null);
            save.setUsuario(null);

            if (hasUsina) {
                Usina usina = usinaRepository.findById(request.getUsina().getId())
                        .orElseThrow(() -> new BusinessException("Usina não encontrada!"));
                save.setUsina(usina);
            } else if (hasConsumidor) {
                Consumidor consumidor = consumidorRepository.findById(request.getConsumidor().getId())
                        .orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
                save.setConsumidor(consumidor);
            } else if (hasRepresentante) {
                Representante representante = representanteRepository.findById(request.getRepresentante().getId())
                        .orElseThrow(() -> new BusinessException("Representante não encontrada!"));
                save.setRepresentante(representante);
            } else {
                Usuario usuario = usuarioRepository.findById(request.getUsuario().getId())
                        .orElseThrow(() -> new BusinessException("Usuario não encontrado!"));
                save.setUsuario(usuario);
            }
        }

        if (request.getBase64() != null && !request.getBase64().isEmpty()) {
            if (save != null && save.getUrl() != null) {
                if (save.getHost().equals(DocumentoHost.VPS_LOCAL)) {
                    documentoVpsService.delete(save.getUrl());
                }
            }
            String url = documentoVpsService.upload(request.getBase64());
            save.setUrl(url);
            save.setHost(DocumentoHost.VPS_LOCAL);
        }
    }

    private void validateDuplicate(Documento save, DocumentoRequest request) throws BusinessException {

    }
}
