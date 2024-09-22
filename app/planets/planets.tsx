"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import planet from "@/utils/query/planet";
import type { Planet } from "@/utils/types";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Planets() {
	const [search, setSearch] = useState('')
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Planet[]>([])
	const [pagination] = useState({
		first: 6,
		after: ''
	})
	const [hasMore, setHasMore] = useState(false)

	async function getPlanets() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(planet.allPlanets(pagination))

		if (result) {
			setHasMore(result.allPlanets.pageInfo.hasNextPage)
			setData([...data, ...result.allPlanets.planets])
			pagination.after = result.allPlanets.pageInfo.endCursor
		}

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getPlanets()
	}, []) // eslint-disable-line

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label="All Planets"
					isFilter
					placeholderFilter="name"
					onSearch={(val: string) => setSearch(val)}
				/>
			</CardHeader>

			<Divider />

			<CardBody>
				{isLoading && !pagination.after
					? <div className="grid sm:grid-cols-3 gap-4">
						<SKeleton />
					</div>
					: <InfiniteScroll
						dataLength={data.length}
						next={getPlanets}
						hasMore={hasMore}
						loader={data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).length > 0
						&& <div className="flex justify-center items-center">
							<Spinner color="default" />
						</div>}
						className="grid sm:grid-cols-3 gap-4"
						style={{ overflowY: 'hidden' }}
					>
						{data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(planet => (
							<Link
								key={planet.id}
								href={`/planets/${planet.id}`}
								className="h-full w-full"
							>
								<Card
									isPressable
									shadow="lg"
									className="border border-divider h-full w-full"
								>
									<CardHeader>
										<h1 className="text-lg font-semibold">
											{planet.name}
										</h1>
									</CardHeader>

									<Divider />

									<CardBody className="capitalize space-y-1">
										<div className="flex">
											<h1 className="w-3/4 sm:w-2/3">
												Diameter
											</h1>

											<h1 className="w-full font-semibold">
												{planet.diameter ? `${planet.diameter} km` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4 sm:w-2/3">
												Rotation Period
											</h1>

											<h1 className="w-full font-semibold">
												{planet.rotationPeriod ? `${planet.rotationPeriod} hours` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4 sm:w-2/3">
												Orbital Period
											</h1>

											<h1 className="w-full font-semibold">
												{planet.orbitalPeriod ? `${planet.orbitalPeriod} days` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4 sm:w-2/3">
												Population
											</h1>

											<h1 className="w-full font-semibold">
												{planet.population}
											</h1>
										</div>
									</CardBody>
								</Card>
							</Link>
						))}
					</InfiniteScroll>
				}
			</CardBody>
		</Card>
	)
}
