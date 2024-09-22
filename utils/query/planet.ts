const allPlanets = ({
    after,
    first,
    before,
    last
}: {
    after?: string,
    first?: number,
    before?: string,
    last?: number
}) => `{
    allPlanets(
        ${after ? `after: "${after}",` : ''}
        ${first ? `first: ${first},` : ''}
        ${before ? `before: "${before}",` : ''}
        ${last ? `last: ${last},` : ''}
    ) {
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
        totalCount
        planets {
            name
            diameter
            rotationPeriod
            orbitalPeriod
            gravity
            population
            climates
            terrains
            surfaceWater
            created
            edited
            id
        }
    }
}`

const planet = (id: string) => `{
    planet(id: "${id}") {
        name
        diameter
        rotationPeriod
        orbitalPeriod
        gravity
        population
        climates
        terrains
        surfaceWater
        residentConnection {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            totalCount
            residents {
                name
                height
                mass
                hairColor
                skinColor
                eyeColor
                gender
                species {
                    name
                    id
                }
                created
                edited
                id
            }
        }
        filmConnection {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            totalCount
            films {
                title
                episodeID
                openingCrawl
                director
                producers
                releaseDate
                created
                edited
                id
            }
        }
        created
        edited
        id
    }
}`

export default {
    allPlanets,
    planet
}
