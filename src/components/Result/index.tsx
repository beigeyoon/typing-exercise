import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

const Result = ({ accuracy, cpmHistory }: { cpmHistory: number[], accuracy: number }) => {
  const currentCpm = useMemo(() => cpmHistory.length > 0 ? cpmHistory[cpmHistory.length - 1] : 0, [cpmHistory]);
  const cpmAverage = useMemo(() => cpmHistory.length > 0 ? cpmHistory.reduce((sum, value) => sum + value, 0) / cpmHistory.length : 0, [cpmHistory]);
  const [bestCpm, setBestCpm] = useState<number>(0);
  const [currentCpmHighlight, setCurrentCpmHighlight] = useState<boolean>(false);
  const [bestCpmHighlight, setBestCpmHighlight] = useState<boolean>(false);

  useEffect(() => {
    if (currentCpm > 0) setCurrentCpmHighlight(true);
    if (currentCpm > bestCpm) {
      setBestCpm(currentCpm);
      setBestCpmHighlight(true);
    }
  }, [currentCpm]);

  return (
    <div className='text-lg w-[156px] ml-auto'>
      <ResultItem name='현재타수' value={currentCpm} unit='타' highlight={currentCpmHighlight} hightlightColor='#707070' onAnimationComplete={() => setCurrentCpmHighlight(false)} />
      {bestCpm > 0 && (
        <ResultItem name='최고타수' value={bestCpm} unit='타' highlight={bestCpmHighlight} hightlightColor='#ff0000' onAnimationComplete={() => setBestCpmHighlight(false)} />
      )}
      {cpmAverage > 0 && (
        <ResultItem name='평균타수' value={Math.round(cpmAverage)} unit='타' />
      )}
      <ResultItem name='정확도' value={accuracy} unit='%' />
    </div>
  )
};

export default Result;

const ResultItem = ({ name, value, unit, highlight, hightlightColor, onAnimationComplete }: { name: string, value: number, unit: string, highlight?: boolean, hightlightColor?: string, onAnimationComplete?: () => void }) => {
  return (
    <div className='flex items-end justify-between gap-2'>
      {name}
      <span className='flex items-end justify-end gap-2'>
        <motion.span
          className='text-2xl font-bold'
          initial={{ color: '#000' }}
          animate={highlight ? { color: hightlightColor } : { color: '#000' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={onAnimationComplete}
        >
          {value}
        </motion.span>
        {unit}
      </span>
    </div>
  )
}