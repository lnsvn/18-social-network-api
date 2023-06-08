const usernames = [
  "DustyMop",
  "ChildishMothman",
  "StormySpinach",
  "QuietBuzzing",
  "RollingLoud",
  "SoftlyStern",
  "CrunchWrap",
  "GoldNugget",
  "SuperBad",
  "BadApple",
  "LeonardSkynyrd",
  "SereneLiving",
  "ColorCraze",
  "SunFlower",
  "SilverSpoon",
  "UnderControl",
  "LameDuck",
  "UltraSonic",
  "BedHead",
  "TopDog",
  "LoneWolf",
];

const thoughts = [
  '"Go to bed, you\'ll feel better in the morning" is the human version of "Did you turn it off and turn it back on again?"',
  "Even when a balloon is half inflated, it is completely full.",
  "Nothing is on fire. Fire is on things.",
  "How do our brains remember that we forgot something, but we can't remember what that thing was?",
  "Your first birthday is technically your second birthday.",
  "Fire trucks are really water trucks.",
  "Which orange came first : the color, or the fruit?",
  "If tomatoes are fruit, then ketchup is jam.",
  "Muffins are to cupcakes as smoothies are to milkshakes.",
  "Watching a graduation ceremony is like sitting through a movie that's entirely end credits.",
  "Every broken clock tells the correct time twice a day.",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () => `${getRandomArrItem(usernames)}`;

const getRandomThought = () => `${getRandomArrItem(thoughts)}`;

module.exports = { getRandomUser, getRandomThought };
