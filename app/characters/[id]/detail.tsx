"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import birthYear from "@/utils/birthYear";
import character from "@/utils/query/character";
import type { Character } from "@/utils/types";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailCharacter() {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Character>({} as Character)
	const params = useParams()

	async function getDetailCharacter() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(character.character(params.id.toString()))

		if (result) setData(result.person)

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getDetailCharacter()
	}, []) // eslint-disable-line

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label={data?.name}
					isDetail
				/>
			</CardHeader>

			<Divider />

			<CardBody className="p-4">
				{isLoading
					? <SKeleton count={1} />
					: data && <div className="space-y-3 capitalize">
						<div className="space-y-1">
							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Birth Year
								</h1>

								<h1 className="w-full font-semibold">
									{birthYear(data.birthYear)}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Gender
								</h1>

								<h1 className="w-full font-semibold">
									{data.gender}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Mass
								</h1>

								<h1 className="w-full font-semibold">
									{data.mass ? `${data.mass} kg` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Height
								</h1>

								<h1 className="w-full font-semibold">
									{data.height ? `${data.height} cm` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Skin
								</h1>

								<h1 className="w-full font-semibold">
									{data.skinColor}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Hair
								</h1>

								<h1 className="w-full font-semibold">
									{data.hairColor}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Eye
								</h1>

								<h1 className="w-full font-semibold">
									{data.eyeColor}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Species
								</h1>

								<div className="w-full">
									<Link
										className="font-semibold underline hover:text-orange-400"
										href={`/species/${data.species?.id}`}
									>
										{data.species?.name}
									</Link>
								</div>
							</div>

							<div className="flex">
								<h1 className="w-1/3 sm:w-1/6">
									Planet
								</h1>

								<div className="w-full">
									<Link
										className="font-semibold underline hover:text-orange-400"
										href={`/planets/${data.homeworld?.id}`}
									>
										{data.homeworld?.name}
									</Link>
								</div>
							</div>
						</div>

						<h1>
							Films
						</h1>

						{data.filmConnection.films.length <= 0
							? <h1 className="text-sm px-2">
								None
							</h1>
							: <div className="max-w-full flex overflow-auto gap-2 text-sm pb-4">
								{data.filmConnection.films.map(film => (
									<Link
										key={film.id}
										href={`/films/${film.id}`}
										className="min-w-[calc(100vw/2)] sm:min-w-[calc(100vw/10)] w-[calc(100vw/2)] sm:w-[calc(100vw/4)] space-y-1 border rounded p-2 shadow"
									>
										<h1 className="text-end font-semibold">
											{film.title}
										</h1>

										<div className="text-xs">
											<h1>
												Director: {film.director &&
													<Chip
														variant="faded"
														className="m-1"
													>
														{film.director}
													</Chip>
												}
											</h1>
			
											<h1 className="text-start">
												Producer: {film.producers?.map((el, i) => (
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
