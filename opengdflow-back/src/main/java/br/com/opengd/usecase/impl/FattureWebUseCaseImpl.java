package br.com.opengd.usecase.impl;

import br.com.opengd.controller.request.*;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.entity.Consumidor;
import br.com.opengd.entity.Distribuidora;
import br.com.opengd.entity.FattureWeb;
import br.com.opengd.entity.Representante;
import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import br.com.opengd.enums.FaturaStatus;
import br.com.opengd.enums.PessoaTipo;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.fattureweb.mapper.FattureWebJsonMapper;
import br.com.opengd.integration.fattureweb.dto.conteudo.*;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.DistribuidoraRepository;
import br.com.opengd.repository.RepresentanteRepository;
import br.com.opengd.usecase.DistribuidoraUseCase;
import br.com.opengd.usecase.FattureWebUseCase;
import br.com.opengd.usecase.FaturaUseCase;
import br.com.opengd.usecase.RepresentanteUseCase;
import br.com.opengd.utils.UtilsOpenGD;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class FattureWebUseCaseImpl implements FattureWebUseCase {

    private final RepresentanteUseCase representanteUseCase;
    private final FaturaUseCase faturaUseCase;
    private final DistribuidoraUseCase distribuidoraUseCase;

    @Autowired
    RepresentanteRepository representanteRepository;

    @Autowired
    DistribuidoraRepository distribuidoraRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    public FattureWebUseCaseImpl(RepresentanteUseCase representanteUseCase, FaturaUseCase faturaUseCase, DistribuidoraUseCase distribuidoraUseCase) {
        this.representanteUseCase = representanteUseCase;
        this.faturaUseCase = faturaUseCase;
        this.distribuidoraUseCase = distribuidoraUseCase;
    }

    @Override
    public FaturaRequest mapearFaturaRequest(DadosDTO dadosDto) throws BusinessException {
        FaturaRequest faturaRequest = new FaturaRequest();
        //Todo Sem definição
        faturaRequest.setBandeiraTarifaria(null);
        // Corrigido: usa fatura.numero_fatura ao invés de fatura_id (que pode ser null)
        faturaRequest.setNumeroFatura(dadosDto.getFatura().getNumeroFatura());
        faturaRequest.setUnidadeConsumidora((dadosDto.getUnidadeConsumidora().getInstalacao() == null) ? null : dadosDto.getUnidadeConsumidora().getInstalacao());
        faturaRequest.setCustoDisponibilidade(getCustoDisponibilidade(dadosDto.getUnidadeConsumidora().getTipoLigacao()));
        faturaRequest.setMesReferencia(toLocalDate(dadosDto.getFatura().getMesReferencia()));
        //Todo Sem definição
        faturaRequest.setGeracaoAnterior(null);
        faturaRequest.setLeituraAtualConsumo(getValorLeitura(dadosDto.getFatura().getLeitura(), "CONSUMO"));
        faturaRequest.setLeituraAtualGeracao(getValorLeitura(dadosDto.getFatura().getLeitura(), "GERAÇÃO"));
        faturaRequest.setDataLeituraAtual(toLocalDate(dadosDto.getFatura().getLeitura().getDataAtual()));
        faturaRequest.setProximaLeitura(toLocalDate(dadosDto.getFatura().getLeitura().getDataProxima()));
        faturaRequest.setVencimento(toLocalDate(dadosDto.getFatura().getDataVencimento()));
        faturaRequest.setValorTotalFatura(dadosDto.getFatura().getTotalFatura());
        faturaRequest.setConsumo(getConsumo(dadosDto.getFatura().getProdutos()));
        //Todo Sem definição
        faturaRequest.setConsumoLocalUsina(null);
        //Todo Sem definição
        faturaRequest.setEnergiaInjetada(null);
        //Todo Sem definição
        faturaRequest.setEnergiaCompensadaLocal(null);
        //Todo Aguardando fator de conversão + formula
        faturaRequest.setSaldoAcumuladoAtual(getSaldoAcumuladoAtual(dadosDto.getFatura().getDevolucaoGeracao()));
        //Todo Implementar a select na fatura aterior
        faturaRequest.setSaldoAcumuladoAnterior(BigDecimal.ZERO);
        faturaRequest.setMovimentacaoSaldo(faturaRequest.getSaldoAcumuladoAtual().subtract(faturaRequest.getSaldoAcumuladoAnterior()));
        //Todo Sem definição
        faturaRequest.setEnergiaDistribuida(null);
        faturaRequest.setTarifaTESI(getTarifa(dadosDto.getFatura().getProdutos(), "Tarifa TE SI", false));
        faturaRequest.setTarifaTUSDSI(getTarifa(dadosDto.getFatura().getProdutos(), "Consumo TUSD kWh", false));
        faturaRequest.setTarifaTotalSI(faturaRequest.getTarifaTESI().add(faturaRequest.getTarifaTUSDSI()));
        faturaRequest.setTarifaTECI(getTarifa(dadosDto.getFatura().getProdutos(), "Tarifa TE SI", true));
        faturaRequest.setTarifaTUSDCI(getTarifa(dadosDto.getFatura().getProdutos(), "Consumo TUSD kWh", true));
        faturaRequest.setTarifaTotalCI(faturaRequest.getTarifaTECI().add(faturaRequest.getTarifaTUSDCI()));
        faturaRequest.setTarifaTECompensavel(getTarifa(dadosDto.getFatura().getProdutos(), "Energia Injetada TE kWh", true));
        faturaRequest.setTarifaTUSDCompensavel(getTarifa(dadosDto.getFatura().getProdutos(), "Energia Injetada TUSD kWh", true));
        faturaRequest.setTarifaTotalCompensavel(faturaRequest.getTarifaTECompensavel().add(faturaRequest.getTarifaTUSDCompensavel()));
        faturaRequest.setTarifaBandVermelhaP1SI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Vermelha P1", false));
        faturaRequest.setTarifaBandVermelhaP1CI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Vermelha P1", true));
        faturaRequest.setTarifaBandVermelhaP2SI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Vermelha P2", false));
        faturaRequest.setTarifaBandVermelhaP2CI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Vermelha P2", true));
        faturaRequest.setTarifaBandAmarelaSI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Amarela", false));
        faturaRequest.setTarifaBandAmarelaCI(getTarifa(dadosDto.getFatura().getProdutos(), "Adic. Bandeira Amarela", true));
        faturaRequest.setTarifaBandVermelhaP1Compensavel(getTarifa(dadosDto.getFatura().getProdutos(), "Bandeira Energia Injetada GD Vermelha P1", true));
        faturaRequest.setTarifaBandVermelhaP2Compensavel(getTarifa(dadosDto.getFatura().getProdutos(), "Bandeira Energia Injetada GD Vermelha P2", true));
        faturaRequest.setTarifaBandAmarelaCompensavel(getTarifa(dadosDto.getFatura().getProdutos(), "Bandeira Energia Injetada GD Amarela", true));
        faturaRequest.setIcms(getTributo(dadosDto.getFatura().getTributos(), "ICMS", false));
        faturaRequest.setValorIcms(getTributo(dadosDto.getFatura().getTributos(), "ICMS", true));
        faturaRequest.setPis(getTributo(dadosDto.getFatura().getTributos(), "PIS/PASEP", false));
        faturaRequest.setValorPis(getTributo(dadosDto.getFatura().getTributos(), "PIS/PASEP", true));
        faturaRequest.setCofins(getTributo(dadosDto.getFatura().getTributos(), "COFINS", false));
        faturaRequest.setValorCofins(getTributo(dadosDto.getFatura().getTributos(), "COFINS", true));
        faturaRequest.setValorEnergiaCompensada(getValorEnergiaCompensada(dadosDto.getFatura().getProdutos()));
        faturaRequest.setCustoSemGD(faturaRequest.getConsumo().multiply(faturaRequest.getTarifaTotalCI()));
        faturaRequest.setHistoricoFaturamentos(getHistoricoFaturamentos(dadosDto.getFatura().getHistoricoFaturamento()));
        faturaRequest.setEnergiaCompensadaOUC(getEnergiaCompensadaOUC(dadosDto.getFatura().getProdutos()));
        faturaRequest.setSaldoRecebidoOUC(faturaRequest.getSaldoAcumuladoAtual().subtract(faturaRequest.getSaldoAcumuladoAnterior()).add(faturaRequest.getEnergiaCompensadaOUC()));
        faturaRequest.setRelCreditoConsumo(getRelCreditoConsumo(faturaRequest));
        faturaRequest.setSaldoFaltante(faturaRequest.getConsumo().subtract(faturaRequest.getEnergiaCompensadaOUC()));
        faturaRequest.setStatus(FaturaStatus.PROCESSADA);
        //Todo Sem definição
        faturaRequest.setFaturaPDF(null);
        //Todo Sem definição
        faturaRequest.setCreditoDistribuidos(null);
        faturaRequest.setObservacao(getObservacao(dadosDto));
        faturaRequest.setMesReferencia(toLocalDate(dadosDto.getFatura().getMesReferencia()));
        faturaRequest.setVencimento(toLocalDate(dadosDto.getFatura().getDataVencimento()));
        // Novos campos mapeados do JSON
        faturaRequest.setDataEmissao(toLocalDate(dadosDto.getFatura().getDataEmissao()));
        faturaRequest.setSubgrupo(dadosDto.getUnidadeConsumidora() != null ? dadosDto.getUnidadeConsumidora().getSubgrupo() : null);
        faturaRequest.setCodUnidadeGeradora(dadosDto.getFatura().getDevolucaoGeracao() != null ? dadosDto.getFatura().getDevolucaoGeracao().getCodUnidadeGeradora() : null);
        if (dadosDto.getOutros() != null) {
            faturaRequest.setNotaFiscal(dadosDto.getOutros().getNotaFiscal());
            faturaRequest.setAvisoCrte(dadosDto.getOutros().getAvisoCrte());
            faturaRequest.setPossuiDebitos(dadosDto.getOutros().getPossuiDebitos());
        }
        return faturaRequest;
    }

    private BigDecimal getRelCreditoConsumo(FaturaRequest faturaRequest) {
        if (faturaRequest.getConsumo().compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return faturaRequest.getSaldoAcumuladoAtual().divide(faturaRequest.getConsumo(), 2, BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal getConsumo(List<ProdutoDTO> produtos) {
        if (produtos == null || produtos.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal consumo = BigDecimal.ZERO;
        for (ProdutoDTO produto : produtos) {
            if ("Consumo TE kWh".equalsIgnoreCase(produto.getDescricao())) {
                consumo = produto.getQuantidade() == null ? BigDecimal.ZERO : produto.getQuantidade();
            }
        }
        return consumo;
    }

    private List<FaturaHistoricoFaturamentoRequest> getHistoricoFaturamentos(List<HistoricoFaturamentoDTO> historicoFaturamento) {
        if (historicoFaturamento == null || historicoFaturamento.isEmpty()) {
            return List.of();
        }
        return historicoFaturamento.stream().map(hf -> {
            FaturaHistoricoFaturamentoRequest faturaHistoricoFaturamentoRequest = new FaturaHistoricoFaturamentoRequest();
            faturaHistoricoFaturamentoRequest.setDias(hf.getPeriodoDias());
            faturaHistoricoFaturamentoRequest.setEnergiaAtiva(hf.getEnergiaAtiva());
            faturaHistoricoFaturamentoRequest.setData(toLocalDate(hf.getData()));
            return faturaHistoricoFaturamentoRequest;
        }).toList();
    }

    @Override
    public FaturaResponse processarFaturas(DadosDTO dadosDTO) throws BusinessException {
        ObjectMapper objectMapper = new ObjectMapper();

        FattureWeb fattureWeb = new FattureWeb();
        fattureWeb.setIdFattureWeb(dadosDTO.getFaturaId().toString());
        fattureWeb.setJson(FattureWebJsonMapper.toJsonNode(dadosDTO, objectMapper));

        FaturaRequest faturaRequest = mapearFaturaRequest(dadosDTO);
        //Todo Sem definição
        faturaRequest.setUsina(null);
        //Todo Confirmar
        Long idConsumidor = findOrCreateConsumidor(dadosDTO);
        if (idConsumidor != null) {
            faturaRequest.setConsumidor(new IdRequest(idConsumidor));
        }


        FaturaResponse faturaResponse = faturaUseCase.create(faturaRequest, fattureWeb);
        return faturaResponse;
    }

    private BigDecimal getEnergiaCompensadaOUC(List<ProdutoDTO> produtos) {
        if (produtos == null || produtos.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal energiaCompensadaOUC = BigDecimal.ZERO;
        for (ProdutoDTO produto : produtos) {
            if ("Energia Injetada TE kWh".equalsIgnoreCase(produto.getDescricao())) {
                energiaCompensadaOUC = produto.getQuantidade() == null ? BigDecimal.ZERO : produto.getQuantidade();
            }
        }
        return energiaCompensadaOUC;
    }

    private BigDecimal getValorEnergiaCompensada(List<ProdutoDTO> produtos) {
        //soma( produtos.descricao."Energia Injetada TE kWh".valor_total; produtos.descricao."Energia Injetada TUSD kWh".valor_total
        if (produtos == null || produtos.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal valorEnergiaCompensada = BigDecimal.ZERO;
        for (ProdutoDTO produto : produtos) {
            if ("Energia Injetada TE kWh".equalsIgnoreCase(produto.getDescricao())) {
                valorEnergiaCompensada = valorEnergiaCompensada.add(produto.getValorTotal() == null ? BigDecimal.ZERO : produto.getValorTotal());
            }
            if ("Energia Injetada TUSD kWh".equalsIgnoreCase(produto.getDescricao())) {
                valorEnergiaCompensada = valorEnergiaCompensada.add(produto.getValorTotal() == null ? BigDecimal.ZERO : produto.getValorTotal());
            }
        }
        return valorEnergiaCompensada;
    }

    private BigDecimal getTarifa(List<ProdutoDTO> tarifaTeSi, String descricao, Boolean isTarifaComImpostos) {
        if (tarifaTeSi == null) {
            return BigDecimal.ZERO;
        }
        for (ProdutoDTO produto : tarifaTeSi) {
            if (descricao.equalsIgnoreCase(produto.getDescricao())) {
                if (isTarifaComImpostos) {
                    return (produto.getTarifaComImpostos() == null) ? BigDecimal.ZERO : produto.getTarifaComImpostos();
                } else {
                    return (produto.getTarifaSemImpostos() == null) ? BigDecimal.ZERO : produto.getTarifaSemImpostos();
                }
            }
        }
        return BigDecimal.ZERO;
    }

    private BigDecimal getTributo(List<TributoDTO> tributos, String nome, Boolean valor) {
        if (tributos == null) {
            return BigDecimal.ZERO;
        }
        for (TributoDTO tributo : tributos) {
            if (nome.equalsIgnoreCase(tributo.getNome())) {
                if (valor) {
                    return (tributo.getValor() == null) ? BigDecimal.ZERO : tributo.getValor();
                }
                return (tributo.getTaxa() == null) ? BigDecimal.ZERO : tributo.getTaxa();
            }
        }
        return BigDecimal.ZERO;
    }

    private BigDecimal getSaldoAcumuladoAtual(DevolucaoGeracaoDTO devolucaoGeracao) {
        if (devolucaoGeracao == null || devolucaoGeracao.getSaldosGeracao() == null || devolucaoGeracao.getSaldosGeracao().isEmpty()) {
            return BigDecimal.ZERO;
        }

        //Todo Aguardando o fatora de conversão e a regra
        for (SaldoGeracaoDTO saldo : devolucaoGeracao.getSaldosGeracao()) {
            if ("ÚNICO".equalsIgnoreCase(saldo.getPosto())) {
                return saldo.getSaldoRecebido();
            }
        }
        return BigDecimal.ZERO;
    }

    private BigDecimal getValorLeitura(LeituraDTO leitura, String consumoGeracao) {
        if (leitura == null || leitura.getMedidores() == null || leitura.getMedidores().isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal valorLeitura = BigDecimal.ZERO;
        for (MedidoresDTO medidor : leitura.getMedidores()) {
            for (LeiturasDTO leituraMedidor : medidor.getLeituras()) {
                if (leituraMedidor.getConsumoOuGeracao().equalsIgnoreCase(consumoGeracao)) {
                    valorLeitura = valorLeitura.add(leituraMedidor.getValorLeitura() == null ? BigDecimal.ZERO : leituraMedidor.getValorLeitura());
                }
            }
        }
        return valorLeitura;
    }

    private Long getCustoDisponibilidade(String tipoLigacao) {
        if (tipoLigacao == null) {
            return null;
        }
        switch (tipoLigacao) {
            case "MONOFÁSICA":
                return 30L;
            case "BIFÁSICA":
                return 50L;
            case "TRIFÁSICA":
                return 100L;
            default:
                return null;
        }
    }

    private String getObservacao(DadosDTO dadosDto) {
        String obs = "Importado em " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss")) + " via FattureWeb";
        if (dadosDto.getUnidadeConsumidora() == null) {
            return obs;
        }
        if (dadosDto.getUnidadeConsumidora().getCpfCnpj() != null && !dadosDto.getUnidadeConsumidora().getCpfCnpj().isEmpty()) {
            obs += " - Cpf_Cnpj: " + dadosDto.getUnidadeConsumidora().getCpfCnpj();
        }

        if (dadosDto.getUnidadeConsumidora().getNome() != null && !dadosDto.getUnidadeConsumidora().getNome().isEmpty()) {
            obs += " - Nome: " + dadosDto.getUnidadeConsumidora().getNome();
        }

        if (dadosDto.getUnidadeConsumidora().getInstalacao() != null && !dadosDto.getUnidadeConsumidora().getInstalacao().isEmpty()) {
            obs += " - Instalação: " + dadosDto.getUnidadeConsumidora().getInstalacao();
        }
        return obs;
    }

    private LocalDate toLocalDate(String mesReferencia) {
        if (mesReferencia == null) return null;
        String[] parts = mesReferencia.split("-");
        int year = Integer.parseInt(parts[0]);
        int month = Integer.parseInt(parts[1]);
        return LocalDate.of(year, month, 1);
    }

    private Long findOrCreateConsumidor(DadosDTO dadosDTO) throws BusinessException {
        Consumidor consumidor = consumidorRepository.findFirstByUc(dadosDTO.getUnidadeConsumidora().getInstalacao());
        if (consumidor != null) {
            return consumidor.getId();
        }
        return null;

//        Long representanteId = findOrCreateRepresentante(dadosDTO);
//
//        ConsumidorRequest consumidorRequest = new ConsumidorRequest();
//        EnderecoRequest enderecoRequest = new EnderecoRequest();
//        enderecoRequest.setEndereco(dadosDTO.getUnidadeConsumidora().getEndereco());
//
//        ConsumidorRepresentanteRequest consumidorRepresentanteRequest = new ConsumidorRepresentanteRequest();
//        consumidorRepresentanteRequest.setRepresentante(new IdRequest(representanteId));
//        consumidorRepresentanteRequest.setRelacao(ConsumidorRepresentanteRelacaoTipo.GESTORA);
//        consumidorRequest.setRepresentantes(List.of(consumidorRepresentanteRequest));
//
//        consumidorRequest.setEndereco(enderecoRequest);
//        consumidorRequest.setNome(dadosDTO.getUnidadeConsumidora().getNome());
//        consumidorRequest.setDistribuidora(new IdRequest(findOrCreateDistribuidora(dadosDTO)));
//        return consumidorUseCase.create(consumidorRequest).getId();
    }

    private Long findOrCreateRepresentante(DadosDTO dadosDTO) throws BusinessException {
        if (dadosDTO.getUnidadeConsumidora().getCpfCnpj() == null) {
            return null;
        }

        String cpfCnpj = UtilsOpenGD.apenasNumeros(dadosDTO.getUnidadeConsumidora().getCpfCnpj());

        List<Representante> representanteList = null;
        if (cpfCnpj.length() == 14) {
            representanteList = representanteRepository.findByPessoaJuridicaCnpj(cpfCnpj);
        } else {
            representanteList = representanteRepository.findByPessoaFisicaCpf(cpfCnpj);
        }

        if (representanteList != null && !representanteList.isEmpty()) {
            return representanteList.getFirst().getId();
        }

        EnderecoRequest enderecoRequest = new EnderecoRequest();
        enderecoRequest.setEndereco(dadosDTO.getUnidadeConsumidora().getEndereco());

        RepresentanteRequest representanteRequest = new RepresentanteRequest();
        representanteRequest.setEndereco(enderecoRequest);
        if (cpfCnpj.length() == 14) {
            PessoaJuridicaRequest pessoaJuridicaRequest = new PessoaJuridicaRequest();
            pessoaJuridicaRequest.setCnpj(dadosDTO.getUnidadeConsumidora().getCpfCnpj());
            pessoaJuridicaRequest.setRazaoSocial(dadosDTO.getUnidadeConsumidora().getNome());
            representanteRequest.setPessoaJuridica(pessoaJuridicaRequest);
            representanteRequest.setTipoPessoa(PessoaTipo.PESSOA_JURIDICA);
        } else {
            PessoaFisicaRequest pessoaFisicaRequest = new PessoaFisicaRequest();
            pessoaFisicaRequest.setCpf(dadosDTO.getUnidadeConsumidora().getCpfCnpj());
            pessoaFisicaRequest.setNome(dadosDTO.getUnidadeConsumidora().getNome());
            representanteRequest.setPessoaFisica(pessoaFisicaRequest);
            representanteRequest.setTipoPessoa(PessoaTipo.PESSOA_FISICA);
        }
        representanteRequest.setTipoRelacao(ConsumidorRepresentanteRelacaoTipo.GESTORA);
        return representanteUseCase.create(representanteRequest).getId();
    }

    private Long findOrCreateDistribuidora(DadosDTO dadosDTO) throws BusinessException {
        List<Distribuidora> distribuidoraList = distribuidoraRepository.findByNome(dadosDTO.getDistribuidora());
        if (distribuidoraList != null && !distribuidoraList.isEmpty()) {
            return distribuidoraList.getFirst().getId();
        }

        DistribuidoraRequest distribuidoraRequest = new DistribuidoraRequest();
        distribuidoraRequest.setNome(dadosDTO.getDistribuidora());
        return distribuidoraUseCase.create(distribuidoraRequest).getId();
    }
}
