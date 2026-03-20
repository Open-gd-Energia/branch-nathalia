import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ZodInvoiceFormData } from "./zod-schemas";

const ItemForm = ({
	index,
	remove,
}: {
	index: number;
	remove: (index: number) => void;
}) => {
	const form = useFormContext<ZodInvoiceFormData>();

	return (
		<div className="flex flex-col gap-2 bg-muted rounded-lg p-3">
			<Button
				variant="ghost"
				className="self-end p-0 h-4 w-4"
				onClick={() => remove(index)}
			>
				<X size={16} />
			</Button>
			<div className="flex items-start gap-2">
				<Input
					placeholder="Nome"
					className="bg-background"
					{...form.register(`itens.${index}.nome`)}
				/>
				<Input
					type="number"
					step="0.01"
					placeholder="Valor"
					className="bg-background"
					{...form.register(`itens.${index}.valor`)}
				/>
			</div>
			<Textarea
				placeholder="Descrição"
				className="bg-background"
				{...form.register(`itens.${index}.descricao`)}
			/>
		</div>
	);
};

export const DiscountAddItems = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "itens",
	});

	return (
		<>
			<span className="text-sm font-medium leading-5">Descontos</span>

			<div className="space-y-4">
				{fields.map((field, index) =>
					field.tipo === "DESCONTO" ? (
						<ItemForm key={field.id} index={index} remove={remove} />
					) : null,
				)}
				<Button
					size="sm"
					type="button"
					onClick={() =>
						append({ tipo: "DESCONTO", nome: "", valor: 0, descricao: "" })
					}
					variant="outline"
				>
					<Plus className="h-4 w-4 mr-2" /> Adicionar desconto
				</Button>
			</div>

			<span className="text-sm font-medium leading-5">Acréscimos</span>

			<div className="space-y-4">
				{fields.map((field, index) =>
					field.tipo === "ACRESCIMO" ? (
						<ItemForm key={field.id} index={index} remove={remove} />
					) : null,
				)}
				<Button
					size="sm"
					type="button"
					onClick={() =>
						append({ tipo: "ACRESCIMO", nome: "", valor: 0, descricao: "" })
					}
					variant="outline"
				>
					<Plus className="h-4 w-4 mr-2" /> Adicionar acréscimo
				</Button>
			</div>
		</>
	);
};
