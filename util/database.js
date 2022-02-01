// Don't copy this readFileSync - you don't need it
// eslint-disable-next-line unicorn/prefer-node-protocol
import { readFileSync } from 'fs';

console.log(readFileSync('./README.md', 'utf-8'));

const animalsDatabase = [
  {
    id: '1',
    name: 'Tiny',
    age: 47,
    type: 'Dragon',
    accessory: 'Monacle',
  },
  {
    id: '2',
    name: 'Pete',
    age: 4,
    type: 'Iguana',
    accessory: 'Top Hat',
  },
  {
    id: '3',
    name: 'Randolph',
    age: 9,
    type: 'Parakeet',
    accessory: 'Ring',
  },
  {
    id: '4',
    name: 'George',
    age: 2,
    type: 'Tiger',
    accessory: 'Gold Chain',
  },
  {
    id: '5',
    name: 'Lila',
    age: 17,
    type: 'Monkey',
    accessory: 'Covid Mask',
  },
  {
    id: '6',
    name: 'Suchi',
    age: 20,
    type: 'Bunny',
    accessory: 'Sword',
  },
  {
    id: '7',
    name: 'Susi',
    age: 28,
    type: 'Wombat',
    accessory: 'Cane',
  },
];

export default animalsDatabase;
