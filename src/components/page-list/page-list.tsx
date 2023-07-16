/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './page-list.css';
import { useToggle } from '../../utils/useToggle';
import { sortByNameComparator } from '../../utils/sort-by-name-comparator';

type NameAndIdObject = {
  name: string;
  id: number;
};

type Props = {
  title: string;
  list: NameAndIdObject[];
};

type SortOrder = 'asc' | 'desc' | 'misc';

export const PageList: FC<Props> = ({ list, title }) => {
  const [searchParams, setSearchParams] = useSearchParams({sort: 'misc'});
  const [sortOrder, toggleSortOrder] = useToggle<SortOrder>([
    'misc',
    'asc',
    'desc',
  ]);
  const [dataList, setDataList] = useState(list);

  useEffect(() => {
    toggleSortOrder(searchParams.get('sort'))
  }, [])

  useEffect(() => {
    setSearchParams({ sort: sortOrder });
  }, [sortOrder, setSearchParams]);

  useEffect(() => {
    let sorted;
    if (sortOrder === 'misc') {
      sorted = [...list];
    } else {
      sorted = [...dataList].sort((a, b) =>
        sortByNameComparator(a, b, sortOrder)
      ) as NameAndIdObject[];
    }
    setDataList(sorted);

  }, [sortOrder]);

  return (
    <nav>
      <div className="page-list__title-sort-wrap">
        <h2 className="page-list__title">{title}</h2>
        <button
          className="page-list__sort-button"
          onClick={() => toggleSortOrder()}>
          SORT ORDER: {sortOrder.toUpperCase()}
        </button>
      </div>
      <ul className="page-list__content">
        {dataList.map(({ name, id }) => (
          <li key={id} className="page-list__list-item">
            <Link className="page-list__link" to={String(id)}>
              <h3 className="page-list__card-name">{name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
