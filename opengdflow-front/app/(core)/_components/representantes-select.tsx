import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { type FC, useMemo } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { fetchContacts } from "@/app/(core)/pessoas/contatos/_services/fetch";
import { SearchSelect } from "@/components/search-select";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { representanteRelations } from "@/lib/models/contact";
import type { ZodConsumerFormData } from "../consumidores/_components/form-items/zod-schema";

const selectSchema = z.object({
	representante: z.object({
		id: z.coerce.number(),
		nome: z.string(),
	}),
	relacao: z.string().min(1),
});

type RepresentantesSelectForm = z.infer<typeof selectSchema>;

export const RepresentantesSelect: FC = () => {
	const contactSelectForm = useForm<RepresentantesSelectForm>({
		resolver: zodResolver(selectSchema),
		defaultValues: {
			relacao: "",
		},
	});
	const form = useFormContext<ZodConsumerFormData>();
	const { append, remove, fields } = useFieldArray<ZodConsumerFormData>({
		control: form.control,
		name: "representantes",
	});
	const { data: representantes, isLoading } = useQuery({
		queryKey: ["list-representantes"],
		queryFn: () => fetchContacts(),
		refetchOnWindowFocus: false,
	});
	const representanteTitular = form.watch("representanteTitular");

	const representantesOptions = useMemo(
		() =>
			representantes?.map((representante) => ({
				nome:
					representante.pessoaFisica?.nome ||
					representante.pessoaJuridica?.razaoSocial,
				id: representante.id,
			})),
		[representantes],
	);

	const handleSubmit = (data: RepresentantesSelectForm) => {
		// 1) check for duplicates in the parent-fieldArray
		const isDuplicate = fields.some(
			(item) =>
				item?.representante?.id === data?.representante?.id &&
				item?.relacao === data?.relacao,
		);

		if (isDuplicate) {
			// 2) set a manual error on the parent form under "contatos"
			form.setError("representantes", {
				type: "manual",
				message: "Este representante já foi adicionado com essa relação.",
			});
			return;
		}

		// 3) clear any previous error, append, and reset the little select‐form
		form.clearErrors("representantes");

		// if there's no titular, set this as titular
		if (!representanteTitular) {
			form.setValue("representanteTitular", data?.representante);
		}

		append(data);
		contactSelectForm.reset();
	};

	const handleRepresentanteTitularChange = (representante: {
		id: number;
		nome: string;
	}) => {
		form.setValue("representanteTitular", representante);
	};

	return (
		<div className="flex flex-col gap-5">
			<Form {...contactSelectForm}>
				<section className="flex flex-col bg-muted p-3 rounded-lg gap-2">
					<div className="flex gap-2 items-start">
						<FormField
							control={contactSelectForm.control}
							name="representante"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Contato</FormLabel>
									<FormControl>
										<SearchSelect
											value={field.value}
											onValueChange={field.onChange}
											options={representantesOptions || []}
											loading={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={contactSelectForm.control}
							name="relacao"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Relação</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-full bg-background">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Object.entries(representanteRelations).map(
														([value, label]) => (
															<SelectItem key={value} value={value}>
																{label}
															</SelectItem>
														),
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col self-stretch max-h-14 justify-end">
							<Button
								id="submit-representante-distribuidora"
								onClick={contactSelectForm.handleSubmit(handleSubmit)}
								type="button"
								variant="outline"
								size="sm"
							>
								<Plus size={16} />
								Adicionar
							</Button>
						</div>
					</div>
					{form.formState.errors?.representantes?.message && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>
								{form.formState.errors?.representantes?.message?.toString()}
							</AlertTitle>
						</Alert>
					)}
				</section>
			</Form>

			<Table wrapperClassName="border rounded-lg">
				<TableHeader>
					<TableRow>
						<TableHead>Contato</TableHead>
						<TableHead>Relação</TableHead>
						<TableHead>
							<span className="w-12 block line-clamp-1">
								Titular na distribuidora
							</span>
						</TableHead>
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
					{fields?.map((representante, index) => (
						<TableRow key={representante?.id}>
							<TableCell key={representante?.id}>
								<span className="w-56 truncate line-clamp-1 block">
									{representante?.representante?.nome}
								</span>
							</TableCell>
							<TableCell className="w-48">
								{
									Object.entries(representanteRelations).find(
										([value, _]) => value === representante?.relacao,
									)?.[1]
								}
							</TableCell>
							<TableCell className="text-center">
								<div>
									<Switch
										checked={
											representante?.representante?.id ===
											representanteTitular?.id
										}
										onCheckedChange={() =>
											handleRepresentanteTitularChange(
												representante?.representante,
											)
										}
									/>
								</div>
							</TableCell>
							<TableCell>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => remove(index)}
									aria-label="Remover representante"
								>
									<Trash2 size={16} color="red" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
