/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

export function useSearchParamsToggle<T extends string>(
  array: T[],
  searchKey: string,
  initValue: T = array[0]
): [T, (to?: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams({
    [searchKey]: initValue,
  });
  const [index, setIndex] = useState(0);

  const toggle = useCallback(
    (to?: T) => {
      if (!to) {
        setIndex((p) => {
          if (p + 1 === array.length) {
            return 0;
          } else {
            return p + 1;
          }
        });
        return;
      }

      const nextIndex = array.indexOf(to as never);
      if (nextIndex === -1) {
        console.error(
          `the value of "${to}" is not present in array: ${array}`
        );
      } else {
        setIndex(nextIndex);
      }
    },
    [array]
  );

  useLayoutEffect(() => {
    const searchParamValue = searchParams.get(searchKey);
    if (searchParamValue !== null) {
      toggle(searchParamValue as T);
    } else {
      toggle()
    }
  }, []);

  useEffect(() => {
    setSearchParams({ [searchKey]: array[index] });
  }, [index]);

  return [array[index], toggle];
}
