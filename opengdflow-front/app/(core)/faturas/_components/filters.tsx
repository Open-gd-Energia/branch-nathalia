"sue client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import cloneDeep from "lodash.clonedeep";
import { Save } from "lucide-react";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
import { fetchUsinas } from "@/app/(core)/_services/fetch-usinas";
import { Datepicker } from "@/components/date-picker";
import { SearchSelect } from "@/components/search-select";
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
import { useAppDispatch } from "@/hooks/redux";
import type { BandeiraTarifaria } from "@/lib/models/bandeira-tarifaria";
import type { Consumer } from "@/lib/models/consumer";
import { invoiceStatusOptions } from "@/lib/models/invoices";
import type { Usina } from "@/lib/models/usina";
import {
	clearInvoicesFilters,
	type InvoicesFilters,
	setInvoicesFilters,
} from "@/lib/redux/features/invoices/slice";
import { fetchConsumers } from "../../pessoas/usuarios/_services/fetch-consumers";

yup.setLocale(ptForm);

// FIXME: Todo mundo que usa referencia final e referencia inicial definir como o último/primeiro dia do mes
interface InvoicesFiltersForm {
	bandeiraTarifaria?: Partial<Pick<BandeiraTarifaria, "id" | "nome">> | null;
	usina?: Partial<Usina> | null;
	consumidor?: Partial<Consumer> | null;
	status?: string | null;
	referenciaInicial?: Date | null;
	referenciaFinal?: Date | null;
}

const filtersSchema = yup.object().shape({
	bandeiraTarifaria: yup.object().nullable(),
	usina: yup.object().nullable(),
	consumidor: yup.object().nullable(),
	referenciaInicial: yup.date().nullable(),
	referenciaFinal: yup.date().nullable(),
	status: yup.string().nullable(),
}) as yup.ObjectSchema<InvoicesFiltersForm>;

export interface InvoicesFiltersSheetProps extends PropsWithChildren {
	hideUsina?: boolean;
	hideConsumidor?: boolean;
}
export const InvoicesFiltersSheet: FC<InvoicesFiltersSheetProps> = ({
	children,
	hideConsumidor = false,
	hideUsina = false,
}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const { data: consumersList, isLoading: loadingConsumers } = useQuery({
		queryKey: ["consumers-list"],
		queryFn: () => fetchConsumers(),
		refetchOnWindowFocus: false,
	});

	const { data: usinasList, isLoading: loadingUsinas } = useQuery({
		queryKey: ["fetch-usinas"],
		queryFn: () => fetchUsinas(undefined),
		refetchOnWindowFocus: false,
	});

	const form = useForm<InvoicesFiltersForm>({
		resolver: yupResolver(filtersSchema),
		defaultValues: {
			bandeiraTarifaria: null,
			usina: null,
			consumidor: null,
			status: null,
			referenciaInicial: null,
			referenciaFinal: null,
		},
	});

	const handleSubmit = async (data: InvoicesFiltersForm) => {
		const transformedData: InvoicesFilters = {
			...data,
			ucConsumidor: data?.consumidor?.uc,
			ucUsina: data?.usina?.uc,
			referenciaInicial: data?.referenciaInicial
				? format(data?.referenciaInicial, "yyyy-MM-dd")
				: null,
			referenciaFinal: data?.referenciaFinal
				? format(data?.referenciaFinal, "yyyy-MM-dd")
				: null,
		};
		// clone to avoid pass object reference to global state
		dispatch(setInvoicesFilters(cloneDeep(transformedData)));
		setOpen(false);
	};

	const handleClearFilters = () => {
		form.reset();
		dispatch(clearInvoicesFilters());
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			// clear filters on unmount
			form.reset();
			dispatch(clearInvoicesFilters());
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
							{!hideConsumidor && (
								<FormField
									control={form.control}
									name="consumidor"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Consumidor</FormLabel>
											<FormControl>
												<SearchSelect
													options={consumersList ?? []}
													loading={loadingConsumers}
													onValueChange={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{!hideUsina && (
								<FormField
									control={form.control}
									name="usina"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Usina</FormLabel>
											<FormControl>
												<SearchSelect
													options={usinasList ?? []}
													loading={loadingUsinas}
													onValueChange={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value?.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(invoiceStatusOptions).map(
													([value, label]) => (
														<SelectItem key={value} value={value}>
															{label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="referenciaInicial"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Data Inicial</FormLabel>
										<FormControl>
											<Datepicker
												calendarProps={{
													fromYear: new Date().getFullYear() - 50,
													toYear: new Date().getFullYear() + 10,
												}}
												placeholder="Selecione uma data"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="referenciaFinal"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Data Final</FormLabel>
										<FormControl>
											<Datepicker
												calendarProps={{
													fromYear: new Date().getFullYear() - 50,
													toYear: new Date().getFullYear() + 10,
												}}
												placeholder="Selecione uma data"
												{...field}
											/>
										</FormControl>
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
