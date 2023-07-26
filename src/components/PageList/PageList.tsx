import {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { sortByNameComparator } from '../../utils/sortByNameComparator';
import { useSearchParamsToggle } from '../../utils/useSearchParamsToggle';
import './PageList.css';
import { Loader } from '../Loader';

const NTH_LAST_NODE = 1;

type NameAndIdObject = {
  name: string;
  id: number;
};

type Props = {
  title: string;
  list: NameAndIdObject[];
  setPage?: Dispatch<SetStateAction<number | null>>;
  loading: boolean;
};

type SortOrder = 'asc' | 'desc' | 'misc';

export const PageList: FC<Props> = ({
  list,
  title,
  setPage = () => {},
  loading,
}) => {
  const [sortOrder, toggleSortOrder] = useSearchParamsToggle<SortOrder>(
    ['misc', 'asc', 'desc'],
    'sort',
    'misc'
  );
  const [dataList, setDataList] = useState(list);

  const observer = useRef<IntersectionObserver>();

  const nodeInTheEndRef = useCallback(
    (node: HTMLLIElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => (p ? p + 1 : null));
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [setPage]
  );

  useEffect(() => {
    let sorted;
    if (sortOrder === 'misc') {
      sorted = [...list];
    } else {
      sorted = [...list].sort((a, b) =>
        sortByNameComparator(a, b, sortOrder)
      ) as NameAndIdObject[];
    }
    setDataList(sorted);
  }, [sortOrder, list]);

  return (
    <nav className='page-list'>
      <div className="page-list__title-sort-wrap">
        <h2 className="page-list__title">{title}</h2>
        <button
          className="page-list__sort-button"
          onClick={() => toggleSortOrder()}>
          SORT ORDER: {sortOrder.toUpperCase()}
        </button>
      </div>
      <ul className="page-list__content">
        {dataList.map(({ name, id }, index) => {
          if (dataList.length - NTH_LAST_NODE === index) {
            return (
              <li
                key={id}
                ref={nodeInTheEndRef}
                className="page-list__list-item">
                <Link className="page-list__link" to={String(id)}>
                  <h3 className="page-list__card-name">{name}</h3>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={id} className="page-list__list-item">
                <Link className="page-list__link" to={String(id)}>
                  <h3 className="page-list__card-name">{name}</h3>
                </Link>
              </li>
            );
          }
        })}
        {loading && (
          <li className="page-list__list-item page-list__list-item_type_loader">
            <Loader location="inline" />
          </li>
        )}
      </ul>
    </nav>
  );
};
