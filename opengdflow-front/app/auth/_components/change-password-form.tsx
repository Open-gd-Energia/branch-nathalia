"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { FetcherError } from "@/lib/fetcher";
import { resetPassword } from "../_services/reset-password";

yup.setLocale(ptShort);

const changePassFormSchema = yup.object({
	password: yup.string().min(6).required(),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "As senhas devem coincidir")
		.required(),
});

type ChangePassFormType = yup.InferType<typeof changePassFormSchema>;

export const ChangePasswordForm = () => {
	const params = useParams();
	const router = useRouter();
	const form = useForm<ChangePassFormType>({
		defaultValues: {
			passwordConfirm: "",
			password: "",
		},
		resolver: yupResolver(changePassFormSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: ChangePassFormType) => {
			return await resetPassword({
				novaSenha: data?.password,
				token: params?.token as string,
			});
		},
		onSuccess: (res) => {
			toast.success(res?.mensage);
			router.push("/auth/signin");
		},
		onError: (e: FetcherError) => {
			console.error("forgotPassword error", e);
			toast.error("Erro ao alterar senha!", {
				description: e?.message,
			});
		},
	});

	const onSubmit = (data: ChangePassFormType) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col p-6 pt-0 w-full"
			>
				<div className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
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
							<FormItem>
								<FormLabel className="mb-2">Confirmação de Senha</FormLabel>
								<FormControl>
									<PasswordInput {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={isPending} className="w-full mt-6" type="submit">
					{isPending && <Loader2 className="animate-spin" />}
					Alterar senha
				</Button>
			</form>
			<div className="flex flex-col p-6 pt-0 items-center">
				<Button variant="link" onClick={() => router.push("/auth/signin")}>
					Voltar
				</Button>
			</div>
		</Form>
	);
};
