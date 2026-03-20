package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.RepresentanteMapper;
import br.com.opengd.controller.request.RepresentanteConsumidorRequest;
import br.com.opengd.controller.request.RepresentanteRequest;
import br.com.opengd.controller.request.RepresentanteUsinaRequest;
import br.com.opengd.controller.response.RepresentanteResponse;
import br.com.opengd.entity.Cidade;
import br.com.opengd.entity.Consumidor;
import br.com.opengd.entity.Representante;
import br.com.opengd.entity.Usina;
import br.com.opengd.enums.PessoaTipo;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.CidadeRepository;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.RepresentanteRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.CidadeUseCase;
import br.com.opengd.usecase.RepresentanteUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RepresentanteUseCaseImpl implements RepresentanteUseCase {

    @Autowired
    RepresentanteRepository representanteRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    CidadeRepository cidadeRepository;

    @Autowired
    RepresentanteMapper representanteMapper;

    private final CidadeUseCase cidadeUseCase;

    public RepresentanteUseCaseImpl(CidadeUseCase cidadeUseCase) {
        this.cidadeUseCase = cidadeUseCase;
    }

    @Override
    public RepresentanteResponse create(RepresentanteRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Representante save = representanteMapper.toEntity(request);
        validate(save, request);
        return representanteMapper.toResponse(representanteRepository.save(save));
    }

    @Override
    public List<RepresentanteResponse> findByAttributes(Map<String, String> params) {
        return representanteMapper.toResponseList(representanteRepository.findByDynamicQuery(params));
    }

    @Override
    public RepresentanteResponse update(Long id, RepresentanteRequest request) throws BusinessException {
        Representante save = representanteRepository.findById(id).orElseThrow(() -> new BusinessException("Representante não encontrada!"));
        validateDuplicate(save, request);
        representanteMapper.updateEntityFromDto(request, save);
        validate(save, request);
        Representante retorno = representanteRepository.save(save);
        return representanteMapper.toResponse(retorno);
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Representante> objOptional = representanteRepository.findById(id);
        if (objOptional.isPresent()) {
            Representante obj = objOptional.get();
            obj.setStatus(0L);
            representanteRepository.save(obj);
            return true;
        } else {
            throw new BusinessException("Representante não encontrado!");
        }
    }

    @Override
    public RepresentanteResponse get(Long id) throws BusinessException {
        Optional<Representante> objOptional = representanteRepository.findById(id);
        if (objOptional.isPresent()) {
            return representanteMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Representante não encontrado!");
        }
    }

    private void validate(Representante save, RepresentanteRequest request) throws BusinessException {
        // Validação de cidade
        if (request.getEndereco() != null && request.getEndereco().getCidade() != null && request.getEndereco().getCidade().getIdIbge() != null) {
            Cidade cidade = cidadeUseCase.findOrCreate(request.getEndereco().getCidade());
            save.getEndereco().setCidade(cidade);
        }

        // Validação de consumidores
        if (save.getConsumidores() != null) save.getConsumidores().clear();
        if (request.getConsumidores() != null && !request.getConsumidores().isEmpty()) {
            for (RepresentanteConsumidorRequest consumidorRequest : request.getConsumidores()) {
                Consumidor consumidor = consumidorRepository.findById(consumidorRequest.getConsumidor().getId())
                        .orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
                save.adicionarConsumidor(consumidor, consumidorRequest.getRelacao());
            }
        }

        // Validação de usinas
        if (save.getUsinas() != null) save.getUsinas().clear();
        if (request.getUsinas() != null && !request.getUsinas().isEmpty()) {
            for (RepresentanteUsinaRequest usinaRequest : request.getUsinas()) {
                Usina usina = usinaRepository.findById(usinaRequest.getUsina().getId())
                        .orElseThrow(() -> new BusinessException("Usina não encontrada!"));
                save.adicionarUsina(usina, usinaRequest.getRelacao());
            }
        }
    }

    private void validateDuplicate(Representante save, RepresentanteRequest request) throws BusinessException {
        if (request.getTipoPessoa().equals(PessoaTipo.PESSOA_FISICA)) {
            List<Representante> exist = representanteRepository.findByPessoaFisicaCpf(request.getPessoaFisica().getCpf());
            if ((exist != null) && (!exist.isEmpty())) {
                if (save == null || !save.getId().equals(exist.getFirst().getId())) {
                    throw new BusinessException("Representante com CPF " + request.getPessoaFisica().getCpf() + " já existe!");
                }
            }
            request.setPessoaJuridica(null);
        }

        if (request.getTipoPessoa().equals(PessoaTipo.PESSOA_JURIDICA)) {
            List<Representante> exist = representanteRepository.findByPessoaJuridicaCnpj(request.getPessoaJuridica().getCnpj());
            if ((exist != null) && (!exist.isEmpty())) {
                if (save == null || !save.getId().equals(exist.getFirst().getId())) {
                    throw new BusinessException("Representante com CNPJ " + request.getPessoaJuridica().getCnpj() + " já existe!");
                }
            }
            request.setPessoaFisica(null);
        }
    }
}
