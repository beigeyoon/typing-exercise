import { useMemo, useRef } from "react";
import { useTypingExercise } from "@/utils/useTypingExercise";
import TypingIcon from "@/assets/timer.svg";
import { motion } from "motion/react";
import Result from "@/components/Result";

export default function Short() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    currentSentence,
    accuracy,
    cpmHistory,
    isTyping,
    timeCount,
    errorIndex,
    handleInputChange,
    handleFinish
  } = useTypingExercise(inputRef);

  const renderSentence = useMemo(() => (
    currentSentence.split("").map((char, index) => {
      const isError = errorIndex.includes(index);
      return (
        <span key={index} style={{ color: isError ? "red" : "black" }}>
          {char}
        </span>
      )
    })
  ), [currentSentence, errorIndex]);

  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='flex flex-col gap-3 border-2 p-6 text-2xl leading-none'>
        <div className='flex justify-between relative'>
          <div className='font-bold'>{renderSentence}</div>
          {isTyping && (
            <div className='absolute top-[-58px] right-[-20px] flex items-center justify-between w-[62px]'>
              <span className='text-sm'>{timeCount}</span>
              <motion.img
                src={TypingIcon}
                className='w-[24px]'
                animate={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={currentSentence}
          className='appearance-none focus:outline-none focus:shadow-none placeholder-stone-500'
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFinish();
            }
          }}
          onBlur={() => inputRef.current?.focus()}
        />
      </div>
      <Result cpmHistory={cpmHistory} accuracy={accuracy} />
    </div>
  )
}
