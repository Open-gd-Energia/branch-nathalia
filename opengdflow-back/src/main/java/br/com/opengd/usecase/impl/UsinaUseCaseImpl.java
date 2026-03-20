package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.ContaMapper;
import br.com.opengd.controller.mapper.EnderecoMapper;
import br.com.opengd.controller.mapper.UsinaMapper;
import br.com.opengd.controller.request.UsinaRequest;
import br.com.opengd.controller.request.UsinaRespresentanteRequest;
import br.com.opengd.controller.response.UsinaResponse;
import br.com.opengd.entity.*;
import br.com.opengd.enums.UsinaStatus;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.*;
import br.com.opengd.usecase.CidadeUseCase;
import br.com.opengd.usecase.UsinaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsinaUseCaseImpl implements UsinaUseCase {

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    FaturamentoTipoRepository faturamentoTipoRepository;

    @Autowired
    RegraTarifariaRepository regraTarifariaRepository;

    @Autowired
    DistribuidoraRepository distribuidoraRepository;

    @Autowired
    RepresentanteRepository representanteRepository;

    @Autowired
    BancoRepository bancoRepository;

    @Autowired
    UsinaMapper usinaMapper;

    @Autowired
    ContaMapper contaMapper;

    @Autowired
    EnderecoMapper enderecoMapper;

    private final CidadeUseCase cidadeUseCase;

    public UsinaUseCaseImpl(CidadeUseCase cidadeUseCase) {
        this.cidadeUseCase = cidadeUseCase;
    }

    @Override
    public UsinaResponse create(UsinaRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Usina save = usinaMapper.toEntity(request);
        validate(save, request);
        return usinaMapper.toResponse(usinaRepository.save(save));
    }

    @Override
    public List<UsinaResponse> findByAttributes(Map<String, String> params) {
        List<UsinaResponse> responseList = usinaMapper.toResponseList(usinaRepository.findByDynamicQuery(params));
        if (params.containsKey("calcCotaAlocada") && params.get("calcCotaAlocada").equalsIgnoreCase("true")) {
            return responseList.stream().map(response -> {
                BigDecimal cotaAlocada = usinaRepository.calculateCotaAlocada(response.getId());
                response.setCotaAlocada((cotaAlocada == null ? BigDecimal.ZERO : cotaAlocada));
                return response;
            }).toList();
        } else {
            return responseList;
        }
    }

    @Override
    public UsinaResponse update(Long id, UsinaRequest request) throws BusinessException {
        Usina save = usinaRepository.findById(id).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
        validateDuplicate(save, request);
        usinaMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return usinaMapper.toResponse(usinaRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Usina> objOptional = usinaRepository.findById(id);
        if (objOptional.isPresent()) {
            Usina obj = objOptional.get();
            obj.setStatus(UsinaStatus.INATIVO);
            usinaRepository.save(obj);
            return true;
        } else {
            throw new BusinessException("Usina não encontrada!");
        }
    }

    @Override
    public UsinaResponse get(Long id) throws BusinessException {
        Optional<Usina> objOptional = usinaRepository.findById(id);
        if (objOptional.isPresent()) {
            return usinaMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Usina não encontrada!");
        }
    }

    @Override
    public List<UsinaResponse> findByIdDistribuidora(Long idDistribuidora) {
        return usinaMapper.toResponseList(usinaRepository.findByIdDistribuidora(idDistribuidora));
    }

    @Override
    public List<UsinaResponse> findByIdRepresentante(Long idRepresentante) {
        return usinaMapper.toResponseList(usinaRepository.findByIdRepresentante(idRepresentante));
    }

    private void validate(Usina save, UsinaRequest request) throws BusinessException {
        if (request.getConta() != null && request.getConta().getBanco() != null && request.getConta().getBanco().getId() != null) {
            Banco banco = bancoRepository.findById(request.getConta().getBanco().getId()).orElseThrow(() -> new BusinessException("Banco não encontrado!"));
            Conta conta = contaMapper.toEntity(request.getConta());
            conta.setBanco(banco);
            save.setConta(conta);
        }

        if (request.getEndereco() != null) {
            Endereco endereco = enderecoMapper.toEntity(request.getEndereco());
            if (request.getEndereco().getCidade() != null && request.getEndereco().getCidade().getIdIbge() != null) {
                Cidade cidade = cidadeUseCase.findOrCreate(request.getEndereco().getCidade());
                endereco.setCidade(cidade);
            }
            save.setEndereco(endereco);
        }

        if (request.getFaturamentoTipo() != null && request.getFaturamentoTipo().getId() != null) {
            FaturamentoTipo faturamentoTipo = faturamentoTipoRepository.findById(request.getFaturamentoTipo().getId()).orElseThrow(() -> new BusinessException("FaturamentoTipo não encontrado!"));
            save.setFaturamentoTipo(faturamentoTipo);
        }

        if (request.getRegraTarifaria() != null && request.getRegraTarifaria().getId() != null) {
            RegraTarifaria regraTarifaria = regraTarifariaRepository.findById(request.getRegraTarifaria().getId()).orElseThrow(() -> new BusinessException("RegraTarifaria não encontrada!"));
            save.setRegraTarifaria(regraTarifaria);
        }

        if (request.getDistribuidora() != null && request.getDistribuidora().getId() != null) {
            Distribuidora distribuidora = distribuidoraRepository.findById(request.getDistribuidora().getId()).orElseThrow(() -> new BusinessException("Distribuidora não encontrada!"));
            save.setDistribuidora(distribuidora);
        }

        if (request.getRepresentanteTitular() != null && request.getRepresentanteTitular().getId() != null) {
            Representante representante = representanteRepository.findById(request.getRepresentanteTitular().getId()).orElseThrow(() -> new BusinessException("Representante não encontrado!"));
            save.setRepresentanteTitular(representante);
        }

        // Validação de representantes
        if (save.getRepresentantes() != null) save.getRepresentantes().clear();
        if (request.getRepresentantes() != null && !request.getRepresentantes().isEmpty()) {
            for (UsinaRespresentanteRequest usinaRepresentante : request.getRepresentantes()) {
                Representante representante = representanteRepository.findById(usinaRepresentante.getRepresentante().getId())
                        .orElseThrow(() -> new BusinessException("Representante não encontrada!"));
                save.adicionarRepresentante(representante, usinaRepresentante.getRelacao());
            }
        }
    }

    private void validateDuplicate(Usina save, UsinaRequest request) throws BusinessException {

    }
}
