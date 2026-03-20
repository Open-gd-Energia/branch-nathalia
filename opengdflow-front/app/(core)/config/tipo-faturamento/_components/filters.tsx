"sue client";
import { yupResolver } from "@hookform/resolvers/yup";
import cloneDeep from "lodash.clonedeep";
import { Save } from "lucide-react";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
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
import { billingTypeReferenceOptions } from "@/lib/models/billing-type";
import {
	clearBillingTypeFilters,
	setBillingTypeFilters,
} from "@/lib/redux/features/billing-type/slice";

yup.setLocale(ptForm);

const filtersSchema: yup.ObjectSchema<BillingTypeFiltersForm> = yup
	.object()
	.shape({
		referencia: yup.string(),
	});

type BillingTypeFiltersForm = {
	referencia?: string;
};

export const BillingTypeFiltersSheet: FC<PropsWithChildren> = ({
	children,
}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const form = useForm<BillingTypeFiltersForm>({
		resolver: yupResolver(filtersSchema),
	});

	const handleSubmit = async (data: BillingTypeFiltersForm) => {
		// clone to avoid pass object reference to global state
		dispatch(setBillingTypeFilters(cloneDeep(data)));
		setOpen(false);
	};

	const handleClearFilters = () => {
		dispatch(clearBillingTypeFilters());
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			// clear filters on unmount
			dispatch(clearBillingTypeFilters());
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
								name="referencia"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Referência de Faturamento (kWh)</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(billingTypeReferenceOptions).map(
													(ref) => (
														<SelectItem key={ref[0]} value={ref[0]}>
															{ref[1]}
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
