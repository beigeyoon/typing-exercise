import { useEffect, useMemo, useRef, useState } from "react";
import { calculateResult } from "@/utils/calculateResult";
import { sentences } from "@/constants/short";

export const useTypingExercise = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [currentSentence, setCurrentSentence] = useState<string>(sentences[Math.floor(Math.random() * sentences.length)]);
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [cpmHistory, setCpmHistory] = useState<number[]>([]);
  const [errorIndex, setErrorIndex] = useState<number[]>([]);
  const [timeCount, setTimeCount] = useState<number>(0);
  const timerRef = useRef(0);
  
  useEffect(() => {
    if (inputRef.current) inputRef.current?.focus();
  }, [currentSentence]);

  useEffect(() => {
    const inputValue = inputRef.current?.value || "";
    if (inputValue.length === 0) setErrorIndex([]);
    if (inputValue.length < 2) return;

    const textToCompare = inputValue.slice(0, -1);
    const errors: number[] = [];
    for (let i = 0; i < textToCompare.length; i++) {
      if (textToCompare[i] !== currentSentence[i]) {
        errors.push(i);
      };
    };
    setErrorIndex(errors);
  }, [inputValue]);

  const isTyping = useMemo(() => startTime !== null, [startTime]);

  useEffect(() => {
    if (isTyping) {
      timerRef.current = setInterval(() => {
        setTimeCount((prev) => parseFloat((prev + 0.01).toFixed(3)));
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = 0;
        setTimeCount(0);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setInputValue(value);
    if (value.length > currentSentence.length && accuracy >= 50) handleFinish();
  };

  const handleFinish = () => {
    const { accuracy, cpm } = calculateResult({
      currentSentence,
      inputValue,
      startTime: startTime!
    });
    setAccuracy(accuracy);
    setCpmHistory((prev) => [...prev, cpm]);
    setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
    setStartTime(null);
    setErrorIndex([]);
  };

  return {
    currentSentence,
    accuracy,
    cpmHistory,
    isTyping,
    timeCount,
    errorIndex,
    handleInputChange,
    handleFinish,
  };
};