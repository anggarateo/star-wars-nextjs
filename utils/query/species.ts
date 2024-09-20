const allSpecies = ({
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
  allSpecies(
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
    species {
      name
      classification
      designation
      averageHeight
      skinColors
      hairColors
      eyeColors
      averageLifespan
      language
      homeworld {
        name
        id
      }
      created
      edited
      id
    }
  }
}`

const species = (id: string) => `{
  species(id: "${id}") {
    name
    classification
    designation
    averageHeight
    skinColors
    hairColors
    eyeColors
    averageLifespan
    language
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
    personConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      people {
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld {
          name
        }
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
  allSpecies,
  species
}
