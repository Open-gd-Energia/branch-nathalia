"sue client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import cloneDeep from "lodash.clonedeep";
import { ListFilter, Save } from "lucide-react";
import { usePathname } from "next/navigation";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ConsumidorSelect as GlobalConsumerSelect } from "@/app/(core)/_components/consumidor-select";
import { MonthPicker } from "@/components/month-picker";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cobrancaStatuses } from "@/lib/models/cobranca";
import type { Consumer } from "@/lib/models/consumer";
import type { Usina } from "@/lib/models/usina";
import {
	type CobrancasFilters,
	clearCobrancaPagarFilters,
	setCobrancaPagarFilters,
} from "@/lib/redux/features/cobrancas/slice";
import { areFiltersEmpty } from "@/lib/utils";
import { z } from "@/lib/zod-translation";
import { UsinaSelect } from "../../_components/usina-select";

const filtersSchema = z.object({
	usina: z
		.object({
			id: z.coerce.number().optional().nullable(),
			nome: z.string().optional().nullable(),
		})
		.optional()
		.nullable(),
	consumidor: z
		.object({
			id: z.coerce.number().optional().nullable(),
			nome: z.string().optional().nullable(),
		})
		.optional()
		.nullable(),
	mesReferencia: z.date().optional().nullable(),
	status: z.string().optional().nullable(),
});

export type CobrancaFiltersForm = z.infer<typeof filtersSchema>;

export const CobrancaFiltersSheet: FC<PropsWithChildren> = ({ children }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const isCobrancaReceber = pathname.includes("receber");
	const isCobrancaScreen = pathname.includes("cobrancas");

	const defaultValues = {
		usina: null,
		consumidor: null,
		mesReferencia: null,
		status: null,
	};

	const form = useForm<CobrancaFiltersForm>({
		resolver: zodResolver(filtersSchema),
		defaultValues,
	});

	const handleSubmit = async (data: CobrancaFiltersForm) => {
		const transformedData: CobrancasFilters = {
			idUsina: data?.usina?.id,
			idConsumidor: data?.consumidor?.id,
			referenciaInicial: data?.mesReferencia
				? format(data?.mesReferencia, "yyyy-MM-dd")
				: undefined,
			referenciaFinal: data?.mesReferencia
				? format(data?.mesReferencia, "yyyy-MM-dd")
				: undefined,
			status: data?.status,
		};
		// clone to avoid pass object reference to global state
		dispatch(setCobrancaPagarFilters(cloneDeep(transformedData)));
		setOpen(false);
	};

	const handleClearFilters = () => {
		form.reset(defaultValues);
		dispatch(clearCobrancaPagarFilters());
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			// clear filters on unmount
			form.reset(defaultValues);
			dispatch(clearCobrancaPagarFilters());
		};
	}, []);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="gap-0">
				<SheetHeader>
					<SheetTitle>Filtros </SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="w-full h-full overflow-hidden grid grid-rows-[1fr_auto]"
					>
						<div className="flex flex-col gap-4 px-4">
							{isCobrancaScreen &&
								(isCobrancaReceber ? (
									<FormField
										control={form.control}
										name="consumidor"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Consumidor</FormLabel>
												<FormControl>
													<GlobalConsumerSelect
														value={field.value as Consumer}
														onValueChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								) : (
									<FormField
										control={form.control}
										name="usina"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Usina</FormLabel>
												<FormControl>
													<UsinaSelect
														onValueChange={field.onChange}
														value={field.value as Usina}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}

							<FormField
								control={form.control}
								name="mesReferencia"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Mês de referência</FormLabel>
										<FormControl>
											<MonthPicker
												fromYear={new Date().getFullYear() - 20}
												toYear={new Date().getFullYear() + 10}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione o status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(cobrancaStatuses).map(
													([value, label]) => (
														<SelectItem key={value} value={value}>
															{label.replace("_", " ")}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<footer className="flex py-2.5 px-4 justify-between border-t">
							<Button
								type="button"
								size="sm"
								variant="outline"
								onClick={handleClearFilters}
							>
								Limpar Filtros
							</Button>
							<Button type="submit" size="sm">
								<Save /> Salvar
							</Button>
						</footer>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export const FiltersButton = () => {
	const filters = useAppSelector((state) => state.cobrancas.filters);

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<CobrancaFiltersSheet>
			<div className="relative">
				<Button variant="outline" size="sm">
					<ListFilter /> Filtros
				</Button>
				{!isFiltersEmpty && (
					<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
				)}
			</div>
		</CobrancaFiltersSheet>
	);
};
