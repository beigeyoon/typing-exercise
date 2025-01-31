import { useEffect, useState } from "react";
import { calculateResult } from "@/utils/calculateResult";
import { sentences } from "@/constants/short";

export const useTypingExercise = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [currentSentence, setCurrentSentence] = useState<string>(sentences[Math.floor(Math.random() * sentences.length)]);
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [cpm, setCpm] = useState<number>(0);
  const [cpmHistory, setCpmHistory] = useState<number[]>([]);
  const [errorIndex, setErrorIndex] = useState<number[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setInputValue(value);
    if (value.length > currentSentence.length) handleFinish();
  };

  const handleFinish = () => {
    const { accuracy, cpm } = calculateResult({
      currentSentence,
      inputValue,
      startTime: startTime!
    });
    setAccuracy(accuracy);
    setCpm(cpm);
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
    cpm,
    cpmHistory,
    isTyping: startTime !== null,
    errorIndex,
    handleInputChange,
    handleFinish,
  };
};