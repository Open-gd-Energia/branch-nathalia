"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { getPathBasedOnScope } from "@/lib/utils";

export default function ForbiddenPage() {
	const router = useRouter();
	const { data } = useSession();

	const findAvailableRoute = () => {
		if (!data) return router.push("/auth/signin");
		const path = getPathBasedOnScope(data);
		router.push(path);
	};

	return (
		<main className="flex flex-col items-center justify-center w-full h-full ite">
			<h1 className="text-4xl mb-4">403 - Forbidden</h1>
			<Button onClick={findAvailableRoute}>Voltar</Button>
		</main>
	);
}
