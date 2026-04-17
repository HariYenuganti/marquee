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
