"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { getPathBasedOnScope } from "@/lib/utils";

yup.setLocale(ptShort);

const loginFormSchema = yup.object({
	email: yup.string().email().required(),
	senha: yup.string().min(3).required(),
});

type LoginFormType = yup.InferType<typeof loginFormSchema>;

export const LoginForm = () => {
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get("callbackUrl") ?? "/";
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm<LoginFormType>({
		defaultValues: {
			email: "",
			senha: "",
		},
		resolver: yupResolver(loginFormSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: LoginFormType) => {
			setFormError(null);
			const res = await signIn("credentials", {
				redirect: false,
				email: data.email,
				senha: data.senha,
				callbackUrl,
			});

			if (res?.error) {
				// Garante que a mensagem apareça na UI (NextAuth já retorna texto amigável)
				const message =
					res.error || "Usuário e/ou senha inválidos. Por favor, tente novamente.";
				setFormError(message);
				throw new Error(message);
			}

			return res;
		},
		onSuccess: async (res) => {
			toast.success("Login realizado com sucesso! Redirecionando...");
			if (res?.ok) {
				const sessionRes = await fetch("/api/auth/session");
				const session = await sessionRes.json();
				const path = getPathBasedOnScope(session);
				return router.push(path);
			}
			return router.push(res?.url || callbackUrl);
		},
		onError: (e: Error) => {
			const message = e?.message ?? "Erro ao realizar login. Tente novamente.";
			setFormError(message);
			toast.error(message);
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => mutate(data))}
				className="flex flex-col p-6 pt-0 w-full"
			>
				{formError && (
					<div
						className="rounded-md bg-destructive/10 text-destructive text-sm px-3 py-2"
						role="alert"
					>
						{formError}
					</div>
				)}
				<div className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem formStableId="login-email">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										autoComplete="email"
										placeholder="email@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="senha"
						render={({ field }) => (
							<FormItem formStableId="login-password">
								<FormLabel className="mb-2">Senha</FormLabel>
								<FormControl>
									<PasswordInput {...field} autoComplete="current-password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full mt-6" type="submit" disabled={isPending}>
					{isPending && <Loader2 className="animate-spin" />}
					Login
				</Button>
			</form>
			<div className="flex flex-col p-6 pt-0 items-center">
				<Link
					className="text-sm underline text-sky-700"
					href="/auth/recover-password"
				>
					Esqueci minha senha
				</Link>
			</div>
		</Form>
	);
};
