import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { type FC, type ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fetchGeracao } from "@/app/(core)/perfil/usina/geracao/_services/fetch";
import { fetchPrevisao } from "@/app/(core)/usinas/[usinaId]/previsao/_services/fetch";
import { RoundPercentage } from "@/components/round-percentage";
import type { AlocacaoItem } from "@/lib/models/alocacao";
import type { Usina } from "@/lib/models/usina";
import type { ZodAlocacaoFormData } from "./zod-schemas";

type CardsFormattedData = {
	geracaoPrevista?: number;
	geracaoTotal?: number;
	alocacaoTotal?: number;
	saldoAcumulado?: number;
};

export const InfoCards = () => {
	const form = useFormContext<ZodAlocacaoFormData>();
	const usina = form.watch("usina") as Usina | null;
	const alocacaoItens = form.watch("itens") as AlocacaoItem[] | null;

	const alocacaoTotal = alocacaoItens?.reduce((acc, item) => {
		return acc + (item?.quota ?? 0);
	}, 0);

	const { data, refetch } = useQuery({
		queryKey: ["usina", usina?.id],
		queryFn: async () => {
			try {
				if (!usina?.id) return null;
				const previsaoCurrentMonth = await fetchPrevisao({
					idUsina: usina?.id?.toString(),
					mesReferencia: format(new Date().setDate(1), "yyyy-MM-dd"),
				});
				const geracaoCurrentMonth = await fetchGeracao({
					idUsina: usina?.id?.toString(),
					mesReferencia: format(new Date().setDate(1), "yyyy-MM-dd"),
				});

				const formattedData: CardsFormattedData = {
					geracaoPrevista: previsaoCurrentMonth[0]?.geracaoPrevista,
					geracaoTotal: geracaoCurrentMonth[0]?.valorGeracaoInformado,
					saldoAcumulado: usina?.saldoAcumulado,
				};
				return formattedData;
			} catch (e) {
				console.error("[InfoCards] Error fetching usina data:", e);
				return null;
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [usina?.id]);

	const AlocacaoTotalBody = () =>
		alocacaoTotal ? (
			<div className="flex gap-1 items-center">
				<RoundPercentage percentage={alocacaoTotal} />
				{Intl.NumberFormat("pt-BR", {
					style: "percent",
					maximumFractionDigits: 2,
				}).format(alocacaoTotal / 100)}
			</div>
		) : (
			"-"
		);

	return (
		<div className="flex gap-1 items-center">
			<Card
				title="Previsão geração"
				body={data?.geracaoPrevista ? `${data?.geracaoPrevista} kWh` : "-"}
			/>
			<Card
				title="Geração total"
				body={data?.geracaoTotal ? `${data?.geracaoTotal} kWh` : "-"}
			/>
			<Card
				title="Saldo acumulado"
				body={usina?.saldoAcumulado ? `${usina?.saldoAcumulado} kWh` : "-"}
			/>
			<Card title="Alocação total" body={<AlocacaoTotalBody />} />
		</div>
	);
};

interface CardProps {
	title: string;
	body: ReactNode;
}

const Card: FC<CardProps> = ({ title, body }) => {
	return (
		<div className="flex flex-col p-3 w-full rounded-md bg-muted gap-1">
			<span className="text-xs leading-4 text-muted-foreground">{title}</span>
			{typeof body === "string" ? (
				<span className="text-sm leading-6 text-foreground">{body}</span>
			) : (
				body
			)}
		</div>
	);
};
