interface PageInfo {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string
}

interface Film {
  title: string,
  episodeID: number,
  openingCrawl: string,
  director: string,
  producers: string[],
  releaseDate: string,
  characterConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    characters: Character[]
  },
  created: string,
  edited: string,
  id: string
}

interface Character {
  name: string,
  birthYear: string,
  eyeColor: string,
  gender: string,
  hairColor: string,
  height: number,
  mass: number,
  skinColor: string,
  homeworld: Planet,
  filmConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    films: Film[]
  },
  species: Species,
  created: string,
  edited: string,
  id: string
}

interface Planet {
  name: string,
  diameter: number,
  rotationPeriod: number,
  orbitalPeriod: number,
  gravity: string,
  population: number,
  climates: string[],
  terrains: string[],
  surfaceWater: number,
  residentConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    residents: Character[]
  },
  filmConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    films: Film[]
  },
  created: string,
  edited: string,
  id: string
}

interface Species {
  name: string,
  classification: string,
  designation: string,
  averageHeight: number,
  averageLifespan: number,
  eyeColors: string[],
  hairColors: string[],
  skinColors: string[],
  language: string,
  homeworld: Planet,
  personConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    people: Character[]
  },
  filmConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    films: Film[]
  },
  created: string,
  edited: string,
  id: string
}

export type {
  PageInfo,
  Film,
  Character,
  Planet,
  Species
}
