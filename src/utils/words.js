export const allPositiveWords = [
    "HOPE", "PEACE", "LOVE", "HAPPY", "SMILE", "FAITH", "BRAVE", "SHINE", "KIND", "GRACE","TRUST", "HEART", "LUCK", "DREAM", "LIGHT", "CALM", "GLOW", "ENERGY", "BLOOM", "JOLLY","BALANCE", "GENTLE", "UNITY", "JOY", "SOUL", "LAUGH", "BREATHE", "FOCUS", "STRONG", "CHARM","BOLD", "PURE", "MOTIVE", "INSPIRE", "CARE", "ZEN", "SERENE","FLOURISH", "HEAL", "SPARK"
];
  
export function getRandomWords(count = 20) {
    const shuffled = [...allPositiveWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
  