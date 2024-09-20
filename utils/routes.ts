import { faClapperboard, faDna, faGlobe, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons"

const routes: {
  to: string,
  name: string,
  icon: IconDefinition
}[] = [
  {
    to: '/films',
    name: 'Films',
    icon: faClapperboard
  },
  {
    to: '/characters',
    name: 'Characters',
    icon: faUser
  },
  {
    to: '/planets',
    name: 'Planets',
    icon: faGlobe
  },
  {
    to: '/species',
    name: 'Species',
    icon: faDna
  }
]

export default routes
