import { business } from '../business';
import type { AboutCopy } from '../types';

const street = business.address.street.en;
const city = business.address.city.en;

/**
 * TODO(client): the story below describes only what §1.1 of CLAUDE.md already states.
 * It claims no years in business, no project counts and no guarantees. Have the client
 * read and approve it, and have them add anything true that is missing.
 */
export const about = {
  heading: 'About Mian Salamat',
  story: [
    `We are a boring and sanitary house on ${street} in ${city}. We drill water bores, sell and install pumps and motors, and fit bathrooms, kitchens and water lines.`,
    'Most of our work comes from people who need water on a new plot, a bore that has stopped giving water, or a bathroom that has to be fitted before a house is handed over.',
  ],
  processHeading: 'How a water boring job runs',
  process: [
    {
      title: 'Site check',
      detail:
        'We look at the plot, ask about nearby bores, and decide the likely depth and the pipe size the ground needs.',
    },
    {
      title: 'Drilling',
      detail:
        'The rig is set up and drilling runs down through the soil layers until it reaches water-bearing ground.',
    },
    {
      title: 'Pipe and filter fitting',
      detail:
        'Casing pipe goes in with a filter section across the water-bearing layer, and the bore is flushed until it runs clean.',
    },
    {
      title: 'Pump installation',
      detail:
        'The pump or motor is lowered and connected, with the cable, delivery pipe and starter fitted.',
    },
    {
      title: 'Water test and handover',
      detail:
        'We run the pump, check the flow and the water itself, and hand the bore over with everything working.',
    },
  ],
} satisfies AboutCopy;
