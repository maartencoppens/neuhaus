export const questions = [
  {
    id: "occasion",
    question: "Voor wie stel je de pralinedoos samen?",
    options: [
      { label: "Voor mezelf", value: "self" },
      { label: "Als cadeau", value: "gift" },
      { label: "Om te delen", value: "sharing" },
    ],
  },
  {
    id: "chocolateType",
    question: "Welke chocolade verkies je?",
    options: [
      { label: "Melk", value: "milk" },
      { label: "Puur", value: "dark" },
      { label: "Wit", value: "white" },
    ],
  },
  {
    id: "flavors",
    question: "Welke smaken spreken je aan?",
    multiple: true,
    options: [
      { label: "Karamel", value: "caramel" },
      { label: "Hazelnoot", value: "hazelnut" },
      { label: "Koffie", value: "coffee" },
      { label: "Vanille", value: "vanilla" },
      { label: "Fruitig", value: "fruity" },
    ],
  },
];

export const tasteTags = {
  chocolateType: ["milk", "dark", "white"],
  flavors: ["caramel", "hazelnut", "coffee", "vanilla", "fruit", "almond"],
  texture: ["crunchy", "creamy", "smooth", "intense"],
  occasion: ["gift", "personal", "sharing"],
};
