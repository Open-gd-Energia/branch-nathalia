import { redirect } from "next/navigation";

export default async function PeoplePage() {
	redirect("/pessoas/contatos");
}
