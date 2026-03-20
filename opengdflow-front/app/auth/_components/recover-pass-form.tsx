"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
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
import type { FetcherError } from "@/lib/fetcher";
import { forgotPassword } from "../_services/forgot-password";

yup.setLocale(ptShort);

const recoverPassFormSchema = yup.object({
	email: yup.string().email().required(),
});

type RecoverPassFormType = yup.InferType<typeof recoverPassFormSchema>;

export const RecoverPasswordForm = () => {
	const router = useRouter();
	const form = useForm<RecoverPassFormType>({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(recoverPassFormSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: RecoverPassFormType) => {
			return await forgotPassword({
				...data,
				urlResetPassword: "/auth/change-password/",
			});
		},
		onSuccess: (res) => {
			toast.success("Instruções de recuperação enviadas com sucesso!", {
				description: res?.mensage,
			});
		},
		onError: (e: FetcherError) => {
			console.error("forgotPassword error", e);
			toast.error("Erro ao enviar instruções de recuperação!", {
				description: e?.message,
			});
		},
	});

	const onSubmit = (data: RecoverPassFormType) => {
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
						name="email"
						render={({ field }) => (
							<FormItem>
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
				</div>
				<Button disabled={isPending} className="w-full mt-6" type="submit">
					{isPending && <Loader2 className="animate-spin" />}
					Enviar instruções
				</Button>
			</form>
			<div className="flex flex-col p-6 pt-0 items-center">
				<Button variant="link" onClick={() => router.back()}>
					Voltar
				</Button>
			</div>
		</Form>
	);
};
