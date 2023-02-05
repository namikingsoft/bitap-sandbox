const maxBit = 32; // NOTE: bit operation limit is 32 on node
const initMask = 0b1 << (maxBit - 1);

interface Pattern {
  accept: number;
  byChar: Record<string, number>;
}

const initPattern = (text: string): Pattern =>
  [...text].reduce(({ accept, byChar }, ch) => {
    byChar[ch] |= accept;
    return {
      accept: accept >>> 1,
      byChar,
    };
  }, {
    accept: initMask,
    byChar: {},
  } as Pattern);

const calcState = (
  { byChar }: Pattern,
  search: string,
  ambiguous: number,
): number[] => {
  const initState: number[] = [initMask, ...Array(ambiguous)].map((x) =>
    x ?? 0
  );
  return [...search].reduce((state, ch) => {
    const mask = byChar[ch];
    for (let i = state.length - 1; i >= 0; i--) {
      state[i] = ((state[i] & mask) >>> 1) |
        (state[i - 1] >>> 1) | (state[i - 1] ?? 0);
    }
    for (let i = 1; i < state.length; i++) {
      state[i] |= state[i - 1] >>> 1;
    }
    return state;
  }, initState);
};

export const search = (
  text: string,
  search: string,
  ambiguous: number,
): boolean => {
  console.debug("---", text, search, ambiguous);
  const pattern = initPattern(text);
  Object.keys(pattern.byChar).forEach((ch) => {
    console.debug(ch);
    console.debug(pattern.byChar[ch].toString(2).padStart(maxBit, "0"));
  });
  console.debug("accept");
  console.debug(pattern.accept.toString(2).padStart(maxBit, "0"));
  const state = calcState(pattern, search, ambiguous);
  console.debug("state");
  state.forEach((x) => console.debug(x.toString(2).padStart(maxBit, "0")));
  return Boolean(state[ambiguous] & pattern.accept);
};
