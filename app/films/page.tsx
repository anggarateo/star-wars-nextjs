import { Metadata } from "next";
import Films from "./films";

export const metadata: Metadata = {
	title: 'All Films'
}

export default function Page() {
	return (
		<section>
			<Films />
		</section>
	)
}
