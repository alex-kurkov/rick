import { useState } from 'react';

export function useToggle<T extends string>(
  array: T[]
): [T, (...args: unknown[]) => void] {
  const [index, setIndex] = useState(0);

  const toggle = (...args: unknown[]) => {
    if (args.length === 0) {
      setIndex((p) => {
        if (p + 1 === array.length) {
          return 0;
        } else {
          return p + 1;
        }
      });
      return;
    }

    const nextIndex = array.indexOf(args[0] as never);
    if (nextIndex === -1) {
      console.error(
        `the value of "${args[0]}" is not present in array: ${array}`
      );
    } else {
      setIndex(nextIndex);
    }
  };

  return [array[index], toggle];
}
