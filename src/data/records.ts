import vinylOne from '../assets/vinyls/vinyl-one.webp';
import vinylTwo from '../assets/vinyls/vinyl-two.webp';
import vinylThree from '../assets/vinyls/vinyl-three.webp';
import vinylFour from '../assets/vinyls/vinyl-four.webp';
import vinylFive from '../assets/vinyls/vinyl-five.webp';
import vinylSix from '../assets/vinyls/vinyl-six.webp';
import afrotoKebda from '../assets/vinyls/afroto-kebda.webp';
import btsSwin from '../assets/vinyls/bts-swin.webp';
import fiveSOSYoungblood from '../assets/vinyls/5sos-youngblood.webp';
import drakeDieTrying from '../assets/vinyls/drake-die-trying.webp';
import essamSasaOne from '../assets/vinyls/essam-sasa-one.webp';
import weekndStarboy from '../assets/vinyls/weeknd-starboy.webp';
import oliviaRodrigoDropHead from '../assets/vinyls/olivia-rodrigo-drop-head.webp';
import moscowDawly from '../assets/vinyls/moscow-dawly.webp';
import justinBieberSwag from '../assets/vinyls/justin-bieber-swag.webp';
import houdaBondokOne from '../assets/vinyls/houda-bondok-one.webp';
import akherZapheerBallet from '../assets/vinyls/akher-zapheer-ballet.webp';
import akherZapheerBatlasha from '../assets/vinyls/akher-zapheer-batlasha.webp';

export type RecordProduct = {
  id: string;
  title: string;
  artists: string[];
  image: string;
  background: string;
  priceUsd: number;
  genre: string;
  spotifyUrl?: string;
};

export const records: RecordProduct[] = [
  { id: 'vinyl-one', title: 'Shravanam', artists: ['Bombay S. Jayashri'], image: vinylOne, background: 'bg-palette-02', priceUsd: 24.99, genre: 'Carnatic' },
  { id: 'vinyl-two', title: 'Black Country Disco', artists: ['Tom Aspaul'], image: vinylTwo, background: 'bg-palette-21', priceUsd: 27.99, genre: 'Disco' },
  { id: 'vinyl-three', title: 'CANVAS2033', artists: ['Barny Fletcher'], image: vinylThree, background: 'bg-palette-14', priceUsd: 22.99, genre: 'Hip-hop' },
  { id: 'vinyl-four', title: 'HARSH 《殘》', artists: ['Sophy Wong (王嘉儀)'], image: vinylFour, background: 'bg-palette-35', priceUsd: 25.99, genre: 'Alternative' },
  { id: 'vinyl-five', title: 'Eternal', artists: ['Alnda Radio'], image: vinylFive, background: 'bg-palette-31', priceUsd: 29.99, genre: 'Electronic' },
  { id: 'vinyl-six', title: 'Vol. 1–5', artists: ['4 Dilla'], image: vinylSix, background: 'bg-palette-24', priceUsd: 26.99, genre: 'Hip-hop' },
  { id: 'afroto-kebda', title: 'Kebda', artists: ['Afroto'], image: afrotoKebda, background: 'bg-palette-11', priceUsd: 21.99, genre: 'Hip-hop' },
  { id: 'bts-swin', title: 'SWIM', artists: ['BTS'], image: btsSwin, background: 'bg-palette-25', priceUsd: 28.99, genre: 'Pop' },
  { id: '5sos-youngblood', title: 'Youngblood', artists: ['5 Seconds of Summer'], image: fiveSOSYoungblood, background: 'bg-palette-13', priceUsd: 23.99, genre: 'Pop rock' },
  { id: 'drake-die-trying', title: 'Die Trying', artists: ['PARTYNEXTDOOR', 'Drake', 'Yebba'], image: drakeDieTrying, background: 'bg-palette-33', priceUsd: 30.99, genre: 'R&B' },
  { id: 'essam-sasa-one', title: 'وسط دموع وجراح وخراب', artists: ['Essam Sasa'], image: essamSasaOne, background: 'bg-palette-51', priceUsd: 19.99, genre: 'Shaabi' },
  { id: 'weeknd-starboy', title: 'Starboy', artists: ['The Weeknd'], image: weekndStarboy, background: 'bg-palette-48', priceUsd: 31.99, genre: 'R&B' },
  { id: 'olivia-rodrigo-drop-head', title: 'drop dead', artists: ['Olivia Rodrigo'], image: oliviaRodrigoDropHead, background: 'bg-palette-39', priceUsd: 27.49, genre: 'Pop rock' },
  { id: 'moscow-dawly', title: 'Dawly', artists: ['Moscow', 'EL Waili'], image: moscowDawly, background: 'bg-palette-36', priceUsd: 20.99, genre: 'Electronic' },
  { id: 'justin-bieber-swag', title: 'Daisies', artists: ['Justin Bieber'], image: justinBieberSwag, background: 'bg-palette-30', priceUsd: 32.99, genre: 'Pop' },
  { id: 'houda-bondok-one', title: 'خيبت توقعاتك', artists: ['Houda Bondok'], image: houdaBondokOne, background: 'bg-palette-05', priceUsd: 18.99, genre: 'Arabic pop' },
  { id: 'akher-zapheer-ballet', title: 'Ballet (باليه)', artists: ['Akher Zapheer'], image: akherZapheerBallet, background: 'bg-palette-22', priceUsd: 23.99, genre: 'Alternative' },
  { id: 'akher-zapheer-batlasha', title: 'Batlasha (بتلاشى)', artists: ['Akher Zapheer'], image: akherZapheerBatlasha, background: 'bg-palette-14', priceUsd: 21.99, genre: 'Alternative' },
];

export function artistSlug(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
