import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn("flex flex-col items-center h-full w-full", "md:flex-row")}
		>
			<section className="relative flex-col h-full w-full lg:max-w-1/2">
				{/* Background image */}
				<Image
					src="/login_bg.png"
					alt="Login Background"
					fill
					sizes="100vw"
					priority
					className="absolute inset-0 object-cover z-0"
				/>

				{/* Foreground content (logo) */}
				<header className="relative z-10 p-6">
					<div className="relative w-[141px] h-[32px] md:w-[195px] md:h-[45px]">
						<Image
							src="/logo.svg"
							alt="Company Logo"
							fill
							sizes="195px"
							className="object-contain"
							priority
						/>
					</div>
				</header>
			</section>
			<section
				test-id="signin-slots"
				className="flex justify-center w-full lg:max-w-1/2"
			>
				<div className="flex flex-col w-full items-center max-w-96">
					{children}
				</div>
			</section>
		</div>
	);
}
