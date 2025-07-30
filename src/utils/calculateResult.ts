import { complexJungsungIndex, complexJongsungIndex, CHO_PERIOD, JUNG_PERIOD, HANGUL_START_CHARCODE, HANGUL_END_CHARCODE } from "@/constants/korean";

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

export const calculateResult = ({ currentSentence, inputValue, startTime, isEnglish = false }: {
  currentSentence: string;
  inputValue: string;
  startTime: number;
  isEnglish?: boolean;
}) => {
  const correctChars = currentSentence.slice(0, inputValue.length);
  const matchedChars = correctChars.split("").filter((char, i) => char === inputValue[i]).length;
  const calculatedAccuracy = Math.round((matchedChars / currentSentence.length) * 100);

  const elapsedTime = (Date.now() - startTime!) / 1000 / 60; // 시간(분)
  
  let calculatedCpm;
  if (isEnglish) {
    // 영어의 경우 CPM(Characters Per Minute) 계산
    const totalChars = inputValue.length;
    calculatedCpm = Math.round(totalChars / elapsedTime);
  } else {
    // 한글의 경우 CPM(Characters Per Minute) 계산
    const totalChars = calculateTotalChars(inputValue);
    calculatedCpm = Math.round(totalChars / elapsedTime);
  }

  return {
    accuracy: calculatedAccuracy,
    cpm: calculatedCpm
  };
};