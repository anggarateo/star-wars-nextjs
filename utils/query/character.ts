const allCharacters: any = ({
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
  allPeople(
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
    },
    totalCount,
    people {
      name,
      birthYear,
      gender,
      height,
      mass,
      species {
        name
        id
      }
      homeworld {
        name
        id
      }
      created,
      edited,
      id
    }
  }
}`

const character: any = (id: string) => `{
  person(id: "${id}") {
    name,
    birthYear,
    eyeColor,
    gender,
    hairColor,
    height,
    mass,
    skinColor,
    species {
      name
      id
    }
    homeworld {
      name
      id
    }
    filmConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      },
      totalCount,
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
    },
    created,
    edited,
    id
  }
}`

export default {
  allCharacters,
  character
}
