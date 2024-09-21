"use client"

import SKeleton from "@/components/reuse/skeleton";
import Title from "@/components/reuse/title";
import { getData } from "@/lib/data";
import film from "@/utils/query/film";
import type { Film } from "@/utils/types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Film() {
	const [search, setSearch] = useState('')
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState<Film[]>([])
	const [pagination, setPagination] = useState({
		first: 6,
		after: ''
	})
	const [hasMore, setHasMore] = useState(false)
	const loaderRef = useRef(null)

	const getFilms = async () => {
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

		if (errors) errors.map((el: { message: string }) => alert(el.message))

		setLoading(false)
	}

	useEffect(() => {
		getFilms()
	}, [])

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const target = entries[0]
			if (target.isIntersecting && hasMore) getFilms()
		})

		if (loaderRef.current) observer.observe(loaderRef.current)
	}, [getFilms])

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

			<CardBody className="grid sm:grid-cols-3 gap-4">
				{
					isLoading && !pagination.after
						? <SKeleton />
						: <>{
							data.filter(el => el.title.toLowerCase().includes(search.toLowerCase())).map(film => (
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
							<div ref={loaderRef} className="flex justify-center items-center">
								{hasMore && <Spinner color="default" />}
							</div>
						</>
				}
			</CardBody>
		</Card>
	)
}
