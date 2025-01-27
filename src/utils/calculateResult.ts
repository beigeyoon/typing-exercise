const complexJungsungIndex = [9, 10, 11, 14, 15, 16, 19];
const complexJongsungIndex = [3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18];

const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0)); // 588 ( 28 * 21 )
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0)); // 28

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
const HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

const isHangul = (letterCode: number): boolean => {
  return HANGUL_START_CHARCODE <= letterCode && letterCode <= HANGUL_END_CHARCODE;
};

const divideHangul = (letter: string) => {
  const letterCode = letter.charCodeAt(0);
  const charCode = letterCode - HANGUL_START_CHARCODE;
  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
  const jongIndex = charCode % JUNG_PERIOD;

  return {
    choIndex,
    jungIndex,
    jongIndex
  };
};

const calculateTotalChars = (text: string): number => {
  return text.split("").reduce((count, char) => {
    if (!isHangul(char.charCodeAt(0))) return count + 1;
    const { jungIndex, jongIndex } = divideHangul(char);
    // 복합 자음/모음인 경우 2개로 계산
    const isComplexJungsung = complexJungsungIndex.includes(jungIndex);
    const isComplexJongsung = complexJongsungIndex.includes(jongIndex);
    return count + 1 + (isComplexJungsung ? 2 : 1) + (isComplexJongsung ? 2 : jongIndex > 0 ? 1 : 0);
  }, 0);
};

export const calculateResult = ({ currentSentence, inputValue, startTime }: {
  currentSentence: string;
  inputValue: string;
  startTime: number;
}) => {
  const correctChars = currentSentence.slice(0, inputValue.length);
  const matchedChars = correctChars.split("").filter((char, i) => char === inputValue[i]).length;
  const calculatedAccuracy = Math.round((matchedChars / currentSentence.length) * 100);

  const elapsedTime = (Date.now() - startTime!) / 1000 / 60; // 시간(분)
  const totalChars = calculateTotalChars(inputValue); // 입력된 자모 수
  const calculatedCpm = Math.round(totalChars / elapsedTime);

  return {
    accuracy: calculatedAccuracy,
    cpm: calculatedCpm
  };
};