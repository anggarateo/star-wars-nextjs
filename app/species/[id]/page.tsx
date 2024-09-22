import { Metadata } from "next";
import DetailSpecies from "./detail";

export const metadata: Metadata = {
	title: 'Detail Species'
}

export default function Page() {
	return <DetailSpecies />
}
