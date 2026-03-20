package br.com.opengd.config;

import br.com.opengd.entity.*;
import br.com.opengd.enums.*;
import br.com.opengd.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@AllArgsConstructor
public class StartConfig implements CommandLineRunner {

    private final Environment environment;
    private PermissaoRepository permissaoRepository;
    private PerfilRepository perfilRepository;
    private CidadeRepository cidadeRepository;
    private BancoRepository bancoRepository;
    private UsinaRepository usinaRepository;
    private RepresentanteRepository representanteRepository;
    private DistribuidoraRepository distribuidoraRepository;
    private ConsumidorRepository consumidorRepository;
    private UsuarioRepository usuarioRepository;
    private TipoDescontoRepository tipoDescontoRepository;
    private TipoDescontoItemRepository tipoDescontoItemRepository;
    private BandeiraTarifariaRepository bandeiraTarifariaRepository;
    private FaturamentoTipoRepository faturamentoTipoRepository;
    private RegraTarifariaRepository regraTarifariaRepository;
    private ParametroRepository parametroRepository;
    private BCryptPasswordEncoder passwordEncoder;


    /*
    Implementação para criar um usuario admin e sua senha para garantir que sempre exista um usuario admin para fazer o login inicial
     */
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        String ddlAuto = environment.getProperty("spring.jpa.hibernate.ddl-auto");
        if ("create".equalsIgnoreCase(ddlAuto)) {
            Distribuidora distribuidora = createDistribuidora();
            Representante representantePF = createRepresentantePF();
            Usina usina = createUsina(distribuidora, representantePF);
            Consumidor consumidor = createConsumidor(distribuidora, representantePF);

            createPerfilPermissoes(consumidor, usina);
            createRepresentantePJ();
            TipoDesconto tipoDesconto = createTipoDesconto();
            createTipoDescontoItem(tipoDesconto);
            createBandeiraTarifaria("Verde");
            createBandeiraTarifaria("Amarela");
            createBandeiraTarifaria("Vermelha P1");
            createBandeiraTarifaria("Vermelha P2");
            createBanco();
            createFaturamentoTipo();
            createRegraTarifaria();
            createCidade();
            createParametrosDefault();
        }
        // Garante que o usuário admin exista sempre (funciona com PostgreSQL + ddl-auto=update)
        ensureAdminUsuario();
    }

    /**
     * Cria ou atualiza o usuário admin (admin@teste.com / teste) para login.
     * Roda em toda subida da aplicação, inclusive com ddl-auto=update.
     */
    private void ensureAdminUsuario() {
        var existing = usuarioRepository.findByEmail("admin@teste.com");
        if (existing.isPresent()) {
            usuarioRepository.updateSenhaAndStatusByEmail(
                    "admin@teste.com",
                    passwordEncoder.encode("teste"),
                    1L
            );
            return;
        }
        Perfil perfilAdmin = getOrCreatePerfilAdmin();
        Consumidor consumidor = consumidorRepository.findAll().stream().findFirst().orElse(null);
        Usina usina = usinaRepository.findAll().stream().findFirst().orElse(null);
        if (consumidor == null || usina == null) {
            Distribuidora dist = createDistribuidora();
            Representante rep = createRepresentantePF();
            if (usina == null) usina = createUsina(dist, rep);
            if (consumidor == null) consumidor = createConsumidor(dist, rep);
        }
        createUsuario("Administrador", "admin@teste.com", "teste", perfilAdmin, consumidor, usina);
    }

    private Perfil getOrCreatePerfilAdmin() {
        List<Perfil> perfis = perfilRepository.findByNome(PerfilTipo.ADMINISTRADOR.getDescricao());
        if (!perfis.isEmpty()) return perfis.get(0);
        List<Permissao> permAdmin = permissaoRepository.findByNome(PermissaoDefault.ADMIN.name());
        Permissao pADMIN = permAdmin.isEmpty()
                ? permissaoRepository.save(new Permissao(null, PermissaoDefault.ADMIN.name(), PermissaoDefault.ADMIN.getDescricao()))
                : permAdmin.get(0);
        Set<Permissao> permissoes = new HashSet<>();
        permissoes.add(pADMIN);
        return perfilRepository.save(new Perfil(null, PerfilTipo.ADMINISTRADOR.getDescricao(), PerfilTipo.ADMINISTRADOR, permissoes));
    }

    private void createParametrosDefault() {
        parametroRepository.save(new Parametro("cooperativaNomeTitulo", "INTEGRA COOPERATIVA DE ENERGIA SOLAR"));
        parametroRepository.save(new Parametro("cooperativaEnderecoTitulo", "RUA SANTA CATARINA, 1284 - CENTRO - SALA B - 85801-040"));
        parametroRepository.save(new Parametro("cooperativaCNPJTitulo", "43.537.724/0001-81"));
        parametroRepository.save(new Parametro("multaTituloReceber", "2"));
        parametroRepository.save(new Parametro("jurosMesTituloReceber", "1"));
    }

    private void createPerfilPermissoes(Consumidor consumidor, Usina usina) {
        Permissao pADMIN = permissaoRepository.save(new Permissao(null, PermissaoDefault.ADMIN.name(), PermissaoDefault.ADMIN.getDescricao()));
        Permissao pALOCACAO = permissaoRepository.save(new Permissao(null, PermissaoDefault.ALOCACAO.name(), PermissaoDefault.ALOCACAO.getDescricao()));
        Permissao pCOBRANCA = permissaoRepository.save(new Permissao(null, PermissaoDefault.COBRANCA.name(), PermissaoDefault.COBRANCA.getDescricao()));
        Permissao pCONSUMO = permissaoRepository.save(new Permissao(null, PermissaoDefault.CONSUMO.name(), PermissaoDefault.CONSUMO.getDescricao()));
        Permissao pDADOS = permissaoRepository.save(new Permissao(null, PermissaoDefault.DADOS.name(), PermissaoDefault.DADOS.getDescricao()));
        Permissao pDASHBOARD = permissaoRepository.save(new Permissao(null, PermissaoDefault.DASHBOARD.name(), PermissaoDefault.DASHBOARD.getDescricao()));
        Permissao pFATURAS = permissaoRepository.save(new Permissao(null, PermissaoDefault.FATURAS.name(), PermissaoDefault.FATURAS.getDescricao()));
        Permissao pGERACAO = permissaoRepository.save(new Permissao(null, PermissaoDefault.GERACAO.name(), PermissaoDefault.GERACAO.getDescricao()));
        Permissao pNOTIFICACAO = permissaoRepository.save(new Permissao(null, PermissaoDefault.NOTIFICACAO.name(), PermissaoDefault.NOTIFICACAO.getDescricao()));
        Permissao pPESSOAS = permissaoRepository.save(new Permissao(null, PermissaoDefault.PESSOAS.name(), PermissaoDefault.PESSOAS.getDescricao()));

        Set<Permissao> permissoes = new HashSet<>();
        permissoes.add(pADMIN);
        Perfil perfilAdmin = perfilRepository.save(new Perfil(null, PerfilTipo.ADMINISTRADOR.getDescricao(), PerfilTipo.ADMINISTRADOR, permissoes));
        createUsuario("Administrador", "admin@teste.com", "teste", perfilAdmin, consumidor, usina);

        permissoes = new HashSet<>();
        permissoes.add(pDADOS);
        Perfil perfilUsina = perfilRepository.save(new Perfil(null, PerfilTipo.USINA.getDescricao(), PerfilTipo.USINA, permissoes));
        createUsuario("Usina", "usina@teste.com", "teste", perfilUsina, consumidor, usina);

        permissoes = new HashSet<>();
        permissoes.add(pDADOS);
        Perfil perfilConsumidor = perfilRepository.save(new Perfil(null, PerfilTipo.CONSUMIDOR.getDescricao(), PerfilTipo.CONSUMIDOR, permissoes));
        createUsuario("Consumidor", "consumidor@teste.com", "teste", perfilConsumidor, consumidor, usina);

        permissoes = new HashSet<>();
        permissoes.add(pDASHBOARD);
        permissoes.add(pNOTIFICACAO);
        permissoes.add(pPESSOAS);
        permissoes.add(pGERACAO);
        permissoes.add(pCONSUMO);
        permissoes.add(pALOCACAO);
        Perfil perfilBackOffice = perfilRepository.save(new Perfil(null, PerfilTipo.BACKOFFICE.getDescricao(), PerfilTipo.BACKOFFICE, permissoes));
        createUsuario("Backoffice", "backoffice@teste.com", "teste", perfilBackOffice, consumidor, usina);

        permissoes = new HashSet<>();
        permissoes.add(pPESSOAS);
        permissoes.add(pFATURAS);
        permissoes.add(pCOBRANCA);
        Perfil perfilFinanceiro = perfilRepository.save(new Perfil(null, PerfilTipo.FINANCEIRO.getDescricao(), PerfilTipo.FINANCEIRO, permissoes));
        createUsuario("Financeiro", "financeiro@teste.com", "teste", perfilFinanceiro, consumidor, usina);
    }

    private void createUsuario(String nome, String email, String senha, Perfil perfilAdmin, Consumidor consumidor, Usina usina) {
        var userAdmin = usuarioRepository.findByEmail(email);


        userAdmin.ifPresentOrElse(
                user -> {
                    UsuarioUsina usuarioUsina = new UsuarioUsina();
                    usuarioUsina.setUsina(usina);
                    usuarioUsina.setUsuario(user);
                    usuarioUsina.setProprietario(false);

                    user.setNome(nome);
                    user.setSenha(passwordEncoder.encode(senha));
                    user.setPerfil(perfilAdmin);
                    user.setStatus(1L);
                    user.setConsumidores(Set.of(consumidor));
                    user.setUsinas(Set.of(usuarioUsina));
                    usuarioRepository.save(user);
                },
                () -> {
                    var user = new Usuario();
                    UsuarioUsina usuarioUsina = new UsuarioUsina();
                    usuarioUsina.setUsina(usina);
                    usuarioUsina.setUsuario(user);
                    usuarioUsina.setProprietario(false);

                    user.setNome(nome);
                    user.setSenha(passwordEncoder.encode(senha));
                    user.setPerfil(perfilAdmin);
                    user.setStatus(1L);
                    user.setEmail(email);
                    user.setConsumidores(Set.of(consumidor));
                    user.setUsinas(Set.of(usuarioUsina));
                    usuarioRepository.save(user);
                }
        );
    }

    private Cidade createCidade() {
        cidadeRepository.save(new Cidade(null, "4104808", "Cascavel", "PR"));
        return cidadeRepository.save(new Cidade(null, "3550308", "São Paulo", "SP"));
    }

    private Banco createBanco() {
        return bancoRepository.save(new Banco(null, "BANCO DO BRASIL", 1L));
    }

    private FaturamentoTipo createFaturamentoTipo() {
        return faturamentoTipoRepository.save(new FaturamentoTipo(null, "FATURAMENTO TIPO TESTE", "DESCRICAO TESTE", "REFERENCIA TESTE"));
    }

    private RegraTarifaria createRegraTarifaria() {
        return regraTarifariaRepository.save(new RegraTarifaria(null, "REGRA TARIFARIA TESTE", BigDecimal.ONE, "DESCRICAO TESTE"));
    }

    private Usina createUsina(Distribuidora distribuidora, Representante representante) {

        Usina usina = new Usina();
        usina.setNome("Usina Teste 1");
        usina.setDistribuidora(distribuidora);
        usina.setUc("UC-USINA-1");
        usina.adicionarRepresentante(representante, UsinaRepresentanteRelacaoTipo.GESTORA);
        usina.setStatus(UsinaStatus.ATIVO);
        return usinaRepository.save(usina);
    }

    private Representante createRepresentantePF() {
        PessoaFisica pessoaFisica = new PessoaFisica();
        pessoaFisica.setNome("Representante Teste Pessoa Fisica");
        pessoaFisica.setCpf("12345678901");
        Representante representante = new Representante();
        representante.setPessoaFisica(pessoaFisica);
        representante.setTipoPessoa(PessoaTipo.PESSOA_FISICA);
        representante.setTelefone("00000000000");
        representante.setStatus(1L);
        return representanteRepository.save(representante);
    }

    private Representante createRepresentantePJ() {
        PessoaJuridica pessoaJuridica = new PessoaJuridica();
        pessoaJuridica.setRazaoSocial("Representante Teste Pessoa Juridica");
        pessoaJuridica.setNomeFantasia("Representante Teste Pessoa Juridica");
        pessoaJuridica.setCnpj("12345678000100");

        Representante representante = new Representante();
        representante.setPessoaJuridica(pessoaJuridica);
        representante.setTipoPessoa(PessoaTipo.PESSOA_JURIDICA);
        representante.setTelefone("00000000000");
        representante.setStatus(1L);
        return representanteRepository.save(representante);
    }

    private Consumidor createConsumidor(Distribuidora distribuidora, Representante representante) {
        Consumidor consumidor = new Consumidor();
        consumidor.setNome("Consumidor Teste 1");
        consumidor.setUc("UC-CONSUMIDOR-1");
        consumidor.setDistribuidora(distribuidora);
        consumidor.setRepresentanteTitular(representante);
        consumidor.setStatus(ConsumidorStatus.AGUARDANDO_DOCUMENTOS);
        return consumidorRepository.save(consumidor);
    }

    private Distribuidora createDistribuidora() {
        Distribuidora distribuidora = new Distribuidora();
        distribuidora.setNome("Distribuidora Teste 1");
        distribuidora.setSigla("D1");
        distribuidora.setStatus(1L);
        distribuidora.setUrl("http://distribuidora1.com.br");
        return distribuidoraRepository.save(distribuidora);
    }

    private TipoDescontoItem createTipoDescontoItem(TipoDesconto tipoDesconto) {
        TipoDescontoItem tipoDescontoItem = new TipoDescontoItem();
        tipoDescontoItem.setTipoDesconto(tipoDesconto);
        tipoDescontoItem.setTipo(DescontoTipo.ENERGIA_COMPENSADA);
        tipoDescontoItem.setValorTipo(DescontoValorTipo.FIXO);
        tipoDescontoItem.setValor(BigDecimal.valueOf(10.10));
        return tipoDescontoItemRepository.save(tipoDescontoItem);
    }

    private TipoDesconto createTipoDesconto() {
        TipoDesconto tipoDesconto = new TipoDesconto();
        tipoDesconto.setNome("Tipo Desconto Teste 1");
        tipoDesconto.setDescricao("Tipo Desconto Teste 1");
        return tipoDescontoRepository.save(tipoDesconto);
    }

    private BandeiraTarifaria createBandeiraTarifaria(String cor) {
        BandeiraTarifaria bandeiraTarifaria = new BandeiraTarifaria();
        bandeiraTarifaria.setNome(cor);
        bandeiraTarifaria.setDescricao(cor);
        bandeiraTarifaria.setAdicional(BigDecimal.ZERO);
        bandeiraTarifaria.setCor(cor);
        return bandeiraTarifariaRepository.save(bandeiraTarifaria);
    }
}
