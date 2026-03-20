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
import { Input } from "@/components/ui/input";
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
import { consumerStatuses } from "@/lib/models/consumer";
import type { Distribuitors } from "@/lib/models/distribuidora";
import {
	clearConsumersFilters,
	setConsumersFilters,
} from "@/lib/redux/features/consumers/slice";
import { z } from "@/lib/zod-translation";
import { DistribuidorSelect } from "../../_components/distribuidora-select";

const filtersSchema = z.object({
	uc: z.string().optional().nullable(),
	distribuidora: z
		.object({
			id: z.number().optional(),
			nome: z.string().optional(),
		})
		.optional()
		.nullable(),
	status: z.string().optional().nullable(),
});

const defaultValues = {
	uc: null,
	distribuidora: null,
	status: null,
};

type ConsumersFiltersForm = z.infer<typeof filtersSchema>;

export const ConsumersFiltersSheet: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const form = useForm<ConsumersFiltersForm>({
		resolver: zodResolver(filtersSchema),
		defaultValues,
	});

	const handleSubmit = async (data: ConsumersFiltersForm) => {
		// clone to avoid pass object reference to global state
		dispatch(
			setConsumersFilters(
				cloneDeep({
					...data,
					idDistribuidora: data?.distribuidora?.id,
				}),
			),
		);
		setOpen(false);
	};

	const handleClearFilters = () => {
		form.reset(defaultValues);
		dispatch(clearConsumersFilters());
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			// clear filters on unmount
			form.reset(defaultValues);
			dispatch(clearConsumersFilters());
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
								name="uc"
								render={({ field }) => (
									<FormItem>
										<FormLabel>UC</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="UC"
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="distribuidora"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Distribuidora</FormLabel>
										<FormControl>
											<DistribuidorSelect
												onValueChange={field.onChange}
												value={field.value as Distribuitors}
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
											defaultValue={field.value ?? ""}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione o status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(consumerStatuses).map(
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
