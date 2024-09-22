const allFilms = ({
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
    allFilms(
        ${after ? `after: "${after}"` : ''}
        ${first ? `first: ${first}` : ''}
        ${before ? `before: "${before}"` : ''}
        ${last ? `last: ${last}` : ''}
    ) {
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
}`

const film = (id: string) => `{
    film(id: "${id}") {
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
        characterConnection {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            totalCount
            characters {
                name
                birthYear
                gender
                height
                mass
                species {
                    name
                    id
                }
                homeworld {
                    name
                    id
                }
                id
            }
        }
        created
        edited
        id
    }
}`

export default {
    allFilms,
    film
}
