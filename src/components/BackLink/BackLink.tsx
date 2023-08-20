import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, createStyles } from '@mantine/core';

type Props = {
  title: string;
};

const useStyles = createStyles((_) => ({
  link: {
    backgroundColor: '#1115',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#1119',
    },
  },
}));

export const BackLink: FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <NavLink
      component="a"
      className={useStyles().classes.link}
      label={title}
      variant="filled"
      mb={2}
      h={40}
      onClick={() =>
        navigate('..', {
          relative: 'path',
        })
      }
    />
  );
};
