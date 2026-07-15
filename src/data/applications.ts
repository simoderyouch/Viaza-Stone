export type ApplicationGroup = 'Flooring & stairs' | 'Crazy paving' | 'Walls & facades'

export type ApplicationImage = {
  title: string
  group: ApplicationGroup
  image: string
}

const applicationImage = (fileName: string) => `/images/applications/${fileName}`

export const applicationGroups: Array<{ title: ApplicationGroup; description: string }> = [
  { title: 'Flooring & stairs', description: 'Timeless Beauty. Built to Last. Viaza Limestone brings refined natural tones, organic texture, durability, and material depth to interior flooring, exterior paving, terraces, staircases, and luxury poolside environments.' },
  { title: 'Crazy paving', description: 'Natural Irregularity. Endless Composition. Irregular stone pieces create unique surfaces with organic shapes, changing proportions, mineral texture, and an authentic connection to natural landscapes.' },
  { title: 'Walls & facades', description: 'Turn Natural Stone into an Architectural Surface. Viaza wall cladding and facades introduce texture, depth, and lasting material character to interiors, bathrooms, feature walls, and exterior elevations.' },
]

export const applicationImages: ApplicationImage[] = [
  { title: 'Modern living room flooring', group: 'Flooring & stairs', image: applicationImage('01_page_17_floor_modern_living_room.webp') },
  { title: 'Stone tile flooring', group: 'Flooring & stairs', image: applicationImage('02_page_18_floor_flower_vase_tiles.webp') },
  { title: 'Geometric stone flooring', group: 'Flooring & stairs', image: applicationImage('03_page_18_floor_hexagon_room.webp') },
  { title: 'Dark stone staircase', group: 'Flooring & stairs', image: applicationImage('04_page_19_staircase_dark_stone.webp') },
  { title: 'Staircase in a green interior', group: 'Flooring & stairs', image: applicationImage('05_page_19_staircase_green_interior.webp') },
  { title: 'Indoor-outdoor stone flooring', group: 'Flooring & stairs', image: applicationImage('06_page_20_indoor_outdoor_flooring.webp') },
  { title: 'Living room stone flooring', group: 'Flooring & stairs', image: applicationImage('07_page_20_living_room_flooring.webp') },
  { title: 'Moroccan interior flooring', group: 'Flooring & stairs', image: applicationImage('08_page_21_moroccan_interior_flooring.webp') },
  { title: 'Riad courtyard flooring', group: 'Flooring & stairs', image: applicationImage('09_page_22_riad_courtyard_flooring.webp') },
  { title: 'Crazy paving hallway', group: 'Crazy paving', image: applicationImage('10_page_23_crazy_paving_hallway.webp') },
  { title: 'Crazy paving poolside', group: 'Crazy paving', image: applicationImage('11_page_24_crazy_paving_poolside.webp') },
  { title: 'Interior stone feature wall', group: 'Walls & facades', image: applicationImage('12_page_25_wall_feature_interior.webp') },
  { title: 'Modern exterior facade', group: 'Walls & facades', image: applicationImage('13_page_26_exterior_facade_modern.webp') },
  { title: 'Block stone facade', group: 'Walls & facades', image: applicationImage('14_page_26_exterior_facade_block.webp') },
  { title: 'Interior wall cladding', group: 'Walls & facades', image: applicationImage('15_page_27_interior_wall_cladding.webp') },
  { title: 'Bathroom wall cladding', group: 'Walls & facades', image: applicationImage('16_page_27_bathroom_wall_cladding.webp') },
  { title: 'Dark bathroom wall cladding', group: 'Walls & facades', image: applicationImage('17_page_28_bathroom_wall_cladding_dark.webp') },
  { title: 'Feature wall bathtub', group: 'Walls & facades', image: applicationImage('18_page_28_feature_wall_bathtub.webp') },
  { title: 'Library wall cladding', group: 'Walls & facades', image: applicationImage('19_page_29_library_wall_cladding.webp') },
  { title: 'Cinema exterior wall', group: 'Walls & facades', image: applicationImage('20_page_29_cinema_exterior_wall.webp') },
]
