type T = {
  name: string;
};

type SortOrder = 'asc' | 'desc' | 'misc';

export const sortByNameComparator = (
  a: T,
  b: T,
  sortOrder: SortOrder
): -1 | 0 | 1 => {
  switch (sortOrder) {
    case 'asc':
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;

    case 'desc':
      if (a.name > b.name) {
        return -1;
      } else if (a.name < b.name) {
        return 1;
      }
      return 0;

    default:
      return 0;
  }
};
