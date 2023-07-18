/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

export function useSearchParamsToggle<T extends string>(
  array: T[],
  searchKey: string,
  initValue: T = array[0]
): [T, (...args: unknown[]) => void] {
  const [searchParams, setSearchParams] = useSearchParams({
    [searchKey]: initValue,
  });
  const [index, setIndex] = useState(0);

  const toggle = useCallback(
    (...args: unknown[]) => {
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
    },
    [array]
  );

  useLayoutEffect(() => {
    toggle(searchParams.get(searchKey));
  }, []);

  useEffect(() => {
    setSearchParams({ [searchKey]: array[index] });
  }, [index]);

  return [array[index], toggle];
}
