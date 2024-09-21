import { Metadata } from "next";
import Characters from "./characters";

export const metadata: Metadata = {
	title: 'All Characters'
}

export default function Page() {
	return (
		<section>
			<Characters />
		</section>
	)
}
