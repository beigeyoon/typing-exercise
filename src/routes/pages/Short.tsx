import { useEffect, useRef, useState } from "react";
import { sentences } from "@/text/short";
import { calculateResult } from "@/utils/calculateResult";

export default function Short() {
  const [currentSentence, setCurrentSentence] = useState<string>(sentences[Math.floor(Math.random() * sentences.length)]);
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [cpm, setCpm] = useState<number>(0);
  const [errorIndex, setErrorIndex] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length < 2) {
      return;
    }
    const textToCompare = inputValue.slice(0, -1);
    const errors = [];
    for (let i = 0; i < textToCompare.length; i++) {
      if (textToCompare[i] !== currentSentence[i]) {
        errors.push(i);
      }
    };
    setErrorIndex(errors);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    const value = e.target.value;
    const nativeEvent = e.nativeEvent as InputEvent;
    setInputValue(value);
    if (value.length > currentSentence.length || nativeEvent.inputType === "insertLineBreak") {
      handleTestEnd();
    }
  };

  const renderSentence = () => {
    return currentSentence.split("").map((char, index) => {
      const isError = errorIndex.includes(index);
      return (
        <span key={index} style={{ color: isError ? "red" : "black" }}>
          {char}
        </span>
      )
    })
  };

  const handleTestEnd = () => {
    const { accuracy, cpm } = calculateResult({
      currentSentence,
      inputValue,
      startTime: startTime!
    })
    setAccuracy(accuracy);
    setCpm(cpm);
    setCurrentSentence(
      sentences[Math.floor(Math.random() * sentences.length)]
    );
    setInputValue("");
    setStartTime(null);
    setErrorIndex([]);
    inputRef.current?.focus();
  };

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-3 text-2xl'>
        <div>
          {renderSentence()}
        </div>
        <input
          ref={inputRef}
          type="text"
          className='appearance-none caret-black focus:outline-none focus:shadow-none'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTestEnd();
            }
          }}
        />
      </div>
      
      {cpm !== null && accuracy !== null && (
        <div>
          <p>속도: {cpm}타(CPM)</p>
          <p>정확도: {accuracy}%</p>
        </div>
      )}
    </div>
  )
}
