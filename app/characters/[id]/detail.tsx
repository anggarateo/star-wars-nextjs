"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import film from "@/utils/query/film";
import type { Film } from "@/utils/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail() {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Film>({} as Film)
	const params = useParams()

	async function getDetailFilm() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(film.film(params.id.toString()))

		if (result) setData(result.film)

		if (errors) errors.map((el: { message: string }) => alert(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getDetailFilm()
	}, [])

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label={data.title}
					isDetail
				/>
			</CardHeader>

			<Divider />

			<CardBody>
				{
					isLoading && <SKeleton count={1} />
				}
			</CardBody>
		</Card>
	)
}
