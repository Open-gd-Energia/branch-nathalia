import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { ConsumidorSelect } from "@/app/(core)/_components/consumidor-select";
import { RoundPercentage } from "@/components/round-percentage";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Consumer } from "@/lib/models/consumer";
import {
	type ZodAlocacaoFormData,
	type ZodConsumidorVinculadoFormData,
	zodConsumidorVinculadoSchema,
} from "./zod-schemas";

const defaultValues: Partial<ZodConsumidorVinculadoFormData> = {
	consumo: 0,
	consumoRef: 0,
	quota: 0,
	quotaExcedente: 0,
};

export const ConsumidoresVinculados = () => {
	const [openMessage, setOpenMessage] = useState(false);
	const consumidorVinculadoForm = useForm<ZodConsumidorVinculadoFormData>({
		defaultValues,
		resolver: zodResolver(zodConsumidorVinculadoSchema),
	});
	const form = useFormContext<ZodAlocacaoFormData>();
	const { fields, append, remove, update } = useFieldArray({
		control: form.control,
		name: "itens",
	});

	const updateConsumidor = (data: ZodConsumidorVinculadoFormData) => {
		update(
			fields.findIndex((item) => item.consumidor.id === data.consumidor.id),
			data,
		);
		setOpenMessage(false);
		consumidorVinculadoForm.reset(defaultValues);
	};

	const handleAddConsumidor = (data: ZodConsumidorVinculadoFormData) => {
		// validate if the user isn't already in the list
		console.debug("data: ", data);
		if (fields.some((item) => item.consumidor.id === data.consumidor.id)) {
			setOpenMessage(true);
		} else {
			append(data);
			consumidorVinculadoForm.reset(defaultValues);
		}
	};

	const handleEditConsumidor = (index: number) => {
		const item = fields[index];
		if (!item) return;

		consumidorVinculadoForm.reset({
			consumidor: item.consumidor,
			consumo: item.consumo,
			consumoRef: item.consumoRef,
			quota: item.quota,
			quotaExcedente: item.quotaExcedente,
		});
		remove(index);
	};

	return (
		<>
			<AlertDialog open={openMessage} onOpenChange={setOpenMessage}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Consumidor já vinculado, deseja substituir quota alocada?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
							Não
						</AlertDialogCancel>
						<Button
							onClick={consumidorVinculadoForm.handleSubmit(updateConsumidor)}
						>
							Sim
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<Form {...consumidorVinculadoForm}>
				<div className="flex flex-col gap-4 p-3 bg-muted rounded-lg">
					<div className="flex items-start justify-between gap-2">
						<FormField
							control={consumidorVinculadoForm.control}
							name="consumidor"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Consumidor</FormLabel>
									<FormControl>
										<ConsumidorSelect
											{...field}
											value={field.value as Consumer}
											onValueChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className="w-1/4">
							<FormLabel className="line-clamp-1">
								Unidade consumidora (UC)
							</FormLabel>
							<Input
								disabled
								value={consumidorVinculadoForm.watch("consumidor")?.uc ?? ""}
							/>
							<FormMessage />
						</FormItem>
					</div>

					<div className="flex items-start justify-between gap-2">
						<FormField
							control={consumidorVinculadoForm.control}
							name="consumo"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Consumo (kW)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Consumo (kW)"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={consumidorVinculadoForm.control}
							name="consumoRef"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Consumo ref. (kW)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Consumo ref. (kW)"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-start justify-between gap-2">
						<FormField
							control={consumidorVinculadoForm.control}
							name="quota"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Quota alocada (%)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Quota alocada (%)"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={consumidorVinculadoForm.control}
							name="quotaExcedente"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Quota excedente (%)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Quota excedente (%)"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex gap-2 justify-end w-full">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => consumidorVinculadoForm.reset(defaultValues)}
						>
							Cancelar
						</Button>
						<Button
							onClick={consumidorVinculadoForm.handleSubmit(
								handleAddConsumidor,
							)}
							type="button"
							size="sm"
						>
							Salvar
						</Button>
					</div>
				</div>
			</Form>

			<Table wrapperClassName="border rounded-lg">
				<TooltipProvider>
					<TableHeader>
						<TableRow>
							<TableHead>Consumidor</TableHead>
							<TableHead className="max-w-[80px]">
								<Tooltip>
									<TooltipTrigger className="w-full truncate">
										Consumo (kW)
									</TooltipTrigger>
									<TooltipContent>Consumo (kW)</TooltipContent>
								</Tooltip>
							</TableHead>
							<Tooltip>
								<TableHead className="max-w-[100px]">
									<Tooltip>
										<TooltipTrigger className="w-full truncate">
											Consumo Ref. (kWh)
										</TooltipTrigger>
										<TooltipContent>Consumo Ref. (kWh)</TooltipContent>
									</Tooltip>
								</TableHead>
							</Tooltip>
							<TableHead className="max-w-[80px]">
								<Tooltip>
									<TooltipTrigger className="w-full truncate">
										Quota alocada
									</TooltipTrigger>
									<TooltipContent>Quota alocada</TooltipContent>
								</Tooltip>
							</TableHead>
							<TableHead className="max-w-[80px] truncate">
								Quota excedente (%)
							</TableHead>
							<TableHead className="w-8 p-0" />
							<TableHead className="w-8 p-0" />
						</TableRow>
					</TableHeader>
				</TooltipProvider>
				<TableBody>
					{fields?.map((item, index) => (
						<TableRow key={item.id}>
							<TableCell>{item?.consumidor?.nome}</TableCell>
							<TableCell>
								{item?.consumo
									? Intl.NumberFormat("pt-BR").format(item?.consumo)
									: "-"}
							</TableCell>
							<TableCell className="max-w-[100px] truncate">
								{item?.consumoRef
									? Intl.NumberFormat("pt-BR").format(item?.consumoRef)
									: "-"}
							</TableCell>
							<TableCell>
								<div className="flex gap-1 items-center">
									<RoundPercentage percentage={item?.quota} />
									{Intl.NumberFormat("pt-BR", {
										style: "percent",
										maximumFractionDigits: 2,
									}).format(item?.quota / 100)}
								</div>
							</TableCell>
							<TableCell className="max-w-[80px] truncate">
								{item?.quotaExcedente
									? Intl.NumberFormat("pt-BR", {
											style: "percent",
											maximumFractionDigits: 2,
										}).format(item?.quotaExcedente / 100)
									: "-"}
							</TableCell>
							<TableCell className="w-8 p-1">
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => remove(index)}
								>
									<Trash2 className="size-4 stroke-destructive" />
								</Button>
							</TableCell>
							<TableCell className="w-8 p-1">
								<Button
									size="icon"
									variant="ghost"
									onClick={(_e) => handleEditConsumidor(index)}
								>
									<Pencil />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
