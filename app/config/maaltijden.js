export const ontbijt = [
  { id: 1, title: "Omelet", calorieën: 150 },
  { id: 2, title: "Broodje kaas", calorieën: 180 },
  { id: 3, title: "Havermout", calorieën: 310 },
  { id: 4, title: "Volkoren brood", calorieën: 120 },
  { id: 5, title: "Muesli", calorieën: 150 },
  { id: 6, title: "Yoghurt", calorieën: 90 },
  { id: 7, title: "Melk", calorieën: 70 },
  { id: 8, title: "Koffie", calorieën: 50 },
];

export const lunch = [
  { id: 1, title: "Broodje gezond", calorieën: 180 },
  { id: 2, title: "Fruitmix", calorieën: 150 },
  { id: 3, title: "Avocado", calorieën: 120 },
];

export const avondeten = [
  { id: 1, title: "Pasta", calorieën: 410 },
  { id: 2, title: "Rijst", calorieën: 170 },
  { id: 3, title: "Kip", calorieën: 220 },
];

export const maaltijden = [
  {
    id: 1,
    title: "Ontbijt",
    description: "Ontbijt",
    image: require("../assets/ontbijt.png"),
    data: ontbijt,
  },
  {
    id: 2,
    title: "Lunch",
    description: "Lunch",
    image: require("../assets/lunch.png"),
    data: lunch,
  },
  {
    id: 3,
    title: "Avondeten",
    description: "Avondeten",
    image: require("../assets/avondeten.png"),
    data: avondeten,
  },
];
