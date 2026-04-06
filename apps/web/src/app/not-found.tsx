import Link from "next/link";
import { Button } from "@workspace/ui/components";
import { ErrorLayout, NotFoundIllustration } from "@/components/error";

export default function NotFoundPage() {
	return (
		<ErrorLayout
			illustration={<NotFoundIllustration />}
			title="Page Not Found"
			action={
				<Button asChild variant="outline">
					<Link href="/">Back to Home</Link>
				</Button>
			}
		/>
	);
}
