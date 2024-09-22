import { Metadata } from "next";
import Species from "./species";

export const metadata: Metadata = {
	title: 'All Species'
}

export default function Page() {
	return (
		<section>
			<Species />
		</section>
	)
}
