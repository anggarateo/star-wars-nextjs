import { Metadata } from "next";
import DetailCharacter from "./detail";

export const metadata: Metadata = {
	title: 'Detail Character'
}

export default function Page() {
	return <DetailCharacter />
}
