import vinylOne from '../../backend/vinyl-images/vinyl-one.png';
import vinylTwo from '../../backend/vinyl-images/vinyl-two.png';
import vinylThree from '../../backend/vinyl-images/vinyl-three.png';
import vinylFour from '../../backend/vinyl-images/vinyl-four.png';
import vinylFive from '../../backend/vinyl-images/vinyl-five.png';
import vinylSix from '../../backend/vinyl-images/vinyl-six.png';
import afrotoKebda from '../../backend/vinyl-images/afroto-kebda.png';
import btsSwin from '../../backend/vinyl-images/bts-swin.png';
import fiveSOSYoungblood from '../../backend/vinyl-images/5sos-youngblood.png';
import drakeDieTrying from '../../backend/vinyl-images/drake-die-trying.png';
import essamSasaOne from '../../backend/vinyl-images/essam-sasa-one.png';
import weekndStarboy from '../../backend/vinyl-images/weeknd-starboy.png';
import oliviaRodrigoDropHead from '../../backend/vinyl-images/olivia-rodrigo-drop-head.png';
import moscowDawly from '../../backend/vinyl-images/moscow-dawly.png';
import justinBieberSwag from '../../backend/vinyl-images/justin-bieber-swag.png';
import houdaBondokOne from '../../backend/vinyl-images/houda-bondok-one.png';
import akherZapheerBallet from '../../backend/vinyl-images/akher-zapheer-ballet.png';
import akherZapheerBatlasha from '../../backend/vinyl-images/akher-zapheer-batlasha.png';

export type RecordProduct = {
  id: string;
  title: string;
  artists: string[];
  image: string;
  background: string;
  priceUsd: number;
};

export const records: RecordProduct[] = [
  { id: 'vinyl-one', title: 'Shravanam', artists: ['Bombay S. Jayashri'], image: vinylOne, background: 'bg-palette-02', priceUsd: 24.99 },
  { id: 'vinyl-two', title: 'Black Country Disco', artists: ['Tom Aspaul'], image: vinylTwo, background: 'bg-palette-21', priceUsd: 27.99 },
  { id: 'vinyl-three', title: 'CANVAS2033', artists: ['Barny Fletcher'], image: vinylThree, background: 'bg-palette-14', priceUsd: 22.99 },
  { id: 'vinyl-four', title: 'HARSH 《殘》', artists: ['Sophy Wong (王嘉儀)'], image: vinylFour, background: 'bg-palette-35', priceUsd: 25.99 },
  { id: 'vinyl-five', title: 'Eternal', artists: ['Alnda Radio'], image: vinylFive, background: 'bg-palette-31', priceUsd: 29.99 },
  { id: 'vinyl-six', title: 'Vol. 1–5', artists: ['4 Dilla'], image: vinylSix, background: 'bg-palette-24', priceUsd: 26.99 },
  { id: 'afroto-kebda', title: 'Kebda', artists: ['Afroto'], image: afrotoKebda, background: 'bg-palette-11', priceUsd: 21.99 },
  { id: 'bts-swin', title: 'SWIM', artists: ['BTS'], image: btsSwin, background: 'bg-palette-25', priceUsd: 28.99 },
  { id: '5sos-youngblood', title: 'Youngblood', artists: ['5 Seconds of Summer'], image: fiveSOSYoungblood, background: 'bg-palette-13', priceUsd: 23.99 },
  { id: 'drake-die-trying', title: 'Die Trying', artists: ['PARTYNEXTDOOR', 'Drake', 'Yebba'], image: drakeDieTrying, background: 'bg-palette-33', priceUsd: 30.99 },
  { id: 'essam-sasa-one', title: 'وسط دموع وجراح وخراب', artists: ['Essam Sasa'], image: essamSasaOne, background: 'bg-palette-51', priceUsd: 19.99 },
  { id: 'weeknd-starboy', title: 'Starboy', artists: ['The Weeknd'], image: weekndStarboy, background: 'bg-palette-48', priceUsd: 31.99 },
  { id: 'olivia-rodrigo-drop-head', title: 'drop dead', artists: ['Olivia Rodrigo'], image: oliviaRodrigoDropHead, background: 'bg-palette-39', priceUsd: 27.49 },
  { id: 'moscow-dawly', title: 'Dawly', artists: ['Moscow', 'EL Waili'], image: moscowDawly, background: 'bg-palette-36', priceUsd: 20.99 },
  { id: 'justin-bieber-swag', title: 'Daisies', artists: ['Justin Bieber'], image: justinBieberSwag, background: 'bg-palette-30', priceUsd: 32.99 },
  { id: 'houda-bondok-one', title: 'خيبت توقعاتك', artists: ['Houda Bondok'], image: houdaBondokOne, background: 'bg-palette-05', priceUsd: 18.99 },
  { id: 'akher-zapheer-ballet', title: 'Ballet (باليه)', artists: ['Akher Zapheer'], image: akherZapheerBallet, background: 'bg-palette-22', priceUsd: 23.99 },
  { id: 'akher-zapheer-batlasha', title: 'Batlasha (بتلاشى)', artists: ['Akher Zapheer'], image: akherZapheerBatlasha, background: 'bg-palette-14', priceUsd: 21.99 },
];

export function artistSlug(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
