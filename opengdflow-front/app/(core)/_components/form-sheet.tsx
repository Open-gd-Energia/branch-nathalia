"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	type FC,
	memo,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	cleanActiveSection,
	setFormWrapperActiveSection,
} from "@/lib/redux/features/form-wrapper-slice";
import { cn } from "@/lib/utils";

export interface WrapperProps extends PropsWithChildren {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children, open, onOpenChange }) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-4xl sm:max-w-none">
				<div className="flex h-full">{children}</div>
			</SheetContent>
		</Sheet>
	);
};

export interface AsideProps {
	sections: {
		id: string;
		label: string;
	}[];
	title: string;
}

const Aside: FC<AsideProps> = memo(({ sections, title }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const activeSection = useAppSelector(
		(state) => state?.formWrapper?.activeSection,
	);

	const handleSectionClick = (id: string) => {
		router.replace(`#${id}`);
		dispatch(setFormWrapperActiveSection(id));
	};

	return (
		<aside className="bg-muted flex flex-col gap-8 p-6 max-w-3xs w-full">
			<DialogTitle asChild>
				<h2 className="text-lg leading-7 font-semibold">{title}</h2>
			</DialogTitle>
			<section className="flex gap-4 flex-col">
				{sections.map(({ id, label }) => (
					<span
						key={id}
						onClick={() => handleSectionClick(id)}
						className={cn(
							"cursor-pointer transition-all text-sm text-muted-foreground line-clamp-1",
							activeSection === id && "font-medium text-foreground",
						)}
					>
						{label}
					</span>
				))}
			</section>
		</aside>
	);
});

export interface FormSectionProps extends PropsWithChildren {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubmit: (data: any) => void;
	onCancel?: () => void;
	customFooter?: React.ReactNode;
	submitLoading?: boolean;
	sections?: { id: string; label: string }[];
}

const FormSection: FC<FormSectionProps> = ({
	form,
	onSubmit,
	onCancel,
	children,
	customFooter: CustomFooter,
	submitLoading,
	sections,
}) => {
	const dispatch = useAppDispatch();
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const debouncedSetActiveSection = useCallback(
		(id: string) => {
			dispatch(setFormWrapperActiveSection(id));
		},
		[dispatch],
	);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;

		if (!scrollContainer || !sections) return;

		const sectionElements = sections
			.map((section) => document.getElementById(section.id))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				const intersectingEntry = entries.find((entry) => entry.isIntersecting);
				if (intersectingEntry) {
					debouncedSetActiveSection(intersectingEntry.target.id);
				}
			},
			{
				root: scrollContainer,
				rootMargin: "0px 0px -85% 0px",
			},
		);

		sectionElements?.forEach((el) => {
			observer.observe(el);
		});

		return () => {
			sectionElements?.forEach((el) => {
				observer.unobserve(el);
			});
			dispatch(cleanActiveSection());
		};
	}, [scrollContainerRef, sections, debouncedSetActiveSection]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full h-full overflow-hidden grid grid-rows-[1fr_auto]"
			>
				<div
					className="flex flex-col gap-5 p-6 overflow-auto"
					ref={scrollContainerRef}
				>
					{children}
				</div>
				<footer className="flex px-6 py-2.5 justify-between border-t">
					{CustomFooter ? (
						CustomFooter
					) : (
						<>
							<Button
								type="button"
								size="sm"
								variant="outline"
								onClick={onCancel}
							>
								Cancelar
							</Button>
							<Button disabled={submitLoading} type="submit" size="sm">
								{submitLoading ? (
									<Loader2 className="animate-spin" />
								) : (
									<Save />
								)}
								Salvar
							</Button>
						</>
					)}
				</footer>
			</form>
		</Form>
	);
};

// Compound object
export const FormSheet = {
	Wrapper,
	Aside,
	Form: FormSection,
};
