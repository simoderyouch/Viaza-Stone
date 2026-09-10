export type ApplicationGroup = 'flooring' | 'travertine' | 'interior-walls' | 'facades'

export type ApplicationImage = {
  title: string
  group: ApplicationGroup
  image: string
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
  { title: 'Limestone flooring in a luxury interior', group: 'flooring', image: projectImage('luxury-interior-flooring.png') },
  { title: 'Commercial limestone flooring', group: 'flooring', image: projectImage('commercial-limestone-flooring.jpeg') },
  { title: 'Tumbled stone flooring detail', group: 'flooring', image: projectImage('tumbled-stone-flooring.jpeg') },
  { title: 'Outdoor dining terrace in limestone', group: 'flooring', image: projectImage('outdoor-limestone-terrace.png') },
  { title: 'Tumbled limestone terrace', group: 'flooring', image: projectImage('tumbled-limestone-terrace.png') },
  { title: 'Natural stone pool terrace', group: 'flooring', image: projectImage('poolside-stone-terrace.jpeg') },
  { title: 'Limestone threshold detailing', group: 'flooring', image: projectImage('limestone-threshold-floor.png') },
  { title: 'Travertine interior wall cladding', group: 'travertine', image: projectImage('interior-travertine-wall.jpeg') },
  { title: 'Illuminated travertine wall', group: 'travertine', image: projectImage('illuminated-travertine-wall.jpeg') },
  { title: 'Hotel feature wall', group: 'travertine', image: projectImage('hotel-feature-wall.jpeg') },
  { title: 'Textured stone fireplace feature', group: 'interior-walls', image: projectImage('interior-fireplace-stone-wall.jpeg') },
  { title: 'Interior stone tile wall', group: 'interior-walls', image: projectImage('interior-stone-tile-wall.png') },
  { title: 'Cinema stone facade', group: 'facades', image: projectImage('cinema-stone-facade.jpeg') },
  { title: 'Travertine exterior cladding', group: 'travertine', image: projectImage('travertine-exterior-cladding.jpeg') },
  { title: 'Contemporary stone architecture', group: 'travertine', image: projectImage('stone-architecture-facade.png') },
  { title: 'Stone-clad residence', group: 'facades', image: projectImage('stone-clad-residence.png') },
  { title: 'Commercial stone exterior', group: 'facades', image: projectImage('commercial-stone-exterior.jpeg') },
  { title: 'Grey stone facade', group: 'facades', image: projectImage('grey-stone-facade.jpeg') },
]
