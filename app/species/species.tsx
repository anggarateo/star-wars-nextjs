"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import species from "@/utils/query/species";
import type { Species } from "@/utils/types";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Species() {
	const [search, setSearch] = useState('')
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Species[]>([])
	const [pagination] = useState({
		first: 6,
		after: ''
	})
	const [hasMore, setHasMore] = useState(false)

	async function getSpecies() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(species.allSpecies(pagination))

		if (result) {
			setHasMore(result.allSpecies.pageInfo.hasNextPage)
			setData([...data, ...result.allSpecies.species])
			pagination.after = result.allSpecies.pageInfo.endCursor
		}

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getSpecies()
	}, []) // eslint-disable-line

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label="All Species"
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
						next={getSpecies}
						hasMore={hasMore}
						loader={data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).length > 0
						&& <div className="flex justify-center items-center">
							<Spinner color="default" />
						</div>}
						className="grid sm:grid-cols-3 gap-4"
						style={{ overflowY: 'hidden' }}
					>
						{data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(species => (
							<Link
								key={species.id}
								href={`/species/${species.id}`}
								className="h-full w-full"
							>
								<Card
									isPressable
									shadow="lg"
									className="border border-divider h-full w-full"
								>
									<CardHeader>
										<h1 className="text-lg font-semibold">
											{species.name}
										</h1>
									</CardHeader>

									<Divider />

									<CardBody className="capitalize space-y-1">
										<div className="flex">
											<h1 className="w-3/4">
												Classification
											</h1>

											<h1 className="w-full font-semibold">
												{species.classification}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4">
												Designation
											</h1>

											<h1 className="w-full font-semibold">
												{species.designation}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4">
												Average Height
											</h1>

											<h1 className="w-full font-semibold">
												{species.averageHeight ? `${species.averageHeight} cm` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4">
												Average Lifespan
											</h1>

											<h1 className="w-full font-semibold">
												{species.averageLifespan ? `${species.averageLifespan} years` : ''}
											</h1>
										</div>

										<div className="flex">
											<h1 className="w-3/4">
												Language
											</h1>

											<h1 className="w-full font-semibold">
												{species.language}
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
