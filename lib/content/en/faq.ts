import type { FaqCopy } from '../types';

/**
 * Questions are phrased the way customers type them, including Roman Urdu where that is
 * how the search is actually made (CLAUDE.md §6.3). No answer states a price, a depth or
 * a guarantee, because none of those are confirmed (§0).
 */
export const faq = {
  heading: 'Common questions',
  items: [
    {
      q: 'Pani ki boring kitne feet tak hoti hai?',
      a: 'It depends on how deep the water-bearing layer sits in your area. Tell us your area on WhatsApp and we can talk through the depth that is usual there and what the bore will need.',
    },
    {
      q: 'What does water boring cost?',
      a: 'Boring is charged per foot, and the rate moves with the depth, the pipe size and the ground itself. That is why we do not print a rate here, because it would be wrong for most plots. Send us your area and plot details on WhatsApp for a proper figure.',
    },
    {
      q: 'My bore has stopped giving water. Can it be repaired?',
      a: 'Often it can. Sometimes the water table has dropped and the bore has to go deeper, sometimes the filter is choked, and sometimes the fault is the pump rather than the bore. We check which it is before any work starts.',
    },
    {
      q: 'Plumber chahiye, do you take small repair jobs?',
      a: 'Yes. Pipe leakage, a blocked drain, a tap that will not shut off, or weak water pressure are normal jobs for us.',
    },
    {
      q: 'Which pump should I put on my bore?',
      a: 'It depends on the bore depth and how much water you need. Submersible pumps suit deep bores, donkey pumps suit shallow ones, and a pressure pump fixes weak flow inside the house. Tell us the depth and we will suggest the size.',
    },
    {
      q: 'Do you supply sanitary items as well, or only fit them?',
      a: 'Both. Sanitary ware, tanks, geysers and fittings are available from the shop and we install them. You can also buy the items yourself and have us do only the fitting.',
    },
  ],
} satisfies FaqCopy;
