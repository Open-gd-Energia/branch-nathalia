import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { RecoverPasswordForm } from "../_components/recover-pass-form";

export const metadata: Metadata = {
	title: "Recover Password",
};

export default function RecoverPasswordPage() {
	return (
		<>
			<div className={cn("flex flex-col gap-1.5 p-6", "")}>
				<h2 className="text-2xl font-semibold text-card-foreground">
					Recuperar senha
				</h2>
				<p className="text-sm text-muted-foreground">
					Preencha os dados abaixo para receber as instruções no e-mail
					cadastrado
				</p>
			</div>
			<RecoverPasswordForm />
		</>
	);
}
