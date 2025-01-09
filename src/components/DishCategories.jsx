import adobongPusit from '../assets/dishesPictures/adobongPusit.png';
import batchoyTagalog from '../assets//dishesPictures/batchoyTagalog.png';
import dinuguan from '../assets//dishesPictures/dinuguan.png';
import chickenGinataan from '../assets//dishesPictures/chickenGizzardGinataan.png'
import chickenAdobo from '../assets//dishesPictures/chickenAdobo.png'
import friedChicken from '../assets//dishesPictures/friedChicken.png'
import bulalo from '../assets//dishesPictures/bulalo.png'
import kareKare from '../assets//dishesPictures/kareKare.png'
import beefMechado from '../assets//dishesPictures/beefMechado.png'
import bicolExpress from '../assets//dishesPictures/bicolExpress.png'
import kalderetangManok from '../assets//dishesPictures/kalderetangManok.png'
import batangasKaldereta from '../assets//dishesPictures/batangasKaldereta.png'
import braisePorkBelly from '../assets//dishesPictures/braisePorkBelly.png'
import chickenTinola from '../assets//dishesPictures/chickenTinola.png'

export const dishCategories = [
  {
    title: "Famous Filipino Food",
    dishes: [
      { name: "Adobong Pusit", ingredient: "Seafood", image: adobongPusit },
      { name: "Batchoy Tagalog", ingredient: "Pork", image: batchoyTagalog },
      { name: "Dinuguan", ingredient: "Pork", image: dinuguan },
      { name: "Kalderetang Manok", ingredient: "Pork", image: kalderetangManok },
    ],
  },
  {
    title: "Chicken Dishes",
    dishes: [
      { name: "Chicken Adobo", ingredient: "Chicken", image: chickenAdobo },
      { name: "Chicken Ginataan", ingredient: "Chicken", image: chickenGinataan },
      { name: "Fried Chicken", ingredient: "Chicken", image: friedChicken },
      { name: "Chicken Tinola", ingredient: "Chicken", image: chickenTinola},
    ],
  },
  {
    title: "Pork Dishes",
    dishes: [
      { name: "Braise Pork Belly", ingredient: "Pork", image:  braisePorkBelly},
      { name: "Batchoy Tagalog", ingredient: "Pork", image: batchoyTagalog },
      { name: "Bicol Express", ingredient: "Pork", image: bicolExpress },
      { name: "Dinuguan", ingredient: "Pork", image: dinuguan },
    ],
  },
  {
    title: "Beef Dishes",
    dishes: [
      { name: "Batangas Kaldereta", ingredient: "Beef", image: batangasKaldereta },
      { name: "Beef Mechado", ingredient: "Beef", image: beefMechado },
      { name: "Bulalo", ingredient: "Beef", image: bulalo },
      { name: "Kare Kare", ingredient: "Beef", image: kareKare },
    ],
  },
];
