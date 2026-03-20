export interface API {
	schemas: {
		IdRequest: {
			/** Format: int64 */
			id?: number;
		};
		UsuarioRequest: {
			nome: string;
			celular?: string;
			email: string;
			senha?: string;
			urlFoto?: string;
			/** Format: int64 */
			sexo?: number;
			/** Format: date */
			dataNascimento?: string;
			/** Format: int64 */
			status?: number;
			perfil: API["schemas"]["IdRequest"];
			consumidores?: API["schemas"]["IdRequest"][];
			usinas?: API["schemas"]["UsuarioUsinaRequest"][];
		};
		UsuarioUsinaRequest: {
			usina: API["schemas"]["IdRequest"];
			proprietario: boolean;
		};
		BancoResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			/** Format: int64 */
			codigoBacen?: number;
		};
		CidadeResponse: {
			/** Format: int64 */
			id?: number;
			idIbge?: string;
			nome?: string;
			uf?: string;
		};
		ConsumidorRepresentanteResponse: {
			representante?: API["schemas"]["RepresentanteDadosPrimariosResponse"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
		};
		ConsumidorResponse: {
			/** Format: int64 */
			id?: number;
			distribuidora?: API["schemas"]["DistribuidoraResponse"];
			representantes?: API["schemas"]["ConsumidorRepresentanteResponse"][];
			representanteTitular?: API["schemas"]["RepresentanteDadosPrimariosResponse"];
			endereco?: API["schemas"]["EnderecoResponse"];
			nome?: string;
			uc?: string;
			/** @enum {string} */
			classificacao?: "B1_RESIDENCIAL" | "B2_RURAL" | "B3_COMERCIAL";
			/** @enum {string} */
			tipo?: "AUTOCONSUMO" | "GERACAO_COMPARTILHADA";
			geracaoPropria?: number;
			consumorReferenciaKwh?: number;
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			/** Format: date */
			dataAssinaturaContrato?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_COMPENSACAO"
				| "AGUARDANDO_DOCUMENTOS"
				| "AGUARDANDO_GERADOR"
				| "PROTOCOLADO"
				| "ESGOTANDO_CREDITOS"
				| "EM_NEGOCIACAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
		};
		ContaResponse: {
			/** Format: int64 */
			id?: number;
			banco?: API["schemas"]["BancoResponse"];
			nomeTitular?: string;
			cpfCnpjTitular?: string;
			agencia?: string;
			dacAgencia?: string;
			conta?: string;
			dacConta?: string;
			chavePix?: string;
			/** Format: date */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
		};
		DistribuidoraResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			sigla?: string;
			/** Format: int64 */
			status?: number;
			url?: string;
			cnpj?: string;
		};
		EnderecoResponse: {
			/** Format: int64 */
			id?: number;
			cidade?: API["schemas"]["CidadeResponse"];
			endereco?: string;
			numero?: string;
			complemento?: string;
			latitude?: number;
			longitude?: number;
			cep?: string;
			bairro?: string;
		};
		FaturamentoTipoResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			descricao?: string;
			referencia?: string;
		};
		PerfilResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			/** @enum {string} */
			tipo?:
				| "ADMINISTRADOR"
				| "CONSUMIDOR"
				| "USINA"
				| "BACKOFFICE"
				| "FINANCEIRO"
				| "DADOS";
			permissoes?: API["schemas"]["PermissaoResponse"][];
		};
		PermissaoResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			descricao?: string;
		};
		PessoaFisicaResponse: {
			nome?: string;
			cpf?: string;
			rg?: string;
			profissao?: string;
			/** @enum {string} */
			sexo?: "MASCULINO" | "FEMININO";
			nacionalidade?: string;
			estadoCivil?: string;
			dataNascimento?: string;
		};
		PessoaJuridicaResponse: {
			razaoSocial?: string;
			nomeFantasia?: string;
			cnpj?: string;
			inscricaoEstadual?: string;
		};
		RegraTarifariaResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			valor?: number;
			descricao?: string;
		};
		RepresentanteDadosPrimariosResponse: {
			/** Format: int64 */
			id?: number;
			endereco?: API["schemas"]["EnderecoResponse"];
			pessoaFisica?: API["schemas"]["PessoaFisicaResponse"];
			pessoaJuridica?: API["schemas"]["PessoaJuridicaResponse"];
			/** @enum {string} */
			tipoPessoa?: "PESSOA_FISICA" | "PESSOA_JURIDICA" | "GESTORA";
			telefone?: string;
			email?: string;
			/** @enum {string} */
			tipoRelacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
			/** Format: date-time */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
		};
		UsinaDadosPrimariosResponse: {
			/** Format: int64 */
			id?: number;
			conta?: API["schemas"]["ContaResponse"];
			endereco?: API["schemas"]["EnderecoResponse"];
			faturamentoTipo?: API["schemas"]["FaturamentoTipoResponse"];
			regraTarifaria?: API["schemas"]["RegraTarifariaResponse"];
			distribuidora?: API["schemas"]["DistribuidoraResponse"];
			nome?: string;
			uc?: string;
			classificacao?: string;
			/** @enum {string} */
			status?: "ATIVO" | "INATIVO" | "EM_NEGOCIACAO" | "TROCANDO_TITULARIDADE";
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			demandaPonta?: number;
			demandaFPonta?: number;
			potenciaNominal?: number;
			pontenciaPico?: number;
			/** @enum {string} */
			tensaoConexao?: "ALTA_TENSAO" | "BAIXA_TENSAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
			saldoAcumulado?: number;
			saldoAcumuladoInicial?: number;
			/** Format: int64 */
			prioridadeAlocacao?: number;
			/** Format: date */
			dataPrimeiraInjecao?: string;
			/** Format: date */
			dataTrocaTitularidade?: string;
			/** Format: date */
			dataPrimeiroCadastro?: string;
			/** Format: date */
			dataPrevistaLeitura?: string;
			valorKwh?: number;
		};
		UsuarioResponse: {
			id?: string;
			nome?: string;
			celular?: string;
			email?: string;
			urlFoto?: string;
			/** Format: int64 */
			sexo?: number;
			/** Format: date */
			dataNascimento?: string;
			/** Format: date-time */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
			perfil?: API["schemas"]["PerfilResponse"];
			consumidores?: API["schemas"]["ConsumidorResponse"][];
			usinas?: API["schemas"]["UsuarioUsinaResponse"][];
		};
		UsuarioUsinaResponse: {
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			proprietario?: boolean;
		};
		CidadeRequest: {
			idIbge: string;
			nome: string;
			uf: string;
		};
		ContaRequest: {
			banco: API["schemas"]["IdRequest"];
			nomeTitular: string;
			cpfCnpjTitular: string;
			agencia: string;
			dacAgencia: string;
			conta: string;
			dacConta: string;
			chavePix?: string;
			/** Format: date */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
		};
		EnderecoRequest: {
			cidade?: API["schemas"]["CidadeRequest"];
			endereco?: string;
			numero?: string;
			complemento?: string;
			latitude?: number;
			longitude?: number;
			cep?: string;
			bairro?: string;
		};
		UsinaRequest: {
			conta?: API["schemas"]["ContaRequest"];
			endereco?: API["schemas"]["EnderecoRequest"];
			faturamentoTipo?: API["schemas"]["IdRequest"];
			regraTarifaria?: API["schemas"]["IdRequest"];
			distribuidora?: API["schemas"]["IdRequest"];
			representanteTitular?: API["schemas"]["IdRequest"];
			representantes?: API["schemas"]["UsinaRespresentanteRequest"][];
			nome?: string;
			uc?: string;
			/** @enum {string} */
			classificacao?:
				| "B1_RESIDENCIAL"
				| "B2_RURAL"
				| "B3_INDUSTRIAL_COMERCIAL"
				| "A4"
				| "A3A";
			/** @enum {string} */
			status?: "ATIVO" | "INATIVO" | "EM_NEGOCIACAO" | "TROCANDO_TITULARIDADE";
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			demandaPonta?: number;
			demandaFPonta?: number;
			potenciaNominal?: number;
			pontenciaPico?: number;
			/** @enum {string} */
			tensaoConexao?: "ALTA_TENSAO" | "BAIXA_TENSAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
			saldoAcumulado?: number;
			saldoAcumuladoInicial?: number;
			/** Format: int64 */
			prioridadeAlocacao?: number;
			/** Format: date */
			dataPrimeiraInjecao?: string;
			/** Format: date */
			dataTrocaTitularidade?: string;
			/** Format: date */
			dataPrimeiroCadastro?: string;
			/** Format: date */
			dataPrevistaLeitura?: string;
			valorKwh?: number;
		};
		UsinaRespresentanteRequest: {
			representante?: API["schemas"]["IdRequest"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
		};
		UsinaResponse: {
			/** Format: int64 */
			id?: number;
			conta?: API["schemas"]["ContaResponse"];
			endereco?: API["schemas"]["EnderecoResponse"];
			faturamentoTipo?: API["schemas"]["FaturamentoTipoResponse"];
			regraTarifaria?: API["schemas"]["RegraTarifariaResponse"];
			distribuidora?: API["schemas"]["DistribuidoraResponse"];
			representanteTitular?: API["schemas"]["RepresentanteDadosPrimariosResponse"];
			representantes?: API["schemas"]["UsinaRespresentanteResponse"][];
			nome?: string;
			uc?: string;
			/** @enum {string} */
			classificacao?:
				| "B1_RESIDENCIAL"
				| "B2_RURAL"
				| "B3_INDUSTRIAL_COMERCIAL"
				| "A4"
				| "A3A";
			/** @enum {string} */
			status?: "ATIVO" | "INATIVO" | "EM_NEGOCIACAO" | "TROCANDO_TITULARIDADE";
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			demandaPonta?: number;
			demandaFPonta?: number;
			potenciaNominal?: number;
			pontenciaPico?: number;
			/** @enum {string} */
			tensaoConexao?: "ALTA_TENSAO" | "BAIXA_TENSAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
			saldoAcumulado?: number;
			saldoAcumuladoInicial?: number;
			cotaAlocada?: number;
			/** Format: int64 */
			prioridadeAlocacao?: number;
			/** Format: date */
			dataPrimeiraInjecao?: string;
			/** Format: date */
			dataTrocaTitularidade?: string;
			/** Format: date */
			dataPrimeiroCadastro?: string;
			/** Format: date */
			dataPrevistaLeitura?: string;
			valorKwh?: number;
		};
		UsinaRespresentanteResponse: {
			representante?: API["schemas"]["RepresentanteDadosPrimariosResponse"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
		};
		TituloItemRequest: {
			nome?: string;
			valor?: number;
			descricao?: string;
			/** @enum {string} */
			tipo?: "DESCONTO" | "ACRESCIMO";
		};
		TituloRequest: {
			tipoDescontoItem?: API["schemas"]["IdRequest"];
			usina?: API["schemas"]["IdRequest"];
			consumidor?: API["schemas"]["IdRequest"];
			identificador?: string;
			/** @enum {string} */
			tipo?: "PAGAR" | "RECEBER";
			/** Format: date */
			mesReferencia?: string;
			/** Format: date */
			dataVencimento?: string;
			/** Format: date */
			dataEmissao?: string;
			/** @enum {string} */
			status?:
				| "AGUARDANDO_FATURA"
				| "FATURANDO"
				| "EM_ABERTO"
				| "PAGO"
				| "VENCIDO"
				| "NAO_FATURADO"
				| "CANCELADO"
				| "RASCUNHO";
			observacao?: string;
			energiaInjetada?: number;
			consumoLocal?: number;
			energiaCompensada?: number;
			energiaDistribuida?: number;
			valorTotalDistribuidora?: number;
			valorTotal?: number;
			consumoTotal?: number;
			tarifaComImposto?: number;
			tarifaSemImposto?: number;
			tarifaDesconto?: number;
			saldoCreditos?: number;
			linhaDigitavel?: string;
			identificadorBoleto?: string;
			instituicaoBoleto?: string;
			economiaGerada?: number;
			tarifaEnergiaCompensada?: number;
			tarifaConsumoLocal?: number;
			tarifaEnergiaDistribuida?: number;
			saldoAcumulado?: number;
			consumoCompensavel?: number;
			tarifaConsumoCompensavel?: number;
			adicionalBandeira?: number;
			tarifaAdicionalBandeira?: number;
			itens?: API["schemas"]["TituloItemRequest"][];
		};
		ConsumidorDadosPrimariosResponse: {
			/** Format: int64 */
			id?: number;
			distribuidora?: API["schemas"]["DistribuidoraResponse"];
			endereco?: API["schemas"]["EnderecoResponse"];
			nome?: string;
			uc?: string;
			/** @enum {string} */
			classificacao?: "B1_RESIDENCIAL" | "B2_RURAL" | "B3_COMERCIAL";
			/** @enum {string} */
			tipo?: "AUTOCONSUMO" | "GERACAO_COMPARTILHADA";
			geracaoPropria?: number;
			consumorReferenciaKwh?: number;
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			dataAssinaturaContrato?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_COMPENSACAO"
				| "AGUARDANDO_DOCUMENTOS"
				| "AGUARDANDO_GERADOR"
				| "PROTOCOLADO"
				| "ESGOTANDO_CREDITOS"
				| "EM_NEGOCIACAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
		};
		TipoDescontoItemResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			/** @enum {string} */
			tipo?:
				| "VALOR_ENERGIA_COMPENSADA"
				| "VALOR_ENERGIA_COMPENSADA_BANDEIRA"
				| "VALOR_ENERGIA_COM_IMPOSTOS"
				| "VALOR_ENERGIA_SEM_IMPOSTOS"
				| "TOTAL_COPEL"
				| "TARIFA_SEM_IMPOSTOS"
				| "TARIFA_COMPENSADA"
				| "TARIFA_COMPENSADA_BANDEIRA"
				| "TARIFA_COM_IMPOSTOS"
				| "FATURA_COPEL"
				| "VALOR_FIXO"
				| "ENERGIA_COMPENSADA"
				| "ENERGIA_INJETADA";
			/** @enum {string} */
			valorTipo?: "FIXO" | "PERCENTUAL";
			valor?: number;
		};
		TituloItemResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			valor?: number;
			descricao?: string;
			/** @enum {string} */
			tipo?: "DESCONTO" | "ACRESCIMO";
		};
		TituloResponse: {
			/** Format: int64 */
			id?: number;
			tipoDescontoItem?: API["schemas"]["TipoDescontoItemResponse"];
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			identificador?: string;
			/** @enum {string} */
			tipo?: "PAGAR" | "RECEBER";
			/** Format: date */
			mesReferencia?: string;
			/** Format: date */
			dataVencimento?: string;
			/** Format: date */
			dataEmissao?: string;
			/** @enum {string} */
			status?:
				| "AGUARDANDO_FATURA"
				| "FATURANDO"
				| "EM_ABERTO"
				| "PAGO"
				| "VENCIDO"
				| "NAO_FATURADO"
				| "CANCELADO"
				| "RASCUNHO";
			observacao?: string;
			energiaInjetada?: number;
			consumoLocal?: number;
			energiaCompensada?: number;
			energiaDistribuida?: number;
			valorTotalDistribuidora?: number;
			valorTotal?: number;
			consumoTotal?: number;
			tarifaComImposto?: number;
			tarifaSemImposto?: number;
			tarifaDesconto?: number;
			saldoCreditos?: number;
			linhaDigitavel?: string;
			identificadorBoleto?: string;
			instituicaoBoleto?: string;
			economiaGerada?: number;
			tarifaEnergiaCompensada?: number;
			tarifaConsumoLocal?: number;
			tarifaEnergiaDistribuida?: number;
			saldoAcumulado?: number;
			consumoCompensavel?: number;
			tarifaConsumoCompensavel?: number;
			adicionalBandeira?: number;
			tarifaAdicionalBandeira?: number;
			itens?: API["schemas"]["TituloItemResponse"][];
		};
		TipoDescontoItemResquest: {
			nome: string;
			/** @enum {string} */
			tipo:
				| "VALOR_ENERGIA_COMPENSADA"
				| "VALOR_ENERGIA_COMPENSADA_BANDEIRA"
				| "VALOR_ENERGIA_COM_IMPOSTOS"
				| "VALOR_ENERGIA_SEM_IMPOSTOS"
				| "TOTAL_COPEL"
				| "TARIFA_SEM_IMPOSTOS"
				| "TARIFA_COMPENSADA"
				| "TARIFA_COMPENSADA_BANDEIRA"
				| "TARIFA_COM_IMPOSTOS"
				| "FATURA_COPEL"
				| "VALOR_FIXO"
				| "ENERGIA_COMPENSADA"
				| "ENERGIA_INJETADA";
			/** @enum {string} */
			valorTipo: "FIXO" | "PERCENTUAL";
			valor?: number;
		};
		TipoDescontoRequest: {
			nome?: string;
			descricao?: string;
			itens?: API["schemas"]["TipoDescontoItemResquest"][];
		};
		TipoDescontoResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			descricao?: string;
			itens?: API["schemas"]["TipoDescontoItemResponse"][];
		};
		PessoaFisicaRequest: {
			nome?: string;
			cpf?: string;
			rg?: string;
			profissao?: string;
			/** @enum {string} */
			sexo?: "MASCULINO" | "FEMININO";
			nacionalidade?: string;
			estadoCivil?: string;
			dataNascimento?: string;
		};
		PessoaJuridicaRequest: {
			razaoSocial?: string;
			nomeFantasia?: string;
			cnpj?: string;
			inscricaoEstadual?: string;
		};
		RepresentanteConsumidorRequest: {
			consumidor?: API["schemas"]["IdRequest"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
			titular?: boolean;
		};
		RepresentanteRequest: {
			endereco?: API["schemas"]["EnderecoRequest"];
			pessoaFisica?: API["schemas"]["PessoaFisicaRequest"];
			pessoaJuridica?: API["schemas"]["PessoaJuridicaRequest"];
			/** @enum {string} */
			tipoPessoa?: "PESSOA_FISICA" | "PESSOA_JURIDICA" | "GESTORA";
			telefone?: string;
			email?: string;
			/** @enum {string} */
			tipoRelacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
			/** Format: int64 */
			status?: number;
			consumidores?: API["schemas"]["RepresentanteConsumidorRequest"][];
			usinas?: API["schemas"]["RepresentanteUsinaRequest"][];
		};
		RepresentanteUsinaRequest: {
			usina?: API["schemas"]["IdRequest"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
		};
		RepresentanteConsumidorResponse: {
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
			titular?: boolean;
		};
		RepresentanteResponse: {
			/** Format: int64 */
			id?: number;
			endereco?: API["schemas"]["EnderecoResponse"];
			pessoaFisica?: API["schemas"]["PessoaFisicaResponse"];
			pessoaJuridica?: API["schemas"]["PessoaJuridicaResponse"];
			/** @enum {string} */
			tipoPessoa?: "PESSOA_FISICA" | "PESSOA_JURIDICA" | "GESTORA";
			telefone?: string;
			email?: string;
			/** @enum {string} */
			tipoRelacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
			/** Format: date-time */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
			consumidores?: API["schemas"]["RepresentanteConsumidorResponse"][];
			usinas?: API["schemas"]["RepresentanteUsinaResponse"][];
		};
		RepresentanteUsinaResponse: {
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			relacao?: string;
		};
		RegraTarifariaRequest: {
			nome: string;
			valor?: number;
			descricao?: string;
		};
		PrevisaoRequest: {
			usina: API["schemas"]["IdRequest"];
			/** Format: date */
			mesReferencia: string;
			geracaoPrevista?: number;
			consumoPrevisto?: number;
			geracaoMediaPrevista?: number;
			consumoMedioPrevisto?: number;
		};
		PrevisaoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			/** Format: date */
			mesReferencia?: string;
			geracaoPrevista?: number;
			consumoPrevisto?: number;
			geracaoMediaPrevista?: number;
			consumoMedioPrevisto?: number;
		};
		PermissaoRequest: {
			nome?: string;
			descricao?: string;
		};
		PerfilRequest: {
			nome?: string;
			/** @enum {string} */
			tipo?:
				| "ADMINISTRADOR"
				| "CONSUMIDOR"
				| "USINA"
				| "BACKOFFICE"
				| "FINANCEIRO"
				| "DADOS";
			permissoes?: API["schemas"]["IdRequest"][];
		};
		PerfilPermissoesRequest: {
			permissoes?: number[];
		};
		PerfilPermissoesResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			/** @enum {string} */
			tipo?:
				| "ADMINISTRADOR"
				| "CONSUMIDOR"
				| "USINA"
				| "BACKOFFICE"
				| "FINANCEIRO"
				| "DADOS";
			permissoes?: API["schemas"]["PermissaoResponse"][];
		};
		ParametroRequest: {
			chave: string;
			valor?: string;
		};
		ParametroResponse: {
			chave?: string;
			valor?: string;
		};
		IrradiacaoRequest: {
			usina: API["schemas"]["IdRequest"];
			/** Format: date */
			data?: string;
			valor?: number;
		};
		IrradiacaoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			/** Format: date */
			data?: string;
			valor?: number;
		};
		GeracaoRequest: {
			usina: API["schemas"]["IdRequest"];
			/** Format: date */
			mesReferencia: string;
			valorConsumoInformado?: number;
			valorGeracaoInformado?: number;
			valorCreditoDistribuido?: number;
			valorEnergiaCompensada?: number;
			/** Format: date-time */
			dataCadastro?: string;
		};
		GeracaoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			/** Format: date */
			mesReferencia?: string;
			valorConsumoInformado?: number;
			valorGeracaoInformado?: number;
			valorCreditoDistribuido?: number;
			valorEnergiaCompensada?: number;
			/** Format: date-time */
			dataCadastro?: string;
		};
		FaturaHistoricoFaturamentoRequest: {
			/** Format: int64 */
			dias?: number;
			/** Format: int64 */
			energiaAtiva?: number;
			/** Format: date */
			data?: string;
		};
		FaturaRequest: {
			bandeiraTarifaria?: API["schemas"]["IdRequest"];
			usina?: API["schemas"]["IdRequest"];
			consumidor?: API["schemas"]["IdRequest"];
			numeroFatura?: string;
			unidadeConsumidora?: string;
			/** Format: int64 */
			custoDisponibilidade?: number;
			/** Format: date */
			mesReferencia?: string;
			geracaoAnterior?: number;
			leituraAtualConsumo?: number;
			leituraAtualGeracao?: number;
			/** Format: date */
			dataLeituraAtual?: string;
			/** Format: date */
			proximaLeitura?: string;
			/** Format: date */
			vencimento?: string;
			valorTotalFatura?: number;
			consumo?: number;
			consumoLocalUsina?: number;
			energiaInjetada?: number;
			energiaConpensadaLocal?: number;
			saldoAcumuladoAtual?: number;
			saldoAcumuladoAnterior?: number;
			movimentacaoSaldo?: number;
			energiaDistribuida?: number;
			tarifaTESI?: number;
			tarifaTUSDSI?: number;
			tarifaTotalSI?: number;
			tarifaTECI?: number;
			tarifaTUSDCI?: number;
			tarifaTotalCI?: number;
			tarifaTECompensavel?: number;
			tarifaTUSDCompensavel?: number;
			tarifaTotalCompensavel?: number;
			tarifaBandVermelhaP1SI?: number;
			tarifaBandVermelhaP1CI?: number;
			tarifaBandVermelhaP2SI?: number;
			tarifaBandVermelhaP2CI?: number;
			tarifaBandAmarelaSI?: number;
			tarifaBandAmarelaCI?: number;
			tarifaBandVermelhaP1Compensavel?: number;
			tarifaBandVermelhaP2Compensavel?: number;
			tarifaBandAmarelaCompensavel?: number;
			icms?: number;
			valorIcms?: number;
			pis?: number;
			valorPis?: number;
			confins?: number;
			valorConfins?: number;
			valorEnergiaCompensada?: number;
			custoSemGD?: number;
			historicoFaturamentos?: API["schemas"]["FaturaHistoricoFaturamentoRequest"][];
			energiaCompensadaOUC?: number;
			saldoRecebidoOUC?: number;
			relCreditoConsumo?: number;
			saldoFaltante?: number;
			/** @enum {string} */
			status?: "PROCESSADA" | "EM_PROCESSAMENTO" | "ERRO";
			faturaPDF?: string;
			creditoDistribuidos?: number;
			observacao?: string;
		};
		BandeiraTarifariaResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			descricao?: string;
			adicional?: number;
			cor?: string;
		};
		FaturaResponse: {
			/** Format: int64 */
			id?: number;
			bandeiraTarifaria?: API["schemas"]["BandeiraTarifariaResponse"];
			usina?: API["schemas"]["UsinaResponse"];
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			numeroFatura?: string;
			unidadeConsumidora?: string;
			/** Format: int64 */
			custoDisponibilidade?: number;
			/** Format: date */
			mesReferencia?: string;
			geracaoAnterior?: number;
			leituraAtualConsumo?: number;
			leituraAtualGeracao?: number;
			/** Format: date */
			dataLeituraAtual?: string;
			/** Format: date */
			proximaLeitura?: string;
			/** Format: date */
			vencimento?: string;
			valorTotalFatura?: number;
			consumo?: number;
			consumoLocalUsina?: number;
			energiaInjetada?: number;
			energiaConpensadaLocal?: number;
			saldoAcumuladoAtual?: number;
			saldoAcumuladoAnterior?: number;
			movimentacaoSaldo?: number;
			energiaDistribuida?: number;
			tarifaTESI?: number;
			tarifaTUSDSI?: number;
			tarifaTotalSI?: number;
			tarifaTECI?: number;
			tarifaTUSDCI?: number;
			tarifaTotalCI?: number;
			tarifaTECompensavel?: number;
			tarifaTUSDCompensavel?: number;
			tarifaTotalCompensavel?: number;
			tarifaBandVermelhaP1SI?: number;
			tarifaBandVermelhaP1CI?: number;
			tarifaBandVermelhaP2SI?: number;
			tarifaBandVermelhaP2CI?: number;
			tarifaBandAmarelaSI?: number;
			tarifaBandAmarelaCI?: number;
			tarifaBandVermelhaP1Compensavel?: number;
			tarifaBandVermelhaP2Compensavel?: number;
			tarifaBandAmarelaCompensavel?: number;
			icms?: number;
			valorIcms?: number;
			pis?: number;
			valorPis?: number;
			confins?: number;
			valorConfins?: number;
			valorEnergiaCompensada?: number;
			custoSemGD?: number;
			historicoFaturamentos?: API["schemas"]["FaturaHistoricoFaturamentoRequest"][];
			energiaCompensadaOUC?: number;
			saldoRecebidoOUC?: number;
			relCreditoConsumo?: number;
			saldoFaltante?: number;
			/** @enum {string} */
			status?: "PROCESSADA" | "EM_PROCESSAMENTO" | "ERRO";
			faturaPDF?: string;
			creditoDistribuidos?: number;
			observacao?: string;
		};
		FaturamentoTipoRequest: {
			nome?: string;
			descricao?: string;
			referencia?: string;
		};
		DocumentoRequest: {
			usina?: API["schemas"]["IdRequest"];
			consumidor?: API["schemas"]["IdRequest"];
			representante?: API["schemas"]["IdRequest"];
			usuario?: API["schemas"]["IdRequest"];
			descricao?: string;
			nome?: string;
			tipo?: string;
			tamanho?: number;
			base64?: string;
		};
		DocumentoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			representante?: API["schemas"]["RepresentanteDadosPrimariosResponse"];
			usuario?: API["schemas"]["UsuarioDadosPrimariosResponse"];
			nome?: string;
			descricao?: string;
			tamanho?: number;
			tipo?: string;
			/** Format: date-time */
			dataHora?: string;
		};
		UsuarioDadosPrimariosResponse: {
			id?: string;
			nome?: string;
			celular?: string;
			email?: string;
			urlFoto?: string;
			/** Format: int64 */
			sexo?: number;
			/** Format: date */
			dataNascimento?: string;
			/** Format: date-time */
			dataAlteracao?: string;
			/** Format: int64 */
			status?: number;
		};
		DistribuidoraRequest: {
			nome: string;
			sigla?: string;
			/** Format: int64 */
			status?: number;
			url?: string;
			cnpj?: string;
		};
		ContratoRequest: {
			usina: API["schemas"]["IdRequest"];
			descricao?: string;
			url?: string;
			/** Format: date-time */
			dataHora?: string;
			/** Format: int64 */
			tarifaValor?: number;
			/** Format: int64 */
			status?: number;
		};
		ContratoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			descricao?: string;
			url?: string;
			/** Format: date-time */
			dataHora?: string;
			/** Format: int64 */
			tarifaValor?: number;
			/** Format: int64 */
			status?: number;
		};
		ConsumidorRepresentanteRequest: {
			representante: API["schemas"]["IdRequest"];
			/** @enum {string} */
			relacao?:
				| "CONTATO"
				| "OPERADOR"
				| "TESTEMUNHA"
				| "RESPONSAVEL_LEGAL"
				| "SOCIO"
				| "SOCIO_ADMINISTRADOR"
				| "COMISSIONADO"
				| "GESTORA";
		};
		ConsumidorRequest: {
			distribuidora: API["schemas"]["IdRequest"];
			endereco?: API["schemas"]["EnderecoRequest"];
			representantes?: API["schemas"]["ConsumidorRepresentanteRequest"][];
			representanteTitular: API["schemas"]["IdRequest"];
			nome: string;
			uc?: string;
			/** @enum {string} */
			classificacao?: "B1_RESIDENCIAL" | "B2_RURAL" | "B3_COMERCIAL";
			/** @enum {string} */
			tipo?: "AUTOCONSUMO" | "GERACAO_COMPARTILHADA";
			geracaoPropria?: number;
			consumorReferenciaKwh?: number;
			loginDistribuidora?: string;
			senhaDistribuidora?: string;
			/** Format: date */
			dataAssinaturaContrato?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_COMPENSACAO"
				| "AGUARDANDO_DOCUMENTOS"
				| "AGUARDANDO_GERADOR"
				| "PROTOCOLADO"
				| "ESGOTANDO_CREDITOS"
				| "EM_NEGOCIACAO";
			/** @enum {string} */
			tipoConexao?: "MONOFASICO" | "BIFASICO" | "TRIFASICO";
		};
		BandeiraTarifariaRequest: {
			nome: string;
			descricao?: string;
			adicional?: number;
			cor?: string;
		};
		BancoRequest: {
			nome: string;
			/** Format: int64 */
			codigoBacen?: number;
		};
		AlocacaoItemRequest: {
			consumidor: API["schemas"]["IdRequest"];
			consumo?: number;
			consumoRef?: number;
			quota?: number;
			quotaExcedente?: number;
		};
		AlocacaoDadosPrimariosResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			/** Format: date-time */
			dataInicio?: string;
			/** Format: date-time */
			dataFinal?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_PROTOCOLO"
				| "SENDO_SUBSTITUIDO";
		};
		AlocacaoItemResponse: {
			alocacao?: API["schemas"]["AlocacaoDadosPrimariosResponse"];
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			consumo?: number;
			consumoRef?: number;
			quota?: number;
			quotaExcedente?: number;
		};
		AlocacaoRequest: {
			usina: API["schemas"]["IdRequest"];
			itens: API["schemas"]["AlocacaoItemRequest"][];
			/** Format: date-time */
			dataInicio?: string;
			/** Format: date-time */
			dataFinal?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_PROTOCOLO"
				| "SENDO_SUBSTITUIDO";
		};
		AlocacaoItemConsumidorResponse: {
			consumidor?: API["schemas"]["ConsumidorDadosPrimariosResponse"];
			consumo?: number;
			consumoRef?: number;
			quota?: number;
			quotaExcedente?: number;
		};
		AlocacaoResponse: {
			/** Format: int64 */
			id?: number;
			usina?: API["schemas"]["UsinaDadosPrimariosResponse"];
			itens?: API["schemas"]["AlocacaoItemConsumidorResponse"][];
			/** Format: date-time */
			dataInicio?: string;
			/** Format: date-time */
			dataFinal?: string;
			/** @enum {string} */
			status?:
				| "ATIVO"
				| "INATIVO"
				| "AGUARDANDO_PROTOCOLO"
				| "SENDO_SUBSTITUIDO";
		};
		UsuarioLogRequest: {
			usuario: API["schemas"]["IdRequest"];
			/** Format: date-time */
			dataHora: string;
			evento: string;
			mensagem: string;
			origem: string;
		};
		UsuarioLogResponse: {
			/** Format: int64 */
			id?: number;
			usuario?: API["schemas"]["UsuarioDadosPrimariosResponse"];
			/** Format: date-time */
			dataHora?: string;
			evento?: string;
			mensagem?: string;
			origem?: string;
		};
		ComposicaoDTO: {
			/** Format: int64 */
			outros?: number;
			energia?: number;
			encargos?: number;
			tributos?: number;
			transmissao?: number;
			distribuicao?: number;
		};
		DadosDTO: {
			fatura?: API["schemas"]["FaturaDTO"];
			outros?: API["schemas"]["OutrosDTO"];
			/** Format: int64 */
			fatura_id?: number;
			data_insercao?: string;
			distribuidora?: string;
			fatura_origem?: string;
			modelo_fatura?: string;
			distribuidora_cnpj?: string;
			unidade_consumidora?: API["schemas"]["UnidadeconsumidoraDTO"];
		};
		DemandascontratadaDTO: {
			posto?: string;
			/** Format: int64 */
			valor?: number;
		};
		DevolucaoGeracaoDTO: {
			saldos_geracao?: API["schemas"]["SaldoGeracaoDTO"][];
			cod_unidade_geradora?: string;
		};
		DicDTO: {
			/** Format: int64 */
			meta_anual?: number;
			/** Format: int64 */
			meta_mensal?: number;
			/** Format: int64 */
			apurado_mensal?: number;
			/** Format: int64 */
			meta_trimestral?: number;
		};
		DicriDTO: {
			/** Format: int64 */
			meta_mensal?: number;
		};
		DmicDTO: {
			/** Format: int64 */
			meta_mensal?: number;
			/** Format: int64 */
			apurado_mensal?: number;
		};
		EusdDTO: Record<string, never>;
		FaturaDTO: {
			leitura?: API["schemas"]["LeituraDTO"];
			produtos?: API["schemas"]["ProdutoDTO"][];
			tributos?: API["schemas"]["TributoDTO"][];
			composicao?: API["schemas"]["ComposicaoDTO"];
			indicadores?: API["schemas"]["IndicadoresDTO"];
			total_pagar?: number;
			data_emissao?: string;
			total_fatura?: number;
			mes_referencia?: string;
			data_vencimento?: string;
			data_apresentacao?: string;
			devolucao_geracao?: API["schemas"]["DevolucaoGeracaoDTO"];
			demandas_contratadas?: API["schemas"]["DemandascontratadaDTO"][];
			historico_faturamento?: API["schemas"]["HistoricoFaturamentoDTO"][];
		};
		FicDTO: {
			/** Format: int64 */
			meta_anual?: number;
			/** Format: int64 */
			meta_mensal?: number;
			/** Format: int64 */
			apurado_mensal?: number;
			/** Format: int64 */
			meta_trimestral?: number;
		};
		HistoricoFaturamentoDTO: {
			data?: string;
			/** Format: int64 */
			periodo_dias?: number;
			/** Format: int64 */
			energia_ativa?: number;
		};
		IndicadoresDTO: {
			dic?: API["schemas"]["DicDTO"];
			fic?: API["schemas"]["FicDTO"];
			dmic?: API["schemas"]["DmicDTO"];
			eusd?: API["schemas"]["EusdDTO"];
			dicri?: API["schemas"]["DicriDTO"];
			conjunto?: string;
		};
		LeituraDTO: {
			medidores?: API["schemas"]["MedidoresDTO"][];
			data_atual?: string;
			/** Format: int64 */
			periodo_dias?: number;
			data_anterior?: string;
			data_proxima?: string;
		};
		LeiturasDTO: {
			posto?: string;
			valor_atual?: number;
			valor_leitura?: number;
			valor_anterior?: number;
			ativa_ou_reativa?: string;
			consumo_ou_geracao?: string;
			energia_ou_demanda?: string;
			/** Format: int64 */
			fator_multiplicador?: number;
		};
		MedidoresDTO: {
			leituras?: API["schemas"]["LeiturasDTO"][];
			numero_medidor?: string;
			/** Format: int64 */
			taxa_perda_transformacao?: number;
		};
		OutrosDTO: {
			fisco?: string;
			nota_fiscal?: string;
			codigo_barras?: string;
			classe_consumo?: string;
			numero_cliente?: string;
			roteiro_leitura?: string;
			debito_automatico?: boolean;
		};
		ProdutoDTO: {
			tributos?: API["schemas"]["TributoDTO"][];
			descricao?: string;
			quantidade?: number;
			valor_total?: number;
			valor_sem_impostos?: number;
			tarifa_com_impostos?: number;
			tarifa_sem_impostos?: number;
			descricoes_originais?: string[];
		};
		SaldoGeracaoDTO: {
			posto?: string;
			valor?: number;
			saldo_recebido?: number;
		};
		TributoDTO: {
			nome?: string;
			taxa?: number;
			valor?: number;
			base_calculo?: number;
		};
		UnidadeconsumidoraDTO: {
			nome?: string;
			cpf_cnpj?: string;
			endereco?: string;
			instalacao?: string;
			tipo_ligacao?: string;
			limite_tensao?: string;
			tipo_contrato?: string;
			tensao_nominal?: string;
			categoria_tensao?: string;
			inscricao_estadual?: string;
		};
		AuthResetPasswordRequest: {
			token: string;
			novaSenha: string;
		};
		LoginRequest: {
			email?: string;
			senha?: string;
		};
		LoginResponse: {
			accessToken?: string;
			/** Format: int64 */
			expiresIn?: number;
		};
		AuthForgotPasswordRequest: {
			email: string;
			urlResetPassword?: string;
		};
		Pageable: {
			/** Format: int32 */
			page?: number;
			/** Format: int32 */
			size?: number;
			sort?: string[];
		};
		EstatisticaGeracaoResponse: {
			potencia?: number;
			mediaGeracao?: number;
			geracaoTotal?: number;
			alocacaoAtual?: number;
			creditoAcumulado?: number;
		};
		EstatisticaFaturaResponse: {
			consumoUltimoMes?: number;
			consumoMedio?: number;
			consumoTotal?: number;
			creditosAcumulados?: number;
			saldoFaltante?: number;
		};
		DocumentoFileResponse: {
			/** Format: int64 */
			id?: number;
			nome?: string;
			descricao?: string;
			tamanho?: number;
			tipo?: string;
			url?: string;
			/** Format: date-time */
			dataHora?: string;
			/** @enum {string} */
			host?: "VPS_LOCAL";
			base64?: string;
		};
		DashboardTitulosUsinaConsumidorResponse: {
			nomeUsina?: string;
			ucUsina?: string;
			nomeConsumidor?: string;
			ucConsumidor?: string;
			/** Format: date */
			mesReferencia?: string;
			/** Format: date */
			dataVencimento?: string;
			valorTotal?: number;
			status?: string;
		};
		DashboardResumoGeralResponse: {
			totalEnergiaGerada?: number;
			totalEnergiaDistribuida?: number;
			saldoAcumulado?: number;
			usinasAtivas?: number;
			consumidoresAtivos?: number;
		};
		DashboardEnergiaGeradaConsumidaResponse: {
			mesReferencia?: string;
			energiaGerada?: number;
			energiaConsumida?: number;
		};
		BooleanResponse: {
			mensage?: string;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
