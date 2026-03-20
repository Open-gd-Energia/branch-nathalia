"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	type Consumer,
	consumerStatuses,
	consumerTypes,
} from "@/lib/models/consumer";
import {
	setConsumerData,
	toggleOpenConsumerSheet,
} from "@/lib/redux/features/consumers/slice";
import { cn } from "@/lib/utils";
import {
	ListTable,
	type TableColumns,
} from "../../_components/list-screen/table";
import { deleteConsumer } from "../_services/delete";
import { fetchConsumers } from "../_services/fetch";
import { fetchConsumerById } from "../_services/fetch-by-id";

const statusesColors = {
	ATIVO: "bg-green-600 text-white",
	INATIVO: "bg-red-600 text-white",
};

const tableColumns = [
	{
		key: "nome",
		label: "Nome do consumidor",
		cellProps: { className: "max-w-[190px]" },
	},
	{
		key: "uc",
		label: "UC",
	},
	{
		key: "dataAssinaturaContrato",
		label: "Data de assinatura do contrato",
		cellProps: { className: "max-w-[120px]" },
		render: (row) =>
			row.dataAssinaturaContrato
				? format(parseISO(row.dataAssinaturaContrato), "dd/MM/yyyy")
				: null,
	},
	{
		key: "tipo",
		label: "Tipo de consumidor",
		render: (row) => {
			const type = Object.entries(consumerTypes).find(
				([value, _]) => value === row.tipo,
			);
			return type ? <Badge>{type?.[1]}</Badge> : null;
		},
	},
	{
		key: "status",
		label: "Status",
		render: (row) => {
			const status = Object.entries(consumerStatuses).find(
				([value, _]) => value === row.status,
			);
			const color = statusesColors[status?.[0] as keyof typeof statusesColors];
			return status ? <Badge className={cn(color)}>{status?.[1]}</Badge> : null;
		},
	},
] as TableColumns<Consumer>[];

export interface ConsumersListProps {
	data: Consumer[];
}

export const ConsumersList: FC<ConsumersListProps> = ({
	data: consumersList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const formOpen = useAppSelector((state) => state.consumers.sheet.open);
	const filters = useAppSelector((state) => state.consumers.filters);
	const { data, refetch } = useQuery({
		queryKey: ["consumers-list", filters],
		queryFn: async () =>
			fetchConsumers(searchParams.get("search") ?? undefined, filters),
		initialData: consumersList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteConsumer(id),
		onSuccess: () => {
			toast.success("Usuário excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteConsumer]:", error);
			toast.error("Erro ao excluir usuário!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const consumer = await fetchConsumerById(id);
			if (!consumer) {
				toast.error("Consumidor não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setConsumerData(consumer));
			// 3. open form
			dispatch(toggleOpenConsumerSheet(true));
		} catch (error) {
			toast.error("Erro ao editar consumidor!");
			console.error("[handleOnEdit]:", error);
		}
	};

	const handleOnRowClick = async (id: string | number) => {
		router.push(`/consumidores/${id}`);
	};

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	return (
		<ListTable
			onRowClick={handleOnRowClick}
			tableColumns={tableColumns}
			rows={data}
			onDelete={(id) => mutateAsync(id)}
			onEdit={handleOnEdit}
		/>
	);
};
