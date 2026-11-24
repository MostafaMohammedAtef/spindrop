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

export type RecordProduct = {
  id: string;
  title: string;
  artist: string;
  image: string;
  background: string;
  priceUsd: number;
};

export const records: RecordProduct[] = [
  { id: 'vinyl-one', title: 'Shravanam', artist: 'Bombay S. Jayashri', image: vinylOne, background: 'bg-palette-02', priceUsd: 24.99 },
  { id: 'vinyl-two', title: 'Black Country Disco', artist: 'Tom Aspaul', image: vinylTwo, background: 'bg-palette-21', priceUsd: 27.99 },
  { id: 'vinyl-three', title: 'CANVAS2033', artist: 'Barny Fletcher', image: vinylThree, background: 'bg-palette-14', priceUsd: 22.99 },
  { id: 'vinyl-four', title: 'HARSH 《殘》', artist: 'Sophy Wong (王嘉儀)', image: vinylFour, background: 'bg-palette-35', priceUsd: 25.99 },
  { id: 'vinyl-five', title: 'Eternal', artist: 'Alnda Radio', image: vinylFive, background: 'bg-palette-31', priceUsd: 29.99 },
  { id: 'vinyl-six', title: 'Vol. 1–5', artist: '4 Dilla', image: vinylSix, background: 'bg-palette-24', priceUsd: 26.99 },
  { id: 'afroto-kebda', title: 'Kebda', artist: 'Afroto', image: afrotoKebda, background: 'bg-palette-11', priceUsd: 21.99 },
  { id: 'bts-swin', title: 'SWIM', artist: 'BTS', image: btsSwin, background: 'bg-palette-25', priceUsd: 28.99 },
  { id: '5sos-youngblood', title: 'Youngblood', artist: '5 Seconds of Summer', image: fiveSOSYoungblood, background: 'bg-palette-13', priceUsd: 23.99 },
  { id: 'drake-die-trying', title: 'Die Trying', artist: 'PARTYNEXTDOOR, Drake & Yebba', image: drakeDieTrying, background: 'bg-palette-33', priceUsd: 30.99 },
  { id: 'essam-sasa-one', title: 'وسط دموع وجراح وخراب', artist: 'Essam Sasa', image: essamSasaOne, background: 'bg-palette-51', priceUsd: 19.99 },
  { id: 'weeknd-starboy', title: 'Starboy', artist: 'The Weeknd', image: weekndStarboy, background: 'bg-palette-48', priceUsd: 31.99 },
  { id: 'olivia-rodrigo-drop-head', title: 'drop dead', artist: 'Olivia Rodrigo', image: oliviaRodrigoDropHead, background: 'bg-palette-39', priceUsd: 27.49 },
  { id: 'moscow-dawly', title: 'Dawly', artist: 'Moscow & EL Waili', image: moscowDawly, background: 'bg-palette-36', priceUsd: 20.99 },
  { id: 'justin-bieber-swag', title: 'Daisies', artist: 'Justin Bieber', image: justinBieberSwag, background: 'bg-palette-30', priceUsd: 32.99 },
  { id: 'houda-bondok-one', title: 'خيبت توقعاتك', artist: 'Houda Bondok', image: houdaBondokOne, background: 'bg-palette-05', priceUsd: 18.99 },
];
