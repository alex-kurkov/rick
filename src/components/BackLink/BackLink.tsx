import { Link } from 'react-router-dom';
import { FC } from 'react';
import './BackLink.css';

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
