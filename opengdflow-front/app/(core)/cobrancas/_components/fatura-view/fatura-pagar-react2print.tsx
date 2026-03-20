import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { type FC, forwardRef, type PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Endereco } from "@/lib/models/address";
import type { Cobranca } from "@/lib/models/cobranca";
import { usinaClassificacaoOptions } from "@/lib/models/usina";
import {
	formatEndereco,
	localeCurrencyFormat,
	localeNumberFormat,
} from "@/lib/utils";
import { fetchParametros } from "../../_services/fetch-parametros";

export interface InvoicePrintLayoutProps extends Cobranca {}

type TableRowT = {
	descricao: string;
	quantidade?: number;
	tarifaAplicada?: number;
	valorTotal?: number;
};

export const FaturaPagarPrintLayout = forwardRef<
	HTMLDivElement,
	InvoicePrintLayoutProps
>((cobranca, ref) => {
	const getDescontos = () => {
		return cobranca?.itens
			?.filter((item) => item?.tipo === "DESCONTO")
			?.reduce((acc, item) => acc + (Number(item?.valor) ?? 0), 0);
	};

	const { data: cooperativaData } = useQuery({
		queryKey: ["parametros", "involt"],
		queryFn: async () => {
			const cooperativaNomeTitulo = await fetchParametros(
				"cooperativaNomeTitulo",
			);
			const cooperativaEnderecoTitulo = await fetchParametros(
				"cooperativaEnderecoTitulo",
			);
			const cooperativaCNPJTitulo = await fetchParametros(
				"cooperativaCNPJTitulo",
			);

			return {
				cooperativaNomeTitulo: cooperativaNomeTitulo?.valor ?? "",
				cooperativaEnderecoTitulo: cooperativaEnderecoTitulo?.valor ?? "",
				cooperativaCNPJTitulo: cooperativaCNPJTitulo?.valor ?? "",
			};
		},
	});

	const getAcrescimos = () => {
		return cobranca?.itens
			?.filter((item) => item?.tipo === "ACRESCIMO")
			?.reduce((acc, item) => acc + (Number(item?.valor) ?? 0), 0);
	};

	const tableRows: TableRowT[] = [
		{
			descricao: "Energia injetada",
			quantidade: cobranca?.energiaInjetada,
		},
		{
			descricao: "Consumo local da usina",
			quantidade: cobranca?.consumoLocal,
			tarifaAplicada: cobranca?.tarifaConsumoLocal,
			valorTotal:
				(cobranca?.consumoLocal ?? 0) * (cobranca?.tarifaConsumoLocal ?? 0),
		},
		{
			descricao: "Energia compensada",
			quantidade: cobranca?.energiaCompensada,
			tarifaAplicada: cobranca?.tarifaEnergiaCompensada,
			valorTotal:
				(cobranca?.energiaCompensada ?? 0) *
				(cobranca?.tarifaEnergiaCompensada ?? 0),
		},
		{
			descricao: "Energia/créditos distribuídos",
			quantidade: cobranca?.energiaDistribuida,
			tarifaAplicada: cobranca?.tarifaEnergiaDistribuida,
			valorTotal:
				(cobranca?.energiaDistribuida ?? 0) *
				(cobranca?.tarifaEnergiaDistribuida ?? 0),
		},
		{
			descricao: "Descontos (-)",
			valorTotal: getDescontos(),
		},
		{
			descricao: "Acréscimos (+)",
			valorTotal: getAcrescimos(),
		},
	];

	return (
		<div ref={ref} className="flex-1 space-y-12 py-12 px-20 print-container">
			<header className="flex gap-2 justify-between flex-nowrap break-inside-avoid">
				<div>
					<img
						className="mb-4"
						src="/green-logo.svg"
						alt="Logo"
						width={204}
						height={47}
					/>

					<p className="text-muted-foreground font-semibold">
						{cooperativaData?.cooperativaNomeTitulo}
					</p>
					<p className="text-muted-foreground">
						{cooperativaData?.cooperativaEnderecoTitulo}
					</p>
					<p className="text-muted-foreground">
						{cooperativaData?.cooperativaCNPJTitulo}
					</p>
				</div>
				<div className="text-right">
					<h2 className="text-gray-900 font-semibold text-4xl leading-10">
						Ordem de Pagamento
					</h2>
					<p className="text-gray-600 text-xl font-medium mb-8">
						#{cobranca?.identificador}
					</p>
					<p className="text-muted-foreground font-semibold text-sm">
						Data de emissão
					</p>
					<p className="text-muted-foreground font-semibold text-sm">
						{cobranca?.dataEmissao
							? format(cobranca?.dataEmissao, "dd/MM/yyyy")
							: "-"}
					</p>
				</div>
			</header>

			<section className="grid grid-cols-3 grid-rows-2 gap-2  break-inside-avoid">
				<div className="bg-muted rounded-lg p-4 row-span-2 col-span-2">
					<p className="text-sm font-semibold text-muted-foreground mb-2">
						Contratante
					</p>
					<p className="text-foreground font-semibold">
						{cobranca?.usina?.nome}
					</p>
					<p className="text-foreground whitespace-pre-line">
						{formatEndereco(cobranca?.usina?.endereco as unknown as Endereco)}
					</p>

					<p className="text-sm font-semibold text-muted-foreground mb-2">
						{usinaClassificacaoOptions[
							cobranca?.usina
								?.classificacao as keyof typeof usinaClassificacaoOptions
						] ?? cobranca?.usina?.classificacao}
					</p>
					<p className="text-sm font-semibold text-muted-foreground">
						{cobranca?.usina?.uc}
					</p>
				</div>
				<div className="bg-muted rounded-lg p-4 text-right">
					<p className="text-muted-foreground font-semibold text-sm mb-2">
						Mês de referência
					</p>
					<p className="text-foreground font-medium text-2xl">
						{cobranca?.mesReferencia
							? format(new Date(cobranca?.mesReferencia), "MMM/yyyy", {
									locale: ptBR,
								}).toUpperCase()
							: ""}
					</p>
				</div>
				<div className="bg-muted rounded-lg p-4 text-right">
					<p className="text-muted-foreground font-semibold text-sm mb-2">
						Vencimento
					</p>
					<p className="text-foreground font-medium text-2xl">
						{cobranca?.dataVencimento
							? format(new Date(cobranca?.dataVencimento), "dd/MM/yyyy")
							: ""}
					</p>
				</div>
			</section>

			<section className="flex gap-2">
				<ResumeBoard>
					<p className="text-muted-foreground font-semibold text-sm mb-2">
						Créditos Distribuídos
					</p>
					<span className="text-foreground font-medium text-2xl">
						{localeNumberFormat(cobranca?.energiaDistribuida)} kWh
					</span>
				</ResumeBoard>
				<ResumeBoard>
					<p className="text-muted-foreground font-semibold text-sm mb-2">
						Valor total a pagar
					</p>
					<span className="text-foreground font-medium text-2xl">
						{localeCurrencyFormat(cobranca?.valorTotal)}
					</span>
				</ResumeBoard>
			</section>

			<section className="">
				<Table wrapperClassName="border rounded-lg">
					<TableHeader>
						<TableRow>
							<TableHead>Descrição</TableHead>
							<TableHead>Qntd (kWh)</TableHead>
							<TableHead>Tarifa Aplicada (R$)</TableHead>
							<TableHead className="text-right">Valor Total (R$)</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableRows.map((row, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium text-sm leading-5 text-foreground">
									{row.descricao}
								</TableCell>
								<TableCell className="text-sm leading-5 text-muted-foreground">
									{row.quantidade !== undefined ? row.quantidade : "-"}
								</TableCell>
								<TableCell className="text-sm leading-5 text-muted-foreground">
									{row.tarifaAplicada !== undefined ? row.tarifaAplicada : "-"}
								</TableCell>
								<TableCell className="text-right text-sm leading-5 text-muted-foreground">
									{row.valorTotal !== undefined
										? localeCurrencyFormat(row.valorTotal)
										: "-"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>

			<Separator />

			<section className="flex flex-col gap-4 break-inside-avoid">
				<h3 className="font-semibold text-xl leading-8 text-foreground">
					Resumo do pagamento
				</h3>
				<div className="flex gap-2">
					<ResumeBoard>
						<p className="text-muted-foreground font-semibold text-sm mb-2">
							Vencimento
						</p>
						<span className="text-foreground font-medium text-2xl">
							{cobranca?.dataVencimento
								? format(new Date(cobranca?.dataVencimento), "dd/MM/yyyy", {
										locale: ptBR,
									})
								: ""}
						</span>
					</ResumeBoard>
					<ResumeBoard>
						<p className="text-muted-foreground font-semibold text-sm mb-2">
							Valor total a pagar
						</p>
						<span className="text-foreground font-medium text-2xl">
							{localeCurrencyFormat(cobranca?.valorTotal)}
						</span>
					</ResumeBoard>
				</div>
			</section>
		</div>
	);
});

const ResumeBoard: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="break-inside-avoid flex flex-col border w-full items-center justify-center flex-wrap bg-background rounded-lg h-[120px]">
			{children}
		</div>
	);
};
