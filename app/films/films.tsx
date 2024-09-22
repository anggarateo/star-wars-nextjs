"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import film from "@/utils/query/film";
import type { Film } from "@/utils/types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Film() {
	const [search, setSearch] = useState('')
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Film[]>([])
	const [pagination] = useState({
		first: 6,
		after: ''
	})
	const [hasMore, setHasMore] = useState(false)

	async function getFilms() {
		setLoading(true)

		const {
			data: result,
			errors
		} = await getData(film.allFilms(pagination))

		if (result) {
			setHasMore(result.allFilms.pageInfo.hasNextPage)
			setData([...data, ...result.allFilms.films])
			pagination.after = result.allFilms.pageInfo.endCursor
		}

		if (errors) errors.map((el: { message: string }) => toast.error(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getFilms()
	}, []) // eslint-disable-line

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
				{isLoading && !pagination.after
					? <div className="grid sm:grid-cols-3 gap-4">
						<SKeleton />
					</div>
					: <InfiniteScroll
						dataLength={data.length}
						next={getFilms}
						hasMore={hasMore}
						loader={data.filter(el => el.title.toLowerCase().includes(search.toLowerCase())).length > 0
						&& <div className="flex justify-center items-center">
							<Spinner color="default" />
						</div>}
						className="grid sm:grid-cols-3 gap-4"
						style={{ overflowY: 'hidden' }}
					>
						{data.filter(el => el.title.toLowerCase().includes(search.toLowerCase())).map(film => (
							<Link
								key={film.id}
								href={`/films/${film.id}`}
								className="h-full"
							>
								<Card
									isPressable
									shadow="lg"
									className="border border-divider h-full"
								>
									<CardHeader>
										<h1 className="text-lg font-semibold">
											{film.title}
										</h1>
									</CardHeader>

									<Divider />

									<CardBody>
										<p className="line-clamp-3">
											{film.openingCrawl}
										</p>
									</CardBody>

									<Divider />

									<CardFooter className="flex flex-col items-start text-sm">
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
									</CardFooter>
								</Card>
							</Link>
						))}
					</InfiniteScroll>
				}
			</CardBody>
		</Card>
	)
}
