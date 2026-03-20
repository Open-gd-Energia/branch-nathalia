"use client";

import { format } from "date-fns";
import { useEffect } from "react";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";
import { useMediaQuery } from "react-responsive";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { representanteRelations } from "@/lib/models/contact";
import {
	type Usina,
	usinaClassificacaoOptions,
	usinaStatusesOptions,
	usinaTensaoConexaoOptions,
	usinaTipoConexaoOptions,
} from "@/lib/models/usina";
import { toggleCoreLayoutSidebar } from "@/lib/redux/features/globals/slice";

export const UsinaSidebar = ({ usina }: { usina: Usina }) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.globals.coreLayoutSidebarOpen);
	const isMobile = useMediaQuery({ maxWidth: 920 });

	useEffect(() => {
		dispatch(toggleCoreLayoutSidebar(!isMobile));
	}, [isMobile]);

	return (
		<Sidebar
			collapsed={!isMobile && !open}
			toggled={isMobile && open}
			width="256px"
			collapsedWidth="0"
			customBreakPoint="920px"
			onBackdropClick={() => dispatch(toggleCoreLayoutSidebar())}
			rootStyles={{
				[`.${sidebarClasses.container}`]: {
					backgroundColor: "background",
					borderLeft: "1px solid #e0e0e0",
				},
			}}
		>
			<InfoAccordion value="informacoes-basicas">
				<InfoAccordionTrigger>Informações básicas</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Nome da usina</InfoRowLabel>
						<InfoRowValue>{usina?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Unidade consumidora</InfoRowLabel>
						<InfoRowValue>{usina?.uc}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Classificação</InfoRowLabel>
						<InfoRowValue>
							{
								usinaClassificacaoOptions[
									usina?.classificacao as keyof typeof usinaClassificacaoOptions
								]
							}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Status</InfoRowLabel>
						<InfoRowValue>
							{usina?.status ? usinaStatusesOptions[usina.status] : null}
						</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="representantes">
				<InfoAccordionTrigger>Representantes</InfoAccordionTrigger>
				<InfoAccordionContent>
					{usina?.representantes?.length === 0 && (
						<InfoRow>
							<InfoRowLabel>Nenhum representante encontrado</InfoRowLabel>
						</InfoRow>
					)}
					{usina?.representantes?.map((representante) => (
						<InfoRow key={representante?.representante?.id}>
							<InfoRowLabel>
								{representanteRelations[
									representante?.relacao as keyof typeof representanteRelations
								] ?? ""}
							</InfoRowLabel>
							<InfoRowValue>
								{representante?.representante?.pessoaFisica?.nome ||
									representante?.representante?.pessoaJuridica?.razaoSocial}
							</InfoRowValue>
						</InfoRow>
					))}
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="localizacao">
				<InfoAccordionTrigger>Localização</InfoAccordionTrigger>
				<InfoAccordionContent>
					{usina?.endereco?.latitude ? (
						<>
							<InfoRow>
								<InfoRowLabel>Latitude</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.latitude}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Longitude</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.longitude}</InfoRowValue>
							</InfoRow>
						</>
					) : (
						<>
							<InfoRow>
								<InfoRowLabel>CEP</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.cep}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Rua</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.endereco}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Número</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.numero}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Bairro</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.bairro}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Complemento</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.complemento}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Cidade</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.cidade?.nome}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Estado</InfoRowLabel>
								<InfoRowValue>{usina?.endereco?.cidade?.uf}</InfoRowValue>
							</InfoRow>
						</>
					)}
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="infos-tecnicas">
				<InfoAccordionTrigger>Informações técnicas</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Classificação</InfoRowLabel>
						<InfoRowValue>
							{" "}
							{
								usinaClassificacaoOptions[
									usina?.classificacao as keyof typeof usinaClassificacaoOptions
								]
							}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Conexão</InfoRowLabel>
						<InfoRowValue>
							{usina?.tipoConexao &&
								usinaTipoConexaoOptions[
									usina?.tipoConexao as keyof typeof usinaTipoConexaoOptions
								]}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Tensão</InfoRowLabel>
						<InfoRowValue>
							{usinaTensaoConexaoOptions[
								usina?.tensaoConexao as keyof typeof usinaTensaoConexaoOptions
							] ?? ""}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Demanda ponta</InfoRowLabel>
						<InfoRowValue>{usina?.demandaPonta}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Demanda nominal</InfoRowLabel>
						<InfoRowValue>{usina?.demandaFPonta}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Potência nominal</InfoRowLabel>
						<InfoRowValue>{usina?.potenciaNominal}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Potência de pico</InfoRowLabel>
						<InfoRowValue>{usina?.pontenciaPico}</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="infos-faturamento">
				<InfoAccordionTrigger>Informações de faturamento</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Regra tarifária</InfoRowLabel>
						<InfoRowValue>{usina?.regraTarifaria?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Tipo de faturamento</InfoRowLabel>
						<InfoRowValue>{usina?.faturamentoTipo?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Valor pago por kW</InfoRowLabel>
						<InfoRowValue>
							{usina?.valorKwh?.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="infos-distribuidora">
				<InfoAccordionTrigger>
					Informações da distribuidora
				</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Distribuidora</InfoRowLabel>
						<InfoRowValue>{usina?.distribuidora?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Login</InfoRowLabel>
						<InfoRowValue>{usina?.loginDistribuidora}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Senha</InfoRowLabel>
						<InfoRowValue>{usina?.senhaDistribuidora}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Titular</InfoRowLabel>
						<InfoRowValue>
							{usina?.representanteTitular?.pessoaFisica?.nome ||
								usina?.representanteTitular?.pessoaJuridica?.razaoSocial}
						</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="datas">
				<InfoAccordionTrigger>Datas</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Primeira injeção</InfoRowLabel>
						<InfoRowValue>
							{usina?.dataPrimeiraInjecao &&
								format(usina?.dataPrimeiraInjecao, "dd/MM/yyyy")}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Troca de titularidade</InfoRowLabel>
						<InfoRowValue>
							{usina?.dataTrocaTitularidade &&
								format(usina?.dataTrocaTitularidade, "dd/MM/yyyy")}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Primeiro cadastro</InfoRowLabel>
						<InfoRowValue>
							{usina?.dataPrimeiroCadastro &&
								format(usina?.dataPrimeiroCadastro, "dd/MM/yyyy")}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Previsão de leitura</InfoRowLabel>
						<InfoRowValue>
							{usina?.dataPrevistaLeitura &&
								format(usina?.dataPrevistaLeitura, "dd/MM/yyyy")}
						</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
		</Sidebar>
	);
};

const InfoAccordion = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: string;
}) => {
	return (
		<Accordion className="px-4 border-b w-full" type="single" collapsible>
			<AccordionItem value={value}>{children}</AccordionItem>
		</Accordion>
	);
};

const InfoAccordionTrigger = ({ children }: { children: React.ReactNode }) => {
	return (
		<AccordionTrigger className="text-xs leading-4 text-muted-foreground">
			{children}
		</AccordionTrigger>
	);
};

const InfoAccordionContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<AccordionContent className="flex flex-col gap-1 text-sm leading-4 text-muted-foreground">
			{children}
		</AccordionContent>
	);
};

const InfoRow = ({ children }: { children: React.ReactNode }) => {
	return <div className="grid grid-cols-2 items-center gap-2">{children}</div>;
};

const InfoRowLabel = ({ children }: { children: React.ReactNode }) => {
	return (
		<span className="text-xs leading-4 text-muted-foreground line-clamp-1">
			{children}
		</span>
	);
};

const InfoRowValue = ({ children }: { children: React.ReactNode }) => {
	return (
		<span className="text-[13px] leading-6 text-foreground font-medium block truncate line-clamp-1">
			{children}
		</span>
	);
};
