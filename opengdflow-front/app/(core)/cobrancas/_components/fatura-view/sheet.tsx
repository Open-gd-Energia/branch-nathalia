import { format } from "date-fns";
import { FileText, Save, Send } from "lucide-react";
import { type FC, type PropsWithChildren, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Cobranca } from "@/lib/models/cobranca";
import type { ZodCobrancaFormData } from "../form-components/zod-schemas";
import { FaturaPagarPrintLayout } from "./fatura-pagar-react2print";
import { FaturaReceberPrintLayout } from "./fatura-receber-react2print";

export interface FaturaViewSheetProps extends PropsWithChildren {}

export const FaturaViewSheet: FC<FaturaViewSheetProps> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const form = useFormContext<ZodCobrancaFormData>();
	const invoiceRef = useRef<HTMLDivElement>(null);

	const formType = form.watch("tipo");
	const dataVencimento = form.watch("dataVencimento")
		? format(form.watch("dataVencimento"), "dd/MM/yyyy")
		: "";

	const handlePrint = useReactToPrint({
		contentRef: invoiceRef,
		documentTitle: `FATURA-${formType}${dataVencimento ? `-${dataVencimento}` : ""}`,
	});

	return (
		<>
			{/* This is the hidden component that will be used for printing.
        It lives outside the Sheet and has no restrictive styles.
      */}
			<div className="hidden">
				{formType === "PAGAR" ? (
					<FaturaPagarPrintLayout
						ref={invoiceRef}
						{...(form.getValues() as unknown as Cobranca)}
					/>
				) : (
					<FaturaReceberPrintLayout
						ref={invoiceRef}
						{...(form.getValues() as unknown as Cobranca)}
					/>
				)}
			</div>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>{children}</SheetTrigger>
				<SheetContent className="w-5xl gap-0 sm:max-w-none flex-1 overflow-auto">
					<div className="flex flex-1">
						{formType === "PAGAR" ? (
							<FaturaPagarPrintLayout
								{...(form.getValues() as unknown as Cobranca)}
							/>
						) : (
							<FaturaReceberPrintLayout
								{...(form.getValues() as unknown as Cobranca)}
							/>
						)}
					</div>
					<footer className="flex sticky bottom-0 bg-background px-6 py-2.5 justify-between border-t">
						<Button
							type="button"
							size="sm"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Sair
						</Button>
						{formType === "PAGAR" ? (
							<div className="flex gap-2 items-center">
								<Button
									variant="secondary"
									type="button"
									onClick={handlePrint}
									size="sm"
								>
									<Save /> Baixar
								</Button>

								<Button
									size="sm"
									onClick={() => toast.error("Not implemented")}
								>
									<Send /> Enviar
								</Button>
							</div>
						) : (
							<CobrancaReceberFooter onPrint={handlePrint} />
						)}
					</footer>
				</SheetContent>
			</Sheet>
		</>
	);
};

interface CobrancaFooterProps {
	onPrint: () => void;
}

const CobrancaReceberFooter: FC<CobrancaFooterProps> = ({ onPrint }) => {
	const form = useFormContext<ZodCobrancaFormData>();
	const linhaDigitavel = form.watch("linhaDigitavel");

	const handleEmit = () => {
		// FIXME: Implement it
		toast.error("Not implemented");
	};

	return linhaDigitavel ? (
		<div className="flex gap-2 items-center">
			<Button variant="secondary" type="button" onClick={onPrint} size="sm">
				<Save /> Baixar
			</Button>

			<Button size="sm" onClick={() => toast.error("Not implemented")}>
				<Send /> Enviar
			</Button>
		</div>
	) : (
		<div className="flex gap-2 items-center">
			<Button type="button" onClick={handleEmit} size="sm">
				<FileText /> Emitir
			</Button>
		</div>
	);
};
