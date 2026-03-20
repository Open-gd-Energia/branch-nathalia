"sue client";
import { zodResolver } from "@hookform/resolvers/zod";
import cloneDeep from "lodash.clonedeep";
import { Save } from "lucide-react";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { alocacaoStatusOptions } from "@/lib/models/alocacao";
import type { Consumer } from "@/lib/models/consumer";
import type { Usina } from "@/lib/models/usina";
import {
	type AlocacaoItemFilters,
	clearAlocacaoItemFilters,
	setAlocacaoItemFilters,
} from "@/lib/redux/features/alocacao/slice";
import { z } from "@/lib/zod-translation";
import { ConsumidorSelect } from "../../_components/consumidor-select";
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

	status: z.string().optional().nullable(),
});

const defaultValues = {
	usina: null,
	consumidor: null,
	status: null,
};

type AlocacaoFiltersForm = z.infer<typeof filtersSchema>;

export interface AlocacaoFiltersSheetProps extends PropsWithChildren {
	hideUsina?: boolean;
	hideConsumidor?: boolean;
}

export const AlocacaoFiltersSheet: FC<AlocacaoFiltersSheetProps> = ({
	children,
	hideUsina = false,
	hideConsumidor = false,
}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const form = useForm<AlocacaoFiltersForm>({
		resolver: zodResolver(filtersSchema),
		defaultValues,
	});

	const handleSubmit = async (data: AlocacaoFiltersForm) => {
		const transformedData: AlocacaoItemFilters = {
			idUsina: data?.usina?.id,
			idConsumidor: data?.consumidor?.id,
			status: data?.status,
		};
		// clone to avoid pass object reference to global state
		dispatch(setAlocacaoItemFilters(cloneDeep(transformedData)));
		setOpen(false);
	};

	const handleClearFilters = () => {
		form.reset();
		dispatch(clearAlocacaoItemFilters());
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			// clear filters on unmount
			form.reset();
			dispatch(clearAlocacaoItemFilters());
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
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value ?? ""}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(alocacaoStatusOptions).map(
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

							{!hideUsina && (
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
							)}

							{!hideConsumidor && (
								<FormField
									control={form.control}
									name="consumidor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Consumidor</FormLabel>
											<FormControl>
												<ConsumidorSelect
													onValueChange={field.onChange}
													value={field.value as Consumer}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
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
								<Save /> Aplicar
							</Button>
						</footer>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};
