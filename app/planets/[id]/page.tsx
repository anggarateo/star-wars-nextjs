import { Metadata } from "next";
import DetailPlanet from "./detail";

export const metadata: Metadata = {
	title: 'Detail Planet'
}

export default function Page() {
	return <DetailPlanet />
}
