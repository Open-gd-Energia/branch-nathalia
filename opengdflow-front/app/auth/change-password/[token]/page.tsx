import { cn } from "@/lib/utils";
import { ChangePasswordForm } from "../../_components/change-password-form";

export default function ChangePasswordPage() {
	return (
		<>
			<div className={cn("flex flex-col gap-1.5 p-6", "")}>
				<h2 className="text-2xl font-semibold text-card-foreground">
					Alterar senha
				</h2>
				<p className="text-sm text-muted-foreground">
					Preencha os dados abaixo para alterar a senha da sua conta
				</p>
			</div>
			<ChangePasswordForm />
		</>
	);
}
