"use client"

import routes from "@/utils/routes";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
	const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

	return (
		<nav className="flex items-center gap-4 fixed bottom-0 sm:sticky sm:top-0 bg-white dark:bg-gray-800 w-full sm:w-max justify-around p-2 shadow-inner sm:shadow-none">
			{routes.map((el, i) => (
				<Link
					key={i}
					href={el.to}
					title={el.name}
					className={`
						${pathname.includes(el.to) && 'text-orange-400 font-semibold'}
						p-2 flex flex-col items-center
					`}
				>
          <div
            className="sm:hidden"
          >
            <FontAwesomeIcon
              icon={el.icon}
            />
          </div>

					<h1 className="text-xs sm:text-base">
						{el.name}
					</h1>
				</Link>
			))}

      <Button
        title={theme}
        isIconOnly
        variant="light"
      >
        <FontAwesomeIcon
          icon={theme === 'dark' ? faMoon : faSun}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </Button>
		</nav>
	)
}
