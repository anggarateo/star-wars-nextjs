"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import birthYear from "@/utils/birthYear";
import character from "@/utils/query/character";
import type { Character } from "@/utils/types";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Film() {
	const [search, setSearch] = useState('')
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Character[]>([])
	const [pagination, setPagination] = useState({
		first: 6,
		after: ''
	})
	const [hasMore, setHasMore] = useState(false)

	async function getFilms() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(character.allCharacters(pagination))

		if (result) {
			setHasMore(result.allPeople.pageInfo.hasNextPage)
			setData([...data, ...result.allPeople.people])
			pagination.after = result.allPeople.pageInfo.endCursor
		}

		if (errors) errors.map((el: { message: string }) => alert(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getFilms()
	}, [])

	return (
		<Card>
			<CardHeader className="p-4">
				<Title
					label="All Films"
					isFilter
					placeholderFilter="title"
					onSearch={(val: string) => setSearch(val)}
				/>
			</CardHeader>

			<Divider />

			<CardBody>
				{
					isLoading && !pagination.after
						? <div className="grid sm:grid-cols-3 gap-4">
							<SKeleton />
						</div>
						: <InfiniteScroll
							dataLength={data.length}
							next={getFilms}
							hasMore={hasMore}
							loader={data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).length > 1
							&& <div className="flex justify-center items-center">
								<Spinner color="default" />
							</div>}
							className="grid sm:grid-cols-3 gap-4"
							style={{
								overflowY: 'hidden'
							}}
						>{
							data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(character => (
								<Link
									key={character.id}
									href={`/characters/${character.id}`}
									className="h-full w-full"
								>
									<Card
										isPressable
										shadow="lg"
										className="border border-divider h-full w-full"
									>
										<CardHeader>
											<h1 className="text-lg font-semibold">
												{character.name}
											</h1>
										</CardHeader>
	
										<Divider />
	
										<CardBody>
											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Birth Year
												</h1>

												<h1 className="w-full font-semibold">
													{birthYear(character.birthYear)}
												</h1>
											</div>

											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Gender
												</h1>

												<h1 className="w-full font-semibold">
													{character.gender}
												</h1>
											</div>

											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Mass
												</h1>

												<h1 className="w-full font-semibold">
													{character.mass ? `${character.mass} kg` : ''}
												</h1>
											</div>

											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Height
												</h1>

												<h1 className="w-full font-semibold">
													{character.height ? `${character.height} cm` : ''}
												</h1>
											</div>

											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Species
												</h1>

												<h1 className="w-full font-semibold">
													{character.species?.name}
												</h1>
											</div>

											<div className="flex">
												<h1 className="w-1/2 sm:w-1/3">
													Planet
												</h1>

												<h1 className="w-full font-semibold">
													{character.homeworld?.name}
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
