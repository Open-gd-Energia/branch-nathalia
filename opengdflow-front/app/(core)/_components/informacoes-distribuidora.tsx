import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { fetchDistribuitors } from "@/app/(core)/config/distribuidoras/_services/fetch";
import { PasswordInput } from "@/components/password-input";
import { SearchSelect } from "@/components/search-select";
import {
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
import type { ZodConsumerFormData } from "../consumidores/_components/form-items/zod-schema";

export const InformacoesDistribuidora = () => {
	const form = useFormContext<ZodConsumerFormData>();
	const { data: distribuidoras } = useQuery({
		queryKey: ["distribuidoras"],
		queryFn: async () => fetchDistribuitors(),
		refetchOnWindowFocus: false,
	});

	const representanteTitular = form.watch("representanteTitular");

	return (
		<>
			<FormField
				control={form.control}
				name="distribuidora"
				render={({ field }) => (
					<FormItem className="w-1/2">
						<FormLabel>Distribuidora</FormLabel>
						<FormControl>
							<SearchSelect
								multiple={false}
								options={distribuidoras || []}
								onValueChange={field.onChange}
								value={field.value}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="loginDistribuidora"
					render={({ field }) => (
						<FormItem className="w-1/2">
							<FormLabel>Login</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="senhaDistribuidora"
					render={({ field }) => (
						<FormItem className="w-1/2">
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="space-y-1">
				<Table wrapperClassName="border rounded-lg">
					<TableHeader>
						<TableRow>
							<TableHead>Representante Titular</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{!representanteTitular?.id && (
							<TableRow>
								<TableCell
									colSpan={3}
									style={{ textAlign: "center", padding: 8 }}
								>
									Nenhum representante adicionado
								</TableCell>
							</TableRow>
						)}
						{representanteTitular?.id && (
							<TableRow>
								<TableCell>{representanteTitular.nome}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
