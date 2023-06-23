export const generateId = (): number => {
  // not really random but good enough
  return Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
};

export const formatTime = (timeStr: string): number => {
  const [minutes, seconds] = (timeStr || "").split(":");
  return Number(minutes) * 60 + Number(seconds);
};

export const padNum = (num: string): string => {
  // this could be simplified but i'm adding recursion for fun :D
  const desiredLength = 4;
  const numLength = num.toString().length;

  if (numLength < desiredLength) {
    const pad = new Array(desiredLength - numLength).fill("0").join("");
    return padNum(pad + num.toString());
  } else {
    return `${num.substring(0, 2)}:${num.substring(2, 4)}`;
  }
};
