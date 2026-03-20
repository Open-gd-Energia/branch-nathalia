"use client";

import { useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddressFields } from "./address-fields";
import { AddressPickerLeaflet } from "./address-picker";
import type { AddressSchema } from "./zod-schema";

export const AddressFormTabs = () => {
	const form = useFormContext<AddressSchema>();

	const handleChangeType = (value: string) => {
		form.resetField("endereco", {
			defaultValue: {} as AddressSchema["endereco"],
		});
		form.setValue("addressType", value as AddressSchema["addressType"]);
	};

	return (
		<Tabs
			defaultValue={
				form.getValues("endereco.latitude") ? "coordinates" : "address"
			}
			onValueChange={handleChangeType}
			className="gap-4"
		>
			<TabsList>
				<TabsTrigger value="address">Endereço</TabsTrigger>
				<TabsTrigger value="coordinates">Coordenadas geográficas</TabsTrigger>
			</TabsList>
			<TabsContent value="address">
				<AddressFields />
			</TabsContent>
			<TabsContent value="coordinates">
				<AddressPickerLeaflet />
			</TabsContent>
		</Tabs>
	);
};
