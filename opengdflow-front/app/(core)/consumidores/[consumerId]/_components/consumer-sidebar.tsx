"use client";
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
import {
	type Consumer,
	type ConsumerClassificationType,
	consumerClassifications,
	consumerStatuses,
} from "@/lib/models/consumer";
import { representanteRelations } from "@/lib/models/contact";
import { toggleCoreLayoutSidebar } from "@/lib/redux/features/globals/slice";

export const ConsumerSidebar = ({ consumer }: { consumer: Consumer }) => {
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
						<InfoRowLabel>Nome do consumidor</InfoRowLabel>
						<InfoRowValue>{consumer?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Unidade consumidora</InfoRowLabel>
						<InfoRowValue>{consumer?.uc}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Classificação</InfoRowLabel>
						<InfoRowValue>
							{
								consumerClassifications[
									consumer?.classificacao as ConsumerClassificationType
								]
							}
						</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Status</InfoRowLabel>
						<InfoRowValue>
							{
								consumerStatuses[
									consumer?.status as keyof typeof consumerStatuses
								]
							}
						</InfoRowValue>
					</InfoRow>
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="representantes">
				<InfoAccordionTrigger>Representantes</InfoAccordionTrigger>
				<InfoAccordionContent>
					{consumer?.representantes?.length === 0 && (
						<InfoRow>
							<InfoRowLabel>Nenhum representante encontrado</InfoRowLabel>
						</InfoRow>
					)}
					{consumer?.representantes?.map((representante) => (
						<InfoRow key={representante?.representante?.id}>
							<InfoRowLabel>
								{representante?.representante?.pessoaFisica?.nome ||
									representante?.representante?.pessoaJuridica?.razaoSocial}
							</InfoRowLabel>
							<InfoRowValue>
								{representanteRelations[
									representante?.relacao as keyof typeof representanteRelations
								] || representante?.relacao}
							</InfoRowValue>
						</InfoRow>
					))}
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="localizacao">
				<InfoAccordionTrigger>Localização</InfoAccordionTrigger>
				<InfoAccordionContent>
					{consumer?.endereco?.latitude ? (
						<>
							<InfoRow>
								<InfoRowLabel>Latitude</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.latitude}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Longitude</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.longitude}</InfoRowValue>
							</InfoRow>
						</>
					) : (
						<>
							<InfoRow>
								<InfoRowLabel>CEP</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.cep}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Rua</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.endereco}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Número</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.numero}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Bairro</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.bairro}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Complemento</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.complemento}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Cidade</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.cidade?.nome}</InfoRowValue>
							</InfoRow>
							<InfoRow>
								<InfoRowLabel>Estado</InfoRowLabel>
								<InfoRowValue>{consumer?.endereco?.cidade?.uf}</InfoRowValue>
							</InfoRow>
						</>
					)}
				</InfoAccordionContent>
			</InfoAccordion>
			<InfoAccordion value="distribuidora">
				<InfoAccordionTrigger>Distribuidora</InfoAccordionTrigger>
				<InfoAccordionContent>
					<InfoRow>
						<InfoRowLabel>Distribuidora</InfoRowLabel>
						<InfoRowValue>{consumer?.distribuidora?.nome}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Login</InfoRowLabel>
						<InfoRowValue>{consumer?.loginDistribuidora}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Senha</InfoRowLabel>
						<InfoRowValue>{consumer?.senhaDistribuidora}</InfoRowValue>
					</InfoRow>
					<InfoRow>
						<InfoRowLabel>Titular</InfoRowLabel>
						<InfoRowValue>
							{consumer?.representanteTitular?.pessoaFisica?.nome ||
								consumer?.representanteTitular?.pessoaJuridica?.razaoSocial}
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
