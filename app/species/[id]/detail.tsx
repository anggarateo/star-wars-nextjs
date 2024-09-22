"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import birthYear from "@/utils/birthYear";
import species from "@/utils/query/species";
import type { Species } from "@/utils/types";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailSpecies() {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Species>({} as Species)
	const params = useParams()

	async function getDetailSpecies() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(species.species(params.id.toString()))

		if (result) setData(result.species)

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getDetailSpecies()
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
								<h1 className="w-3/4 sm:w-1/6">
									Classification
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.classification}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Designation
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.designation}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Average Height
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.averageHeight ? `${data.averageHeight} cm` : ''}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Average Lifespan
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.averageLifespan ? `${data.averageLifespan} years` : ''}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Skin Colors
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.skinColors?.join(', ')}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Hair Colors
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.hairColors?.join(', ')}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Eye Colors
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.eyeColors?.join(', ')}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Language
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.language}
								</h1>
							</div>
					
							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Origin Planet
								</h1>
						
								<h1 className="w-full font-semibold">
									{data.homeworld?.name}
								</h1>
							</div>
						</div>

						<h1>
							Characters
						</h1>

						{data.personConnection.people.length <= 0
							? <h1 className="text-sm px-2">
								None
							</h1>
							: <div className="max-w-full flex overflow-auto gap-2 text-sm pb-4">
								{data.personConnection.people.map(character => (
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
