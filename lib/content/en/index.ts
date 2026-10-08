import type { Dictionary } from '../types';
import { about } from './about';
import { common } from './common';
import { contact } from './contact';
import { faq } from './faq';
import { hero } from './hero';
import { meta } from './meta';
import { services } from './services';
import { work } from './work';

const en = { meta, common, hero, services, about, work, contact, faq } satisfies Dictionary;

export default en;
