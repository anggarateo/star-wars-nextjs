import { Metadata } from "next";
import Planets from "./planets";

export const metadata: Metadata = {
	title: 'All Planets'
}

export default function Page() {
	return (
		<section>
			<Planets />
		</section>
	)
}
