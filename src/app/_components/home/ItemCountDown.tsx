'use client';

import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import Counter from '@/app/_components/ui/counter';

export default function CountdownTimer({ date }: { date: Date }) {
  const endDate = new Date(date);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(
    Math.max(differenceInSeconds(endDate, new Date()), 0),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(totalSecondsLeft / (3600 * 24));
  const hours = Math.floor((totalSecondsLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
  const seconds = totalSecondsLeft % 60;

  return (
    <div className="mt-2 flex items-center gap-2">
      {days > 0 && (
        <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xl font-bold">
          <Counter
            value={Number(days)}
            places={[10, 1]}
            fontSize={35}
            padding={5}
            borderRadius={8}
            textColorClass="text-primary bg-background"
            fontWeight={900}
          />
          {Number(days) <= 1 ? 'Day' : 'Days'}
        </div>
      )}
      <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xl font-bold">
        <Counter
          value={Number(hours)}
          places={[10, 1]}
          fontSize={35}
          padding={5}
          borderRadius={8}
          textColorClass="text-primary bg-background"
          fontWeight={900}
        />
        {Number(hours) <= 1 ? 'Hour' : 'Hours'}
      </div>
      <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xl font-bold">
        <Counter
          value={Number(minutes)}
          places={[10, 1]}
          fontSize={35}
          padding={5}
          fontWeight={900}
          borderRadius={8}
          textColorClass="text-primary bg-background"
        />
        {Number(minutes) <= 1 ? 'Minute' : 'Minutes'}
      </div>
      <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xl font-bold">
        <Counter
          value={Number(seconds)}
          places={[10, 1]}
          fontSize={35}
          padding={5}
          borderRadius={8}
          textColorClass="text-primary bg-background"
          fontWeight={900}
        />
        {Number(seconds) <= 1 ? 'Second' : 'Seconds'}
      </div>
    </div>
  );
}
