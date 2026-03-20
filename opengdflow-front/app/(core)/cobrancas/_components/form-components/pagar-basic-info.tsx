import { useFormContext } from "react-hook-form";
import { ConsumidorSelect } from "@/app/(core)/_components/consumidor-select";
import { UsinaSelect } from "@/app/(core)/_components/usina-select";
import { Datepicker } from "@/components/date-picker";
import { MonthPicker } from "@/components/month-picker";
import {
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/redux";
import { cobrancaStatuses } from "@/lib/models/cobranca";
import type { Consumer } from "@/lib/models/consumer";
import type { Usina } from "@/lib/models/usina";
import type { ZodCobrancaFormData } from "./zod-schemas";

export const PagarBasicInfo = () => {
	const form = useFormContext<ZodCobrancaFormData>();
	const tipo = form.watch("tipo");
	const editFormData = useAppSelector((state) => state.cobrancas.sheet.data);

	const handleTipoChange = (value: string) => {
		form.reset({
			tipo: value,
		} as ZodCobrancaFormData);
	};

	const formType = form.watch("tipo");

	return (
		<>
			<div className="flex items-start justify-between">
				<FormField
					control={form.control}
					name="tipo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo</FormLabel>
							<FormControl>
								<Tabs value={field.value} onValueChange={handleTipoChange}>
									<TabsList>
										<TabsTrigger
											disabled={Boolean(editFormData?.id)}
											value="PAGAR"
										>
											Pagar
										</TabsTrigger>
										<TabsTrigger
											disabled={Boolean(editFormData?.id)}
											value="RECEBER"
										>
											Receber
										</TabsTrigger>
									</TabsList>
								</Tabs>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="identificador"
					render={({ field }) => (
						<FormItem className="w-fit">
							<FormLabel>Número da cobrança</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex items-start justify-between gap-2">
				{tipo === "PAGAR" ? (
					<>
						<FormField
							control={form.control}
							name="usina"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Usina</FormLabel>
									<FormControl>
										<UsinaSelect
											{...field}
											value={field.value as Usina}
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
							<Input disabled value={form.watch("usina")?.uc ?? ""} />
							<FormMessage />
						</FormItem>
					</>
				) : (
					<>
						<FormField
							control={form.control}
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
							<Input disabled value={form.watch("consumidor")?.uc ?? ""} />
							<FormMessage />
						</FormItem>
					</>
				)}
			</div>

			<div className="flex items-start justify-between gap-2">
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
					name="dataVencimento"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Data de vencimento</FormLabel>
							<FormControl>
								<Datepicker
									placeholder="Selecione a data de vencimento"
									placeholderFormat="dd/MM/yyyy"
									calendarProps={{
										fromYear: new Date().getFullYear(),
										toYear: new Date().getFullYear() + 50,
										defaultMonth: field.value,
									}}
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
					control={form.control}
					name="dataEmissao"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Data de emissão</FormLabel>
							<FormControl>
								<Datepicker
									placeholder="Selecione a data de vencimento"
									placeholderFormat="dd/MM/yyyy"
									calendarProps={{
										fromYear: new Date().getFullYear(),
										toYear: new Date().getFullYear() + 50,
										defaultMonth: field.value,
									}}
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
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione o status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.entries(cobrancaStatuses).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label.replace("_", " ")}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{formType === "RECEBER" && (
				<div className="grid grid-cols-2 gap-2 justify-between">
					<FormField
						control={form.control}
						name="economiaGerada"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="line-clamp-1">
									Economia gerada (R$)
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										value={field.value ?? undefined}
										placeholder="Economia gerada"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div />
				</div>
			)}
		</>
	);
};
