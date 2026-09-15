export type ApplicationGroup = 'flooring' | 'travertine' | 'interior-walls' | 'facades'

export type ApplicationImage = {
  title: string
  group: ApplicationGroup
  image: string
  width: number
  height: number
}

export type ApplicationGroupDetails = {
  id: ApplicationGroup
  title: string
  description: string
}

const projectImage = (fileName: string) => `/images/applications/projects/${fileName}`

export const applicationGroups: ApplicationGroupDetails[] = [
  {
    id: 'flooring',
    title: 'Flooring & terraces',
    description: 'Natural stone flooring brings durable material character to refined interiors, hospitality spaces, terraces, pool surrounds, and carefully detailed thresholds.',
  },
  {
    id: 'travertine',
    title: 'Travertine / Volubilis',
    description: 'Travertine brings warm mineral movement and tactile character to interior walls, hospitality features, exterior cladding, and monumental architecture.',
  },
  {
    id: 'interior-walls',
    title: 'Interior walls & features',
    description: 'Travertine, limestone, and textured stone create depth across feature walls, fireplaces, hospitality interiors, and illuminated architectural details.',
  },
  {
    id: 'facades',
    title: 'Facades & exteriors',
    description: 'Stone cladding gives residential, commercial, and cultural architecture a lasting exterior presence shaped by texture, scale, and natural tone.',
  },
]

export const applicationImages: ApplicationImage[] = [
  { title: 'Limestone flooring in a luxury interior', group: 'flooring', image: projectImage('luxury-interior-flooring.png'), width: 1536, height: 1024 },
  { title: 'Commercial limestone flooring', group: 'flooring', image: projectImage('commercial-limestone-flooring.jpeg'), width: 4032, height: 3024 },
  { title: 'Tumbled stone flooring detail', group: 'flooring', image: projectImage('tumbled-stone-flooring.jpeg'), width: 1440, height: 1780 },
  { title: 'Outdoor dining terrace in limestone', group: 'flooring', image: projectImage('outdoor-limestone-terrace.png'), width: 1401, height: 1123 },
  { title: 'Tumbled limestone terrace', group: 'flooring', image: projectImage('tumbled-limestone-terrace.png'), width: 894, height: 654 },
  { title: 'Natural stone pool terrace', group: 'flooring', image: projectImage('poolside-stone-terrace.jpeg'), width: 800, height: 600 },
  { title: 'Limestone threshold detailing', group: 'flooring', image: projectImage('limestone-threshold-floor.png'), width: 1170, height: 1452 },
  { title: 'Travertine interior wall cladding', group: 'travertine', image: projectImage('interior-travertine-wall.jpeg'), width: 4032, height: 3024 },
  { title: 'Illuminated travertine wall', group: 'travertine', image: projectImage('illuminated-travertine-wall.jpeg'), width: 4032, height: 3024 },
  { title: 'Hotel feature wall', group: 'travertine', image: projectImage('hotel-feature-wall.jpeg'), width: 4032, height: 3024 },
  { title: 'Textured stone fireplace feature', group: 'interior-walls', image: projectImage('interior-fireplace-stone-wall.jpeg'), width: 1200, height: 1600 },
  { title: 'Interior stone tile wall', group: 'interior-walls', image: projectImage('interior-stone-tile-wall.png'), width: 1250, height: 800 },
  { title: 'Cinema stone facade', group: 'facades', image: projectImage('cinema-stone-facade.jpeg'), width: 1280, height: 960 },
  { title: 'Travertine exterior cladding', group: 'travertine', image: projectImage('travertine-exterior-cladding.jpeg'), width: 1200, height: 1592 },
  { title: 'Contemporary stone architecture', group: 'travertine', image: projectImage('stone-architecture-facade.png'), width: 1170, height: 1515 },
  { title: 'Stone-clad residence', group: 'facades', image: projectImage('stone-clad-residence.png'), width: 986, height: 905 },
  { title: 'Commercial stone exterior', group: 'facades', image: projectImage('commercial-stone-exterior.jpeg'), width: 1134, height: 1512 },
  { title: 'Grey stone facade', group: 'facades', image: projectImage('grey-stone-facade.jpeg'), width: 3024, height: 4032 },
]
