import Nav from "./nav";

export default function Header() {
    return (
        <header className="flex justify-between items-center shadow-md sticky top-0 z-[999] bg-white dark:bg-gray-800 dark:text-gray-200">
            <h1
                title="Star Wars App"
                className="text-orange-400 text-2xl font-bold p-4"
            >
                Star Wars App
            </h1>

            <Nav />
        </header>
    )
}
