"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	cleanAccessProfilesData,
	toggleOpenAccessProfilesSheet,
} from "@/lib/redux/features/access-profiles/slice";
import { FormSheet } from "../../../_components/form-sheet";
import { fetchPermissions } from "../_services/fetch-permissions";
import { upsertAccessProfile } from "../_services/upsert";
import { PermissionSelect } from "./permissions-select";

yup.setLocale(ptForm);

const accessProfilesSchema = yup.object().shape({
	nome: yup.string().required(),
	permissoes: yup
		.array()
		.of(yup.object().shape({ id: yup.number().required() }))
		.required(),
	descricao: yup.string().default("").optional(),
});

const defaultFormValues = {
	nome: "",
	permissoes: [],
	descricao: "",
};

export type AccessProfilesForm = yup.InferType<typeof accessProfilesSchema>;

export interface UpsertAccessProfilesSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertAccessProfilesSheet: FC<UpsertAccessProfilesSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const form = useForm<AccessProfilesForm>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(accessProfilesSchema),
	});
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.accessProfiles.sheet.open);
	const editFormData = useAppSelector(
		(state) => state.accessProfiles.sheet.data,
	);
	const { data: permissionsList, isLoading } = useQuery({
		queryKey: ["permissions-list"],
		queryFn: fetchPermissions,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultFormValues);
			dispatch(cleanAccessProfilesData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			form.reset(editFormData);
		}

		if (!open) {
			form.reset(defaultFormValues);
			dispatch(cleanAccessProfilesData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (data: AccessProfilesForm) => upsertAccessProfile(data),
		onSuccess: () => {
			toast.success("Perfil de acesso criado com sucesso!");
			dispatch(toggleOpenAccessProfilesSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar perfil de acesso!", {
				description: e.message,
			});
		},
	});

	const handleClose = () => {
		dispatch(toggleOpenAccessProfilesSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenAccessProfilesSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const sections = [
		{ id: "basic-info", label: "1. Informações Básicas" },
		{ id: "permissions", label: "2. Permissões" },
	];

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={
					editFormData?.id ? "Editar Perfil de Acesso" : "Novo Perfil de Acesso"
				}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit((data) => mutate(data))}
				onCancel={handleClose}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<div className="flex gap-2 w-full items-start">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<PermissionSelect />
					</div>

					<FormField
						control={form.control}
						name="descricao"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>

				<Separator className="my-3" />

				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">2. Permissões</h3>

					<section className="flex flex-col gap-1">
						{permissionsList?.map((permission) => (
							<div
								key={permission?.id}
								className="flex bg-muted rounded-md p-4"
							>
								<div className="flex flex-col gap-2">
									<h4 className="mb-2 text-sm font-medium leading-5">
										{permission?.nome}
									</h4>
									<p className="text-sm leading-none">
										{permission?.descricao}
									</p>
								</div>
							</div>
						))}
					</section>
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
