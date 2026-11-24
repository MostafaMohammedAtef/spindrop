import vinylOne from '../assets/vinyl-one.png';
import vinylTwo from '../assets/vinyl-two.png';
import vinylThree from '../assets/vinyl-three.png';
import vinylFour from '../assets/vinyl-four.png';
import vinylFive from '../assets/vinyl-five.png';
import vinylSix from '../assets/vinyl-six.png';
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
};

export const records: RecordProduct[] = [
  { id: 'vinyl-one', title: 'Untitled Release 01', artist: 'Artist unknown', image: vinylOne, background: 'bg-palette-02' },
  { id: 'vinyl-two', title: 'Black Country Disco', artist: 'Artist unknown', image: vinylTwo, background: 'bg-palette-21' },
  { id: 'vinyl-three', title: 'Untitled Release 03', artist: 'Barny Fletcher', image: vinylThree, background: 'bg-palette-14' },
  { id: 'vinyl-four', title: 'Untitled Release 04', artist: 'Artist unknown', image: vinylFour, background: 'bg-palette-35' },
  { id: 'vinyl-five', title: 'Eternal', artist: 'Alnda Radio', image: vinylFive, background: 'bg-palette-31' },
  { id: 'vinyl-six', title: 'Vol. 1–5', artist: '4 Dilla', image: vinylSix, background: 'bg-palette-24' },
  { id: 'afroto-kebda', title: 'Kebda', artist: 'Afroto', image: afrotoKebda, background: 'bg-palette-11' },
  { id: 'bts-swin', title: 'Swin', artist: 'BTS', image: btsSwin, background: 'bg-palette-25' },
  { id: '5sos-youngblood', title: 'Youngblood', artist: '5 Seconds of Summer', image: fiveSOSYoungblood, background: 'bg-palette-13' },
  { id: 'drake-die-trying', title: 'Die Trying', artist: 'Drake', image: drakeDieTrying, background: 'bg-palette-33' },
  { id: 'essam-sasa-one', title: 'One', artist: 'Essam Sasa', image: essamSasaOne, background: 'bg-palette-51' },
  { id: 'weeknd-starboy', title: 'Starboy', artist: 'The Weeknd', image: weekndStarboy, background: 'bg-palette-48' },
  { id: 'olivia-rodrigo-drop-head', title: 'Drop Head', artist: 'Olivia Rodrigo', image: oliviaRodrigoDropHead, background: 'bg-palette-39' },
  { id: 'moscow-dawly', title: 'Dawly', artist: 'Moscow', image: moscowDawly, background: 'bg-palette-36' },
  { id: 'justin-bieber-swag', title: 'SWAG', artist: 'Justin Bieber', image: justinBieberSwag, background: 'bg-palette-30' },
  { id: 'houda-bondok-one', title: 'One', artist: 'Houda Bondok', image: houdaBondokOne, background: 'bg-palette-05' },
];
