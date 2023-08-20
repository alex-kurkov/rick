import { FormEventHandler } from 'react';
import { useAuth } from '../../context/authProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { RouterPaths } from '../../router/router-paths';
import { Title, TextInput, Flex, Button, createStyles } from '@mantine/core';

const INPUT_NAME = 'username';

const useStyles = createStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
    width: 'clamp(200px, 50%, 640px)',

    '& label': {
      color: '#fff',
    },
  },
}));

export const LoginPage = () => {
  const { login } = useAuth();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get(INPUT_NAME) as string | null;

    if (!userName || userName.length === 0) return;

    login(userName, () => {
      const toPathname =
        location.state?.from + location.state.search || RouterPaths.MAIN;
      navigate(toPathname, { replace: true });
    });
  };

  return (
    <Flex gap={24} direction="column" align="center">
      <Title order={2}>LOGIN PAGE</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput
          w="100%"
          name={INPUT_NAME}
          placeholder="begin to type smth..."
          label="ENTER NON-EMPTY PHRAZE TO LOGIN"
        />
        <Button w="100%" variant="filled" type="submit">
          LOG IN
        </Button>
      </form>
    </Flex>
  );
};
