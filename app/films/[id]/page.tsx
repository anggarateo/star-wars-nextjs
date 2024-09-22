import { Metadata } from "next";
import DetailFilm from "./detail";

export const metadata: Metadata = {
	title: 'Detail Film'
}

export default function Page() {
	return <DetailFilm />
}
