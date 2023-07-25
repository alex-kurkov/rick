import { FC } from 'react';
import './Loader.css';

type Props = {
  location: 'inline' | 'overlay';
};

export const Loader: FC<Props> = ({ location }) => {
  if (location === 'inline') {
    return <span className="loader" />;
  }

  return (
    <div className="overlay">
      <span className="loader" />
    </div>
  );
};
