import { Skeleton } from "@nextui-org/react";

export default function SKeleton(
    {
        count = 3,
        height = 'h-24'
    }: {
        count?: number,
        height?: string
    }
) {
    return (
        <>
            {
                new Array(count).fill(0).map((el, i) => (
                    <Skeleton
                        key={el + i}
                        className={`${height} rounded-lg`}
                    />
                ))
            }
        </>
    )
}
