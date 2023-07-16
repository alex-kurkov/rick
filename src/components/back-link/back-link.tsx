import { Link } from 'react-router-dom';
import './back-link.css';
import { FC } from 'react';

type Props = {
  title: string;
}

export const BackLink: FC<Props> = ({title}) => {
  return (
    <Link className="back-link" to=".." relative="path">
      {title}
    </Link>
  );
};
