export function parseGoldToMoney(gold) {
  const copper = gold * 100 - Math.floor(gold * 10) * 10;
  const goldMinusCopper = gold - copper / 100;
  const silver = goldMinusCopper * 10 - Math.floor(goldMinusCopper) * 10;

  return { cp: copper, sp: silver, gp: Math.floor(gold) };
}
