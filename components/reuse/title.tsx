"use client"

import { faChevronLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Title(
	{
		label,
		isFilter,
		placeholderFilter,
		isDetail,
		onSearch
	}: {
		label?: string,
		isFilter?: boolean,
		placeholderFilter?: string,
		isDetail?: boolean,
		onSearch?: (value: string) => void
	}
) {
	const router = useRouter()
	const path = usePathname()
	const [search, setSearch] = useState('')

	function onInput(val: string) {
		setSearch(val)
		if (onSearch) onSearch(val)
	}

	function onBack() {
		const paths = path.split('/')
		if (paths.length > 1) {
			return router.push('/' + paths[1])
		}
	}

	return (
		<div className="space-y-2 sm:flex justify-between w-full">
			<div className="flex items-center gap-2 w-full">
				{isDetail &&
				<Button
					title="Back"
					variant="light"
					isIconOnly
					onClick={onBack}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Button>}

				<h1 className="text-xl font-semibold">
					{label}
				</h1>
			</div>

			{isFilter &&
			<Input
				className="w-full sm:w-fit"
				value={search}
				type="search"
				placeholder={`Search ${placeholderFilter}...`}
				startContent={<FontAwesomeIcon
					icon={faMagnifyingGlass}
					className="text-foreground-500"
				/>}
				variant="bordered"
				onValueChange={onInput}
			/>}
		</div>
	)
}
