"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import birthYear from "@/utils/birthYear";
import planet from "@/utils/query/planet";
import type { Planet } from "@/utils/types";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailPlanet() {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Planet>({} as Planet)
	const params = useParams()

	async function getDetailPlanet() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(planet.planet(params.id.toString()))

		if (result) setData(result.planet)

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getDetailPlanet()
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
									Diameter
								</h1>

								<h1 className="w-full font-semibold">
									{data.diameter ? `${data.diameter} km` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Rotation Period
								</h1>

								<h1 className="w-full font-semibold">
									{data.rotationPeriod ? `${data.rotationPeriod} hours` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Orbital Period
								</h1>

								<h1 className="w-full font-semibold">
									{data.orbitalPeriod ? `${data.orbitalPeriod} days` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Gravity
								</h1>

								<h1 className="w-full font-semibold">
									{data.gravity ? `${data.gravity} G` : ''}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Population
								</h1>

								<h1 className="w-full font-semibold">
									{data.population}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Climates
								</h1>

								<h1 className="w-full font-semibold">
									{data.climates?.join(', ')}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Terrains
								</h1>

								<h1 className="w-full font-semibold">
									{data.terrains?.join(', ')}
								</h1>
							</div>

							<div className="flex">
								<h1 className="w-3/4 sm:w-1/6">
									Surface Water
								</h1>

								<h1 className="w-full font-semibold">
									{data.surfaceWater ? `${data.surfaceWater} %` : ''}
								</h1>
							</div>
						</div>

						<h1>
							Characters
						</h1>

						{data.residentConnection.residents.length <= 0
							? <h1 className="text-sm px-2">
								None
							</h1>
							: <div className="max-w-full flex overflow-auto gap-2 text-sm pb-4">
								{data.residentConnection.residents.map(character => (
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
