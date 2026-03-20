"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import cloneDeep from "lodash.clonedeep";
import isEmpty from "lodash.isempty";
import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import type { Usina } from "@/lib/models/usina";
import {
	cleanInternalUserData,
	toggleOpenInternalUserSheet,
} from "@/lib/redux/features/internal-user/slice";
import { FormSheet } from "../../../_components/form-sheet";
import {
	type UpsertInternalUserRequest,
	upsertInternalUser,
} from "../_services/upsert";
import { AccessProfilesSelect } from "./access-profile-select";
import { ConsumersSelect } from "./consumers-select";
import { UsinasSelect } from "./factory-select";

yup.setLocale(ptForm);

const internalUserSchema = yup.object({
	status: yup.number().required().default(1),
	nome: yup.string().required(),
	email: yup.string().email().required(),
	perfil: yup
		.object()
		.shape({
			id: yup.number().required(),
		})
		.required(),

	senha: yup.string().min(6, "Mínimo de 6 caracteres").required(),
	passwordConfirm: yup
		.string()
		.required()
		.oneOf([yup.ref("senha")], "As senhas devem coincidir"),
	consumidores: yup
		.array()
		.of(yup.object().shape({ id: yup.number().required() }))
		.optional()
		.default([]),
	usinas: yup
		.array()
		.of(yup.object().shape({ id: yup.number().optional() }))
		.optional()
		.default([]),
}) as yup.ObjectSchema<InternalUserFormData>;

export type InternalUserFormData = {
	status: number;
	nome: string;
	email: string;
	senha: string;
	passwordConfirm: string;
	perfil: { id: number };
	consumidores: { id: number }[];
	usinas: { id: number }[];
};

const defaultValues: InternalUserFormData = {
	status: 1,
	perfil: { id: 0 },
	nome: "",
	email: "",
	senha: "",
	passwordConfirm: "",
	consumidores: [],
	usinas: [],
};

export interface UpsertInternalUserSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertInternalUserSheet: FC<UpsertInternalUserSheetProps> = ({
	onClose,
	onSuccess,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.internalUser.sheet.open);
	const editFormData = useAppSelector((state) => state.internalUser.sheet.data);
	const [currentSchema, setCurrentSchema] = useState(internalUserSchema);

	// Initialize the form with the correct schema based on mode
	const form = useForm<InternalUserFormData>({
		defaultValues,
		resolver: yupResolver(currentSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanInternalUserData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const formattedData = {
				...editFormData,
				usinas: editFormData?.usinas?.map((usina) => usina?.usina),
			};
			form.reset(cloneDeep(formattedData) as unknown as InternalUserFormData);
		} else {
			const newSchema = internalUserSchema.shape({
				senha: yup.string().min(6, "Mínimo de 6 caracteres").notRequired(),
				passwordConfirm: yup
					.string()
					.notRequired()
					.oneOf([yup.ref("senha")], "As senhas devem coincidir"),
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			setCurrentSchema(newSchema as any);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanInternalUserData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: UpsertInternalUserRequest) => {
			return await upsertInternalUser(formData);
		},
		onSuccess: () => {
			toast.success("Usuário criado com sucesso!");
			dispatch(toggleOpenInternalUserSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar usuário!", {
				description: e.message,
			});
		},
	});

	const handleSubmit = useCallback(
		(formData: InternalUserFormData) => {
			const formattedData = {
				...formData,
				usinas: formData?.usinas?.map((usina) => ({
					usina,
					proprietario: false,
				})),
			};
			mutate(formattedData);
		},
		[mutate],
	);

	const handleRemoveAllSelection = useCallback(() => {
		form.setValue("consumidores", []);
		form.setValue("usinas", []);
	}, [form]);

	const handleTabChange = useCallback((_currentTab: string) => {
		form.setValue("consumidores", []);
		form.setValue("usinas", []);
	}, []);

	const sections = [
		{ id: "basic-info", label: "1. Informações Básicas" },
		{ id: "password", label: "2. Senha" },
		{ id: "access", label: "3. Acessos" },
	];

	const handleClose = () => {
		dispatch(toggleOpenInternalUserSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenInternalUserSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const consumidoresList = form.watch("consumidores");

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Usuário" : "Novo Usuário"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={handleClose}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome completo</FormLabel>
								<FormControl>
									<Input placeholder="Nome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-2 w-full items-start">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="email@email.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="perfil.id"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Perfil de acesso</FormLabel>
									<AccessProfilesSelect
										onValueChange={field.onChange}
										defaultValue={field?.value?.toString()}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<Separator className="my-3" />

				<section id="password" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">2. Senha</h3>
					<div className="flex gap-2 w-full items-start">
						<FormField
							control={form.control}
							name="senha"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="mb-2">Confirmação de Senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<Separator className="my-3" />

				<section id="access" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">3. Acessos</h3>

					<Tabs
						onValueChange={handleTabChange}
						defaultValue={isEmpty(consumidoresList) ? "usinas" : "consumidores"}
						className="gap-4"
					>
						<div className="flex justify-between">
							<TabsList>
								<TabsTrigger value="usinas" className="h-7">
									Usinas
								</TabsTrigger>
								<TabsTrigger value="consumidores" className="h-7">
									Consumidores
								</TabsTrigger>
							</TabsList>
							<Button
								onClick={handleRemoveAllSelection}
								type="button"
								variant="outline"
								size="sm"
								className="border-destructive text-destructive hover:text-destructive"
							>
								Limpar seleção
							</Button>
						</div>
						<TabsContent value="usinas">
							<FormField
								control={form.control}
								name="usinas"
								render={({ field }) => (
									<FormItem className="w-full p-3 bg-muted rounded-lg">
										<FormLabel className="mb-2">Usinas</FormLabel>
										<FormControl>
											<UsinasSelect
												onValueChange={field.onChange}
												value={field.value as Usina[]}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TabsContent>
						<TabsContent value="consumidores">
							<FormField
								control={form.control}
								name="consumidores"
								render={({ field }) => (
									<FormItem className="w-full p-3 bg-muted rounded-lg">
										<FormLabel className="mb-2">Consumidor</FormLabel>
										<FormControl>
											<ConsumersSelect
												onValueChange={field.onChange}
												value={field.value as Consumer[]}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TabsContent>
					</Tabs>
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
