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
import {
	type ConsumerClassificationType,
	consumerClassifications,
} from "@/lib/models/consumer";
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

export const FaturaReceberPrintLayout = forwardRef<
	HTMLDivElement,
	InvoicePrintLayoutProps
>((cobranca, ref) => {
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

	const { data: multas } = useQuery({
		queryKey: ["parametros", "multa"],
		queryFn: async () => {
			const multaTituloReceber = await fetchParametros("multaTituloReceber");
			const jurosMesTituloReceber = await fetchParametros(
				"jurosMesTituloReceber",
			);

			return {
				multaTituloReceber: Number(multaTituloReceber?.valor) ?? 0,
				jurosMesTituloReceber: Number(jurosMesTituloReceber?.valor) ?? 0,
			};
		},
	});

	const getDescontos = () => {
		return cobranca?.itens
			?.filter((item) => item?.tipo === "DESCONTO")
			?.reduce((acc, item) => acc + (Number(item?.valor) ?? 0), 0);
	};

	const tipoConexaoValores = {
		MONOFASICO: 30,
		BIFASICO: 50,
		TRIFASICO: 100,
	};

	const tableRows: TableRowT[] = [
		{
			descricao: "Consumo Total",
			quantidade: cobranca?.consumoTotal,
		},
		{
			descricao: "Consumo Compensável",
			quantidade:
				tipoConexaoValores[
					cobranca?.consumidor?.tipoConexao as keyof typeof tipoConexaoValores
				] ?? 0,
		},
		{
			descricao: "Adicional de bandeira",
			quantidade: cobranca?.adicionalBandeira,
			tarifaAplicada: cobranca?.tarifaAdicionalBandeira,
			valorTotal:
				(cobranca?.adicionalBandeira ?? 0) *
				(cobranca?.tarifaAdicionalBandeira ?? 0),
		},
		{
			descricao: "Injeção de energia",
			quantidade: cobranca?.energiaInjetada,
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
			descricao: "Descontos",
			valorTotal: getDescontos(),
		},
		{
			descricao: "Saldo Acumulado",
			valorTotal: cobranca?.saldoAcumulado,
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
						FATURA DE COBRANÇA
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
						{cobranca?.consumidor?.nome}
					</p>
					<p className="text-foreground whitespace-pre-line">
						{formatEndereco(
							cobranca?.consumidor?.endereco as unknown as Endereco,
						)}
					</p>

					<p className="text-sm font-semibold text-muted-foreground mb-2">
						{
							consumerClassifications[
								cobranca?.consumidor
									?.classificacao as ConsumerClassificationType
							]
						}
					</p>
					<p className="text-sm font-semibold text-muted-foreground mb-2">
						{cobranca?.consumidor?.uc}
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
						Energia compensada
					</p>
					<span className="text-foreground font-medium text-2xl">
						{localeNumberFormat(cobranca?.energiaCompensada)} kWh
					</span>
				</ResumeBoard>
				<ResumeBoard>
					<p className="text-muted-foreground font-semibold text-sm mb-2">
						Economia gerada
					</p>
					<div className="flex gap-1 items-center">
						<span className="text-foreground font-medium text-2xl">
							{localeCurrencyFormat(cobranca?.economiaGerada)}
						</span>
						{/* <span className="text-sm font-medium text-green-700">??%</span> */}
					</div>
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
									{row?.quantidade
										? Intl.NumberFormat("pt-BR", {
												style: "decimal",
												minimumFractionDigits: 0,
												maximumFractionDigits: 2,
											}).format(row.quantidade)
										: "-"}
								</TableCell>
								<TableCell className="text-sm leading-5 text-muted-foreground">
									{row?.tarifaAplicada
										? Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL",
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}).format(row.tarifaAplicada)
										: "-"}
								</TableCell>
								<TableCell className="text-right text-sm leading-5 text-muted-foreground">
									{row?.valorTotal
										? Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL",
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}).format(row.valorTotal)
										: "-"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>

			<section className="flex justify-between items-start gap-4">
				<span className="text-xl font-semibold leading-8 w-1/2">
					Benefícios e Economia
				</span>
				<div className="flex flex-col items-end w-1/2 gap-2">
					<div className="flex justify-between w-full items-center max-w-[416px] px-5 py-3">
						<span className="text-sm font-semibold text-muted-foreground">
							Valor sem OpenGD
						</span>
						<span className="text-xl font-medium">
							{localeCurrencyFormat(
								+(cobranca?.valorTotal || 0) + +(cobranca?.economiaGerada ?? 0),
							)}
						</span>
					</div>

					<div className="flex justify-between w-full items-center max-w-[416px] px-5 py-3">
						<span className="text-sm font-semibold text-muted-foreground">
							Valor com OpenGD
						</span>
						<span className="text-xl font-medium">
							{localeCurrencyFormat(cobranca?.valorTotal)}
						</span>
					</div>

					<div className="flex justify-between w-full items-center max-w-[416px] px-5 py-3 border rounded-lg">
						<span className="text-sm font-semibold text-muted-foreground">
							Economia gerada
						</span>
						<div className="flex gap-2 w-1/2 items-center justify-end">
							{/* <span className="font-medium text-sm text-green-700">??%</span> */}
							<span className="text-xl font-medium">
								{localeCurrencyFormat(cobranca?.economiaGerada)}
							</span>
						</div>
					</div>
				</div>
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
					<ResumeBoard>
						<p className="text-muted-foreground font-semibold text-sm mb-2">
							Após vencimento
						</p>
						<span className="text-foreground font-medium text-sm">
							{localeCurrencyFormat(multas?.multaTituloReceber)} de multa
						</span>
						<span className="text-foreground font-medium text-sm">
							{Intl.NumberFormat("pt-BR").format(
								multas?.jurosMesTituloReceber ?? 0,
							)}
							% de juros ao mês
						</span>
					</ResumeBoard>
				</div>
				<div className="flex flex-col gap-2 break-inside-avoid-page">
					<h3 className="font-semibold leading-7 text-foreground">
						Linha digitável
					</h3>
					<div className="bg-muted rounded-md h-[100px] w-full items-center justify-center flex">
						<span className="text-xs leading-5 text-muted-foreground">
							Emita a cobrança para ter acesso às informações do boleto
						</span>
					</div>
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
