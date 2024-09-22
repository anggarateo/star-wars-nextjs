"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import birthYear from "@/utils/birthYear";
import film from "@/utils/query/film";
import type { Film } from "@/utils/types";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailFilm() {
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

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getDetailFilm()
	}, []) // eslint-disable-line

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label={data?.title}
					isDetail
				/>
			</CardHeader>

			<Divider />

			<CardBody className="p-4">
				{isLoading
					? <SKeleton count={1} />
					: data && <div className="space-y-3">
						<div className="flex justify-between">
							<div>
								<h1>
									Director: {data.director &&
										<Chip
											variant="faded"
											className="m-1"
										>
											{data.director}
										</Chip>
									}
								</h1>

								<h1 className="text-start">
									Producer: {data.producers?.map((el, i) => (
										<Chip
											key={el + i}
											variant="faded"
											className="m-1"
										>
											{el}
										</Chip>
									))}
								</h1>
							</div>

							<h1>
								<span className="text-2xl">{data.episodeID}</span> Episode
							</h1>
						</div>

						<p>
							{data.openingCrawl}
						</p>

						<h1>
							Characters
						</h1>

						{data.characterConnection.characters.length <= 0
							? <h1 className="text-sm px-2">
								None
							</h1>
							: <div className="max-w-full flex overflow-auto gap-2 text-sm pb-4">
								{data.characterConnection.characters.map(character => (
									<Link
										key={character.id}
										href={`/characters/${character.id}`}
										className="min-w-[calc(100vw/1.3)] sm:min-w-[calc(100vw/3.5)] space-y-1 border rounded p-2 shadow capitalize"
									>
										<h1 className="font-semibold text-end">
											{character.name}
										</h1>

										<div className="flex">
											<h1 className="w-1/3">
												Birth Year
											</h1>

											<h1 className="w-full font-semibold">
												{birthYear(character.birthYear)}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-1/3">
												Gender
											</h1>

											<h1 className="w-full font-semibold">
												{character.gender}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-1/3">
												Mass
											</h1>

											<h1 className="w-full font-semibold">
												{character.mass ? `${character.mass} kg` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-1/3">
												Height
											</h1>

											<h1 className="w-full font-semibold">
												{character.height ? `${character.height} cm` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-1/3">
												Species
											</h1>

											<h1 className="w-full font-semibold">
												{character.species?.name}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-1/3">
												Planet
											</h1>

											<h1 className="w-full font-semibold">
												{character.homeworld?.name}
											</h1>
										</div>
									</Link>
								))}
							</div>
						}
					</div>
				}
			</CardBody>
		</Card>
	)
}
