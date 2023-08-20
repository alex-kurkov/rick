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
import {
  Loader,
  createStyles,
  Flex,
  Title,
  Button,
  ScrollArea,
} from '@mantine/core';

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

const useStyles = createStyles((_) => ({
  link: {
    minHeight: '40px',
    scrollSnapAlign: 'start',
    height: '40px',
    textDecoration: 'none',
    lineHeight: '40px',
    padding: '0 8px',
    flexBasis: 'calc(100% - 4px)',
    backgroundColor: '#1113',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#1118',
    },
  },
}));

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

  const observer = useRef<IntersectionObserver>(null);

  const { classes } = useStyles();

  const nodeInTheEndRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (observer.current) observer.current.disconnect();

      //@ts-ignore
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
    <nav>
      <Flex direction="column" gap="2" mah="calc(100vh - 200px)">
        <Flex mb={2} h={40} mah={40} w="calc(100%-12px)" bg="#1115">
          <Title
            order={2}
            ta="left"
            c="white"
            py={8}
            px={12}
            size="sm"
            fw="bold"
            sx={() => ({
              flexBasis: '50%',
            })}>
            {title}
          </Title>

          <Button
            h={40}
            radius={0}
            c="white"
            uppercase
            variant="filled"
            w="50%"
            ta="right"
            onClick={() => toggleSortOrder()}>
            SORT ORDER: {sortOrder}
          </Button>
        </Flex>

        <ScrollArea h="calc(100vh - 200px - 60px)" type="hover" scrollbarSize={8}>
          <Flex gap={2} direction="column">
            {dataList.map(({ name, id }, index) => {
              if (dataList.length - NTH_LAST_NODE === index) {
                return (
                  <Link
                    ref={nodeInTheEndRef}
                    key={id}
                    className={classes.link}
                    to={String(id)}>
                    {name}
                  </Link>
                );
              } else {
                return (
                  <Link key={id} className={classes.link} to={String(id)}>
                    {name}
                  </Link>
                );
              }
            })}
            {loading && <Loader size="md" color="white" />}
          </Flex>
        </ScrollArea>
      </Flex>
    </nav>
  );
};
