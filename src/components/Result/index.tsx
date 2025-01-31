import Laugh from '@/assets/laugh.svg';
import Meh from '@/assets/meh.svg';
import Angry from '@/assets/angry.svg';
import Gauge from '@/assets/gauge.svg';
import ThumbsUp from '@/assets/thumbs-up.svg';
import { useEffect, useMemo, useState } from 'react';

const Result = ({ accuracy, cpm }: { cpm: number, accuracy: number }) => {
  const [bestCpm, setBestCpm] = useState<number>(0);

  useEffect(() => {
    if (cpm > bestCpm) setBestCpm(cpm);
  }, [cpm]);

  const accuracyIcon = useMemo(() => {
    if (accuracy === 100) return Laugh;
    if (90 <= accuracy && accuracy < 100) return Meh;
    if (accuracy < 90) return Angry;
  }, [accuracy]);

  return (
    <div className='text-lg w-[90px] ml-auto'>
      <div className='flex justify-between'>
        <img src={accuracyIcon} /><span className='text-indigo-500 font-bold'>{accuracy}</span>%
      </div>
      <div className='flex justify-between'>
        <img src={Gauge} /><span className='text-indigo-500 font-bold'>{cpm}</span>타
      </div>
      {bestCpm > 0 && (
        <div className='flex justify-between'>
          <img src={ThumbsUp} /><span className='text-indigo-500 font-bold'>{bestCpm}</span>타
        </div>
      )}
    </div>
  )
};

export default Result;