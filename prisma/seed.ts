import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Marquee seed data.
 *
 * - Stable `id` values so `upsert` is idempotent across runs.
 * - Image URLs point at picsum.photos with a deterministic seed per event,
 *   so the same seed key always returns the same image (great for snapshots).
 * - Three cities so the city filter has real variety. Categories covered:
 *   MUSIC, FOOD, TECH, ART, WELLNESS, COMEDY, FASHION, FILM, WORKSHOP.
 */
const events = [
  // ------------------------------- Austin
  {
    id: 1,
    name: 'Low Country Blues Revue',
    slug: 'low-country-blues-revue',
    city: 'Austin',
    location: 'The Continental Club',
    date: '2030-05-14T02:00:00.000Z',
    organizerName: 'Old Five & Dime',
    imageUrl: 'https://picsum.photos/seed/low-country-blues-revue/1200/800',
    category: 'MUSIC' as const,
    description:
      "A slow, sweaty evening of Piedmont blues and front-porch guitar. Two sets, one short intermission, and a house band that knows when to step back.\n\nThe Continental has hosted these Tuesdays since before the bands started taping setlists. Doors at 8, first set at 9. Seating is tight — come early if you want a booth.",
  },
  {
    id: 2,
    name: 'Southside Supper Club',
    slug: 'southside-supper-club',
    city: 'Austin',
    location: 'El Alma Cafe',
    date: '2030-06-03T00:30:00.000Z',
    organizerName: 'Chef Ana Fuentes',
    imageUrl: 'https://picsum.photos/seed/southside-supper-club/1200/800',
    category: 'FOOD' as const,
    description:
      "A seven-course walk through the Gulf Coast — line-caught snapper, heirloom grits, and a Satsuma sorbet to close. Twelve seats around one long table.\n\nThe menu changes with the market; the pacing doesn't. Plan for three hours.",
  },
  {
    id: 3,
    name: 'South Congress Stand-Up Showcase',
    slug: 'south-congress-stand-up-showcase',
    city: 'Austin',
    location: 'Cap City Comedy',
    date: '2030-05-20T02:30:00.000Z',
    organizerName: 'The Roost',
    imageUrl:
      'https://picsum.photos/seed/south-congress-stand-up-showcase/1200/800',
    category: 'COMEDY' as const,
    description:
      "Six rotating comics, eight minutes each, and a headliner who tours oftener than they rest. Material leans observational; audience participation is gentle.\n\nTwo-drink minimum. BYO forgiveness for the opener.",
  },
  {
    id: 4,
    name: 'Atelier South: Textile Exhibition',
    slug: 'atelier-south-textile-exhibition',
    city: 'Austin',
    location: 'The Contemporary Austin — Laguna Gloria',
    date: '2030-07-18T17:00:00.000Z',
    organizerName: 'Guild of Slow Makers',
    imageUrl:
      'https://picsum.photos/seed/atelier-south-textile-exhibition/1200/800',
    category: 'FASHION' as const,
    description:
      "A quiet survey of hand-woven textiles from nine Southwestern studios. Think natural dyes, patient looms, and one wool coat that took a year.\n\nThe artists will be present at the opening; most pieces are for sale.",
  },
  {
    id: 5,
    name: 'East Side Screenwriters’ Circle',
    slug: 'east-side-screenwriters-circle',
    city: 'Austin',
    location: 'Cheer Up Charlies (back room)',
    date: '2030-06-12T00:00:00.000Z',
    organizerName: 'The Margin Room',
    imageUrl:
      'https://picsum.photos/seed/east-side-screenwriters-circle/1200/800',
    category: 'WORKSHOP' as const,
    description:
      "Four writers read fifteen pages each. The room reads the pages, the writer doesn't talk. Then twenty minutes of notes, then the next writer.\n\nNo guests, no auditors — if you come, you read.",
  },
  {
    id: 6,
    name: 'Yoga in the Rose Garden',
    slug: 'yoga-in-the-rose-garden',
    city: 'Austin',
    location: 'Zilker Botanical Garden',
    date: '2030-05-11T13:00:00.000Z',
    organizerName: 'Still Hour Studio',
    imageUrl: 'https://picsum.photos/seed/yoga-in-the-rose-garden/1200/800',
    category: 'WELLNESS' as const,
    description:
      "Saturday morning, seventy-five minutes, mostly long holds. The rose beds peak around now, so the class runs slow on purpose.\n\nBring your own mat. Coffee and a pastry included at the end.",
  },
  {
    id: 7,
    name: 'Hill Country Film Society: Tarkovsky',
    slug: 'hill-country-film-society-tarkovsky',
    city: 'Austin',
    location: 'AFS Cinema',
    date: '2030-08-09T01:00:00.000Z',
    organizerName: 'Austin Film Society',
    imageUrl:
      'https://picsum.photos/seed/hill-country-film-society-tarkovsky/1200/800',
    category: 'FILM' as const,
    description:
      "A 35mm print of Stalker, introduced by writer Annika Reeve. The film runs 163 minutes and rewards the full seat.\n\nConversation in the lobby after. Stay if you want.",
  },
  {
    id: 8,
    name: 'Builders & Shadows: Infrared Artists',
    slug: 'builders-and-shadows-infrared-artists',
    city: 'Austin',
    location: 'Canopy East Austin',
    date: '2030-10-04T23:00:00.000Z',
    organizerName: 'West Elm Studio',
    imageUrl:
      'https://picsum.photos/seed/builders-and-shadows-infrared-artists/1200/800',
    category: 'ART' as const,
    description:
      "An open-studios night across five buildings, centered on artists working with infrared photography and long-exposure light. Walk between studios; talk to the artists; stay as long as the wine holds.",
  },
  {
    id: 9,
    name: 'Ember Lab: Live Coding Beats',
    slug: 'ember-lab-live-coding-beats',
    city: 'Austin',
    location: 'Capital Factory',
    date: '2030-09-21T03:00:00.000Z',
    organizerName: 'Null Pointer Collective',
    imageUrl: 'https://picsum.photos/seed/ember-lab-live-coding-beats/1200/800',
    category: 'TECH' as const,
    description:
      "Three sets of live-coded music — performers write code on a projector while the room listens. Equal parts concert, demo, and dare.\n\nNo programming experience needed. Bring curiosity and a willingness to stay for the Q&A.",
  },

  // ------------------------------- Seattle
  {
    id: 10,
    name: 'Ballard Farmers’ Pop-Up',
    slug: 'ballard-farmers-pop-up',
    city: 'Seattle',
    location: 'Conor Byrne Pub',
    date: '2030-05-25T18:00:00.000Z',
    organizerName: 'Salt & Second Bloom',
    imageUrl: 'https://picsum.photos/seed/ballard-farmers-pop-up/1200/800',
    category: 'FOOD' as const,
    description:
      "A Saturday-morning market-to-plate breakfast. Coffee from Milstead, bread from Columbia City, eggs from a farm you could drive to.\n\nPrix-fixe, twenty-five seats. The kitchen closes at eleven.",
  },
  {
    id: 11,
    name: 'Late Set: Kamasi Washington Trio',
    slug: 'late-set-kamasi-washington-trio',
    city: 'Seattle',
    location: 'The Triple Door',
    date: '2030-06-07T06:00:00.000Z',
    organizerName: 'Earshot Presents',
    imageUrl:
      'https://picsum.photos/seed/late-set-kamasi-washington-trio/1200/800',
    category: 'MUSIC' as const,
    description:
      "Eleven-p.m. show. A working trio — tenor, bass, drums — playing mostly originals plus one Coltrane blues.\n\nTable seating. Book early, the room fills.",
  },
  {
    id: 12,
    name: 'Capitol Hill Vintage Market',
    slug: 'capitol-hill-vintage-market',
    city: 'Seattle',
    location: 'Melrose Market',
    date: '2030-07-13T17:00:00.000Z',
    organizerName: 'Two Big Blondes Collective',
    imageUrl:
      'https://picsum.photos/seed/capitol-hill-vintage-market/1200/800',
    category: 'FASHION' as const,
    description:
      "Twenty-four curators, one warehouse, decades of clothing. Mostly 60s–90s, mostly second-run designers, entirely worth the afternoon.\n\nEnter from Minor Ave.",
  },
  {
    id: 13,
    name: 'Fremont Writers Live Reading',
    slug: 'fremont-writers-live-reading',
    city: 'Seattle',
    location: 'Hotel Albatross (upstairs)',
    date: '2030-08-22T03:30:00.000Z',
    organizerName: 'Hugo House',
    imageUrl: 'https://picsum.photos/seed/fremont-writers-live-reading/1200/800',
    category: 'ART' as const,
    description:
      'Five local writers reading new work — three fiction, one essay, one the author called a ‘letter, I guess’. Q&A after, drinks throughout.',
  },
  {
    id: 14,
    name: 'Sound Transit Urbanism Summit',
    slug: 'sound-transit-urbanism-summit',
    city: 'Seattle',
    location: 'Town Hall Seattle',
    date: '2030-09-14T16:00:00.000Z',
    organizerName: 'The Urbanist',
    imageUrl:
      'https://picsum.photos/seed/sound-transit-urbanism-summit/1200/800',
    category: 'TECH' as const,
    description:
      "A one-day summit on the next ten years of Puget Sound transit. Panels, a keynote from a former SDOT director, and a walking tour at sunset.",
  },
  {
    id: 15,
    name: 'Rainforest Float Session',
    slug: 'rainforest-float-session',
    city: 'Seattle',
    location: 'Fremont Float House',
    date: '2030-06-18T03:00:00.000Z',
    organizerName: 'Still Hour Studio',
    imageUrl: 'https://picsum.photos/seed/rainforest-float-session/1200/800',
    category: 'WELLNESS' as const,
    description:
      "Ninety minutes in sensory-deprivation tanks, timed to a guided breath practice before and after. First-time visitors welcome.\n\nArrive twenty minutes early.",
  },
  {
    id: 16,
    name: 'Midnight Movies: Wong Kar-wai',
    slug: 'midnight-movies-wong-kar-wai',
    city: 'Seattle',
    location: 'SIFF Egyptian',
    date: '2030-10-12T06:30:00.000Z',
    organizerName: 'Seattle International Film Festival',
    imageUrl: 'https://picsum.photos/seed/midnight-movies-wong-kar-wai/1200/800',
    category: 'FILM' as const,
    description:
      "A 35mm double feature — In the Mood for Love followed by Fallen Angels. Intermission long enough to get another drink.",
  },
  {
    id: 17,
    name: 'Basement Comedy Fremont',
    slug: 'basement-comedy-fremont',
    city: 'Seattle',
    location: 'The Whiskey Bar (downstairs)',
    date: '2030-05-31T04:00:00.000Z',
    organizerName: 'Small Room Comedy',
    imageUrl: 'https://picsum.photos/seed/basement-comedy-fremont/1200/800',
    category: 'COMEDY' as const,
    description:
      "Tight sets in a sixty-seat room with a low ceiling. The lineup rotates weekly; the headliner is a secret till they take the mic.",
  },

  // ------------------------------- New York
  {
    id: 18,
    name: 'Bowery Basement: Analog Futures',
    slug: 'bowery-basement-analog-futures',
    city: 'New York',
    location: 'The Bowery Electric',
    date: '2030-05-22T03:00:00.000Z',
    organizerName: 'Nothing Studio',
    imageUrl:
      'https://picsum.photos/seed/bowery-basement-analog-futures/1200/800',
    category: 'MUSIC' as const,
    description:
      "Three acts working exclusively on analog modular synths. A long, patient set that rewards headphones.\n\nStanding room; the sound is better in the back third.",
  },
  {
    id: 19,
    name: 'An Evening with Ocean Vuong',
    slug: 'an-evening-with-ocean-vuong',
    city: 'New York',
    location: 'Brooklyn Public Library, Central Branch',
    date: '2030-05-14T23:30:00.000Z',
    organizerName: 'Brooklyn Public Library',
    imageUrl: 'https://picsum.photos/seed/an-evening-with-ocean-vuong/1200/800',
    category: 'ART' as const,
    description:
      "A reading from new work, followed by a conversation with novelist Hanif Abdurraqib. Forty-five minutes in conversation, fifteen minutes of audience questions, a signing after.",
  },
  {
    id: 20,
    name: 'Red Hook Gumbo Supper',
    slug: 'red-hook-gumbo-supper',
    city: 'New York',
    location: 'Fort Defiance',
    date: '2030-07-05T00:00:00.000Z',
    organizerName: 'Fort Defiance Kitchen',
    imageUrl: 'https://picsum.photos/seed/red-hook-gumbo-supper/1200/800',
    category: 'FOOD' as const,
    description:
      "A Creole supper night — shrimp gumbo, sausage jambalaya, one stubborn cornbread recipe that's been in the family for sixty years.\n\nCommunal tables. Wine list is short, considered, priced low.",
  },
  {
    id: 21,
    name: 'Washington Heights Wellness Walk',
    slug: 'washington-heights-wellness-walk',
    city: 'New York',
    location: 'Fort Tryon Park',
    date: '2030-06-28T13:00:00.000Z',
    organizerName: 'Uptown Breath Club',
    imageUrl:
      'https://picsum.photos/seed/washington-heights-wellness-walk/1200/800',
    category: 'WELLNESS' as const,
    description:
      "A ninety-minute guided walk through Fort Tryon at sunrise. Three breath stops, one quiet view of the Palisades, and nothing on your phone.",
  },
  {
    id: 22,
    name: 'The Lenapehoking Film Series',
    slug: 'the-lenapehoking-film-series',
    city: 'New York',
    location: 'Metrograph',
    date: '2030-09-06T02:00:00.000Z',
    organizerName: 'Metrograph Pictures',
    imageUrl:
      'https://picsum.photos/seed/the-lenapehoking-film-series/1200/800',
    category: 'FILM' as const,
    description:
      "A four-night series of Indigenous cinema from the Eastern Woodlands. Tonight: a short program by director Sky Hopinka, followed by a conversation moderated by the programmer.",
  },
  {
    id: 23,
    name: 'TriBeCa New Media Salon',
    slug: 'tribeca-new-media-salon',
    city: 'New York',
    location: 'Roxy Hotel',
    date: '2030-10-18T23:00:00.000Z',
    organizerName: 'New Inc.',
    imageUrl: 'https://picsum.photos/seed/tribeca-new-media-salon/1200/800',
    category: 'TECH' as const,
    description:
      "A small salon on the state of generative media, moderated by a working critic. Five short presentations, no slides allowed.\n\nInvite list kept intentionally loose — write a sentence on the RSVP.",
  },
  {
    id: 24,
    name: 'Fashion Week Open Studios: Brooklyn',
    slug: 'fashion-week-open-studios-brooklyn',
    city: 'New York',
    location: 'Industry City, Building 1',
    date: '2030-09-11T16:00:00.000Z',
    organizerName: 'CFDA Emerging Designers',
    imageUrl:
      'https://picsum.photos/seed/fashion-week-open-studios-brooklyn/1200/800',
    category: 'FASHION' as const,
    description:
      "Eleven studios, one afternoon — no runway, no guest list, just designers at their tables willing to talk through the work.",
  },
  {
    id: 25,
    name: 'Brooklyn Pottery Intensive',
    slug: 'brooklyn-pottery-intensive',
    city: 'New York',
    location: 'Gasworks Ceramics, Bushwick',
    date: '2030-06-15T14:00:00.000Z',
    organizerName: 'Gasworks Studio',
    imageUrl: 'https://picsum.photos/seed/brooklyn-pottery-intensive/1200/800',
    category: 'WORKSHOP' as const,
    description:
      "A single-day intensive — throw three vessels, glaze two, leave the third for the kiln and return in a week.\n\nAll skill levels; materials and apron included.",
  },
  {
    id: 26,
    name: 'Village Comedy Cellar — New Faces',
    slug: 'village-comedy-cellar-new-faces',
    city: 'New York',
    location: 'Comedy Cellar',
    date: '2030-05-06T03:30:00.000Z',
    organizerName: 'The Comedy Cellar',
    imageUrl:
      'https://picsum.photos/seed/village-comedy-cellar-new-faces/1200/800',
    category: 'COMEDY' as const,
    description:
      'A ‘new faces’ lineup — seven comics, eight minutes each. One of them will be working the late show at the Beacon in two years; you can tell your friends.',
  },

  // ------------------------------- Austin (second batch)
  {
    id: 27,
    name: 'Tejano Sunday at the White Horse',
    slug: 'tejano-sunday-at-the-white-horse',
    city: 'Austin',
    location: 'The White Horse',
    date: '2030-06-16T22:00:00.000Z',
    organizerName: 'East Side Tejano Society',
    imageUrl:
      'https://picsum.photos/seed/tejano-sunday-at-the-white-horse/1200/800',
    category: 'MUSIC' as const,
    description:
      'Sunday afternoon tejano, conjunto, and two-step lessons for anyone who hasn\'t danced in a while. Free cover before six, $5 after.\n\nThe band rotates weekly; the dance floor doesn\'t.',
  },
  {
    id: 28,
    name: 'Food Truck Atlas: Barton Springs',
    slug: 'food-truck-atlas-barton-springs',
    city: 'Austin',
    location: 'Zilker Park Lawn',
    date: '2030-07-20T17:00:00.000Z',
    organizerName: 'Austin Food & Wine Alliance',
    imageUrl:
      'https://picsum.photos/seed/food-truck-atlas-barton-springs/1200/800',
    category: 'FOOD' as const,
    description:
      'Twenty-two trucks, one lawn, a punch-card you fill by trying a bite from each. Beer and margaritas from a long central bar, live band off to one side.\n\nBring a blanket. No pets.',
  },
  {
    id: 29,
    name: 'Longform Writing Retreat',
    slug: 'longform-writing-retreat',
    city: 'Austin',
    location: 'Paramount Theatre (upstairs studios)',
    date: '2030-09-07T15:00:00.000Z',
    organizerName: 'The Texas Book Project',
    imageUrl: 'https://picsum.photos/seed/longform-writing-retreat/1200/800',
    category: 'WORKSHOP' as const,
    description:
      'A one-day intensive on writing at length — three guided blocks, a working lunch, and a fireside with a published essayist. Limit twelve; coffee bottomless.',
  },
  {
    id: 30,
    name: 'Barton Creek Sunrise Yoga',
    slug: 'barton-creek-sunrise-yoga',
    city: 'Austin',
    location: 'Barton Creek Greenbelt',
    date: '2030-08-16T12:00:00.000Z',
    organizerName: 'Still Hour Studio',
    imageUrl: 'https://picsum.photos/seed/barton-creek-sunrise-yoga/1200/800',
    category: 'WELLNESS' as const,
    description:
      'Sixty minutes, mostly long holds, on the limestone overlook. Class starts fifteen minutes before sunrise; plan accordingly.\n\nBring your own mat. Coffee truck waits at the trailhead.',
  },

  // ------------------------------- Seattle (second batch)
  {
    id: 31,
    name: 'Pike Place Preserved: Ferment Workshop',
    slug: 'pike-place-preserved-ferment-workshop',
    city: 'Seattle',
    location: 'Atrium Kitchen',
    date: '2030-07-06T20:00:00.000Z',
    organizerName: 'Pike Place Market Foundation',
    imageUrl:
      'https://picsum.photos/seed/pike-place-preserved-ferment-workshop/1200/800',
    category: 'WORKSHOP' as const,
    description:
      'A three-hour hands-on — walk out with two jars you started and a primer you\'ll actually re-read. Kimchi, sauerkraut, and a wild-yeast starter to keep feeding.\n\nAll ingredients supplied.',
  },
  {
    id: 32,
    name: 'SeaMo Synth Hardware Meetup',
    slug: 'seamo-synth-hardware-meetup',
    city: 'Seattle',
    location: 'The Crocodile (back bar)',
    date: '2030-08-03T02:00:00.000Z',
    organizerName: 'Pacific Waveform Collective',
    imageUrl: 'https://picsum.photos/seed/seamo-synth-hardware-meetup/1200/800',
    category: 'TECH' as const,
    description:
      'Bring a synth, a patch cable, and an opinion. Three short demos from local builders, an open jam after.',
  },
  {
    id: 33,
    name: 'Georgetown Tattoo Arts Expo',
    slug: 'georgetown-tattoo-arts-expo',
    city: 'Seattle',
    location: 'Georgetown Ballroom',
    date: '2030-09-27T19:00:00.000Z',
    organizerName: 'Fifty Years of Seattle Ink',
    imageUrl: 'https://picsum.photos/seed/georgetown-tattoo-arts-expo/1200/800',
    category: 'ART' as const,
    description:
      'Twenty-eight Pacific-Northwest tattooers showing flash, prints, and the occasional guest-spot booking. Live tattooing on the main stage until close.',
  },
  {
    id: 34,
    name: 'West Seattle Farmers Film Night',
    slug: 'west-seattle-farmers-film-night',
    city: 'Seattle',
    location: 'Junction Plaza',
    date: '2030-08-24T03:00:00.000Z',
    organizerName: 'Neighborhood Theatre',
    imageUrl:
      'https://picsum.photos/seed/west-seattle-farmers-film-night/1200/800',
    category: 'FILM' as const,
    description:
      'A pop-up screen against the brick wall behind the Sunday market. This week: the Pattinson noir nobody saw in theaters.\n\nFree. Bring a camp chair.',
  },

  // ------------------------------- New York (second batch)
  {
    id: 35,
    name: 'Dimes Square Poetry Night',
    slug: 'dimes-square-poetry-night',
    city: 'New York',
    location: 'The Roxy Hotel Cinema',
    date: '2030-06-21T23:00:00.000Z',
    organizerName: 'The Drift',
    imageUrl: 'https://picsum.photos/seed/dimes-square-poetry-night/1200/800',
    category: 'ART' as const,
    description:
      'Five readers, fifteen minutes each, no microphone — the room seats thirty. Mostly essayists who also write poems, mostly reading the poems.',
  },
  {
    id: 36,
    name: 'Bushwick Warehouse Disco',
    slug: 'bushwick-warehouse-disco',
    city: 'New York',
    location: 'Nowadays Outdoor',
    date: '2030-07-26T05:00:00.000Z',
    organizerName: 'Mister Sunday',
    imageUrl: 'https://picsum.photos/seed/bushwick-warehouse-disco/1200/800',
    category: 'MUSIC' as const,
    description:
      'An all-night disco and boogie set in the backyard. Doors at 11, last set goes till 6.\n\n21+, no photos on the floor.',
  },
  {
    id: 37,
    name: 'Chinatown Night Market',
    slug: 'chinatown-night-market',
    city: 'New York',
    location: 'Forsyth Plaza',
    date: '2030-08-17T00:00:00.000Z',
    organizerName: 'Think!Chinatown',
    imageUrl: 'https://picsum.photos/seed/chinatown-night-market/1200/800',
    category: 'FOOD' as const,
    description:
      'Thirty-plus vendors, an outdoor stage, and Cantonese opera running through the evening. Cash and contactless both fine.\n\nOpen from seven till midnight. Come hungry.',
  },
  {
    id: 38,
    name: 'Fort Greene Flea',
    slug: 'fort-greene-flea',
    city: 'New York',
    location: 'Lafayette & Vanderbilt',
    date: '2030-05-18T14:00:00.000Z',
    organizerName: 'Brooklyn Flea',
    imageUrl: 'https://picsum.photos/seed/fort-greene-flea/1200/800',
    category: 'FASHION' as const,
    description:
      'A hundred-plus vendors of vintage clothing, small-run designers, rare books, and weird records. Saturdays only; weather-dependent till May.',
  },

  // ------------------------------- Chicago (new city)
  {
    id: 39,
    name: 'Green Mill Late Jazz Session',
    slug: 'green-mill-late-jazz-session',
    city: 'Chicago',
    location: 'Green Mill Cocktail Lounge',
    date: '2030-06-14T07:00:00.000Z',
    organizerName: 'Green Mill',
    imageUrl: 'https://picsum.photos/seed/green-mill-late-jazz-session/1200/800',
    category: 'MUSIC' as const,
    description:
      'Two-a.m. slot, a working quartet, mostly standards plus one very slow ballad. Booths fill by midnight.\n\nCash preferred, cover rolls to five after one.',
  },
  {
    id: 40,
    name: 'Pilsen Muralists: Open Studios',
    slug: 'pilsen-muralists-open-studios',
    city: 'Chicago',
    location: 'Chicago Arts District',
    date: '2030-09-13T23:00:00.000Z',
    organizerName: 'Second Friday',
    imageUrl: 'https://picsum.photos/seed/pilsen-muralists-open-studios/1200/800',
    category: 'ART' as const,
    description:
      'Every second Friday, eighteen blocks open their studio doors and pour wine badly. Maps at every entrance, prints for sale at most stops.',
  },
  {
    id: 41,
    name: 'Logan Square Pie Contest',
    slug: 'logan-square-pie-contest',
    city: 'Chicago',
    location: 'Logan Square Farmers Market',
    date: '2030-08-31T18:00:00.000Z',
    organizerName: 'Logan Square Chamber of Arts',
    imageUrl: 'https://picsum.photos/seed/logan-square-pie-contest/1200/800',
    category: 'FOOD' as const,
    description:
      'Sixty home bakers, three judges, one giant ribbon. Public tasting starts at two; bring cash for the silent auction.',
  },
  {
    id: 42,
    name: 'iO Improv House Night',
    slug: 'io-improv-house-night',
    city: 'Chicago',
    location: 'iO Theater',
    date: '2030-05-31T02:00:00.000Z',
    organizerName: 'iO Chicago',
    imageUrl: 'https://picsum.photos/seed/io-improv-house-night/1200/800',
    category: 'COMEDY' as const,
    description:
      'The house team, a guest monologist, and a very long Harold. Beer list short; patience for a slow first act required.',
  },
  {
    id: 43,
    name: 'Wicker Park Bookbinding Intensive',
    slug: 'wicker-park-bookbinding-intensive',
    city: 'Chicago',
    location: 'Quimby\'s Bookstore',
    date: '2030-07-12T15:00:00.000Z',
    organizerName: 'Bound Together Studio',
    imageUrl:
      'https://picsum.photos/seed/wicker-park-bookbinding-intensive/1200/800',
    category: 'WORKSHOP' as const,
    description:
      'A Saturday with thread, awl, and signature paper — leave with a pamphlet-stitch notebook and the pattern for a coptic binding. Materials included.',
  },
  {
    id: 44,
    name: 'Lakefront Sunrise Meditation',
    slug: 'lakefront-sunrise-meditation',
    city: 'Chicago',
    location: 'North Avenue Beach',
    date: '2030-06-28T11:00:00.000Z',
    organizerName: 'Chicago Meditation Collective',
    imageUrl: 'https://picsum.photos/seed/lakefront-sunrise-meditation/1200/800',
    category: 'WELLNESS' as const,
    description:
      'Forty minutes seated, twenty walking along the shore. Free, weather-permitting, every other Saturday through September.',
  },
  {
    id: 45,
    name: 'Music Box Doc Fortnight',
    slug: 'music-box-doc-fortnight',
    city: 'Chicago',
    location: 'Music Box Theatre',
    date: '2030-10-05T01:30:00.000Z',
    organizerName: 'Music Box Films',
    imageUrl: 'https://picsum.photos/seed/music-box-doc-fortnight/1200/800',
    category: 'FILM' as const,
    description:
      'Two weeks of new documentaries, most with directors present for Q&A. Opening night: a feature on the last surviving union hall on the south side.',
  },
  {
    id: 46,
    name: 'Midwest AI Salon',
    slug: 'midwest-ai-salon',
    city: 'Chicago',
    location: 'The Bond Chapel, University of Chicago',
    date: '2030-11-15T19:00:00.000Z',
    organizerName: 'Inland Futures',
    imageUrl: 'https://picsum.photos/seed/midwest-ai-salon/1200/800',
    category: 'TECH' as const,
    description:
      'A half-day of short, unhurried talks on machine learning and the public interest. Moderated by a working journalist; no slides on fire.',
  },

  // ------------------------------- Austin (third batch)
  {
    id: 47,
    name: 'East Austin Robotics Demo',
    slug: 'east-austin-robotics-demo',
    city: 'Austin',
    location: 'Canopy East Austin',
    date: '2030-09-28T19:00:00.000Z',
    organizerName: 'Austin Robotics Guild',
    imageUrl: 'https://picsum.photos/seed/east-austin-robotics-demo/1200/800',
    category: 'TECH' as const,
    description:
      'Twelve local teams showing small, weird robots — a chess-playing arm, a plant-watering dog, a thing that folds laundry badly. Kids welcome; questions encouraged.',
  },
  {
    id: 48,
    name: 'Laguna Gloria Moonlight Sculpture Walk',
    slug: 'laguna-gloria-moonlight-sculpture-walk',
    city: 'Austin',
    location: 'The Contemporary Austin — Laguna Gloria',
    date: '2030-06-22T02:00:00.000Z',
    organizerName: 'The Contemporary Austin',
    imageUrl:
      'https://picsum.photos/seed/laguna-gloria-moonlight-sculpture-walk/1200/800',
    category: 'ART' as const,
    description:
      'A guided evening walk through the sculpture garden, lit only by the full moon and a handful of warm lanterns. Wine at the villa after. Advance tickets only.',
  },
  {
    id: 49,
    name: 'The Velveeta Room Sunday Showcase',
    slug: 'the-velveeta-room-sunday-showcase',
    city: 'Austin',
    location: 'The Velveeta Room',
    date: '2030-07-28T03:00:00.000Z',
    organizerName: 'Velveeta Room Productions',
    imageUrl:
      'https://picsum.photos/seed/the-velveeta-room-sunday-showcase/1200/800',
    category: 'COMEDY' as const,
    description:
      'A four-decade-old Sunday tradition — local headliners in a narrow room with low ceilings. Walk-ups welcome but the back rows go first.',
  },
  {
    id: 50,
    name: 'Paramount Summer Classics: Hitchcock Double',
    slug: 'paramount-summer-classics-hitchcock-double',
    city: 'Austin',
    location: 'Paramount Theatre',
    date: '2030-08-10T00:30:00.000Z',
    organizerName: 'Austin Theatre Alliance',
    imageUrl:
      'https://picsum.photos/seed/paramount-summer-classics-hitchcock-double/1200/800',
    category: 'FILM' as const,
    description:
      'Rear Window then Vertigo, both on 35mm, both introduced by film critic Richard Lawson. Intermission long enough for a drink and a breath.',
  },

  // ------------------------------- Seattle (third batch)
  {
    id: 51,
    name: 'Capitol Hill Ramen Crawl',
    slug: 'capitol-hill-ramen-crawl',
    city: 'Seattle',
    location: 'Pike/Pine corridor',
    date: '2030-06-28T01:00:00.000Z',
    organizerName: 'Eater Seattle',
    imageUrl: 'https://picsum.photos/seed/capitol-hill-ramen-crawl/1200/800',
    category: 'FOOD' as const,
    description:
      'Six shops, three hours, one tasting-card. Small bowls, no soup left behind. Start at Kizuki, end at Moto.',
  },
  {
    id: 52,
    name: 'Here-After Comedy Opening Weekend',
    slug: 'here-after-comedy-opening-weekend',
    city: 'Seattle',
    location: 'Here-After',
    date: '2030-10-11T04:30:00.000Z',
    organizerName: 'Here-After Club',
    imageUrl:
      'https://picsum.photos/seed/here-after-comedy-opening-weekend/1200/800',
    category: 'COMEDY' as const,
    description:
      'The first weekend for Seattle\'s newest comedy room — four rotating headliners across Friday and Saturday. Tight sets, intimate room, two drinks.',
  },
  {
    id: 53,
    name: 'Neumos Basement DJ Night',
    slug: 'neumos-basement-dj-night',
    city: 'Seattle',
    location: 'Neumos (Barboza)',
    date: '2030-07-19T05:30:00.000Z',
    organizerName: 'KEXP After Dark',
    imageUrl: 'https://picsum.photos/seed/neumos-basement-dj-night/1200/800',
    category: 'MUSIC' as const,
    description:
      'Three local DJs trading sets till close. Mostly soul, some house, one surprise guest slot. No photos on the floor.',
  },
  {
    id: 54,
    name: 'Georgetown Sample Sale',
    slug: 'georgetown-sample-sale',
    city: 'Seattle',
    location: 'Equinox Studios',
    date: '2030-09-21T16:00:00.000Z',
    organizerName: 'Seattle Made Co-op',
    imageUrl: 'https://picsum.photos/seed/georgetown-sample-sale/1200/800',
    category: 'FASHION' as const,
    description:
      'Nine independent Seattle designers clearing end-of-run and one-of-one pieces. Coffee and cinnamon rolls in the lobby; fitting rooms down the hall.',
  },

  // ------------------------------- New York (third batch)
  {
    id: 55,
    name: 'UCB East Free Improv Jam',
    slug: 'ucb-east-free-improv-jam',
    city: 'New York',
    location: 'UCB East Village',
    date: '2030-06-09T03:30:00.000Z',
    organizerName: 'Upright Citizens Brigade',
    imageUrl: 'https://picsum.photos/seed/ucb-east-free-improv-jam/1200/800',
    category: 'COMEDY' as const,
    description:
      'Monday night walk-ons. Sign up at the door, do five minutes with a house team, leave a better comic than you came. Free.',
  },
  {
    id: 56,
    name: 'Metrograph Late Classics: Agnès Varda',
    slug: 'metrograph-late-classics-agnes-varda',
    city: 'New York',
    location: 'Metrograph',
    date: '2030-11-08T04:00:00.000Z',
    organizerName: 'Metrograph Pictures',
    imageUrl:
      'https://picsum.photos/seed/metrograph-late-classics-agnes-varda/1200/800',
    category: 'FILM' as const,
    description:
      'Cléo from 5 to 7 on 35mm, introduced by critic Amy Taubin. Champagne and something small to eat after the film.',
  },
  {
    id: 57,
    name: 'Prospect Park Sound Bath',
    slug: 'prospect-park-sound-bath',
    city: 'New York',
    location: 'Prospect Park Long Meadow',
    date: '2030-08-04T23:00:00.000Z',
    organizerName: 'Still Hour Studio',
    imageUrl: 'https://picsum.photos/seed/prospect-park-sound-bath/1200/800',
    category: 'WELLNESS' as const,
    description:
      'Ninety minutes of crystal bowls, chimes, and long, held tones as the light dims. Bring a blanket and a water bottle. No phones.',
  },
  {
    id: 58,
    name: 'Brooklyn Code Salon',
    slug: 'brooklyn-code-salon',
    city: 'New York',
    location: 'Recurse Center',
    date: '2030-10-25T23:00:00.000Z',
    organizerName: 'Recurse Center',
    imageUrl: 'https://picsum.photos/seed/brooklyn-code-salon/1200/800',
    category: 'TECH' as const,
    description:
      'An afternoon of short, personal talks from working programmers — things they tried that didn\'t work, and what they learned from the failure. Tea, pastries, no pitches.',
  },
];

async function main() {
  console.log(`Seeding ${events.length} events…`);

  for (const event of events) {
    const result = await prisma.event.upsert({
      where: { id: event.id },
      update: {
        name: event.name,
        slug: event.slug,
        city: event.city,
        location: event.location,
        date: event.date,
        organizerName: event.organizerName,
        imageUrl: event.imageUrl,
        description: event.description,
        category: event.category,
      },
      create: event,
    });
    console.log(`  ✓ ${result.id.toString().padStart(2, '0')}  ${result.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
