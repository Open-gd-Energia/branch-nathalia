import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<>
			<div className={cn("flex flex-col gap-1.5 p-6", "")}>
				<h2 className="text-2xl font-semibold text-card-foreground">Login</h2>
				<p className="text-sm text-muted-foreground">
					Preencha os dados abaixo para acessar sua conta
				</p>
			</div>
			<LoginForm />
		</>
	);
}
