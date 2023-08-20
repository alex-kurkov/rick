import React from 'react';
import { MantineProvider, createStyles, BackgroundImage } from '@mantine/core';
import getSchwifty from '../../assets/get-schwifty.ttf';
import bgImage from '../../assets/bg.jpg';

const useStyles = createStyles((theme) => ({
  app: {
    width: '100%',
    height: '100vh',
  },
}));

export function App({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();

  return (
    <MantineProvider
      theme={{
        globalStyles: (_) => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
            margin: 0,
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            color: '#fff'
          },
          '@font-face': {
            fontFamily: 'get-schwifty',
            src: `url('${getSchwifty}') format('truetype')`,
            fontDisplay: 'swap',
            fontWeight: 400,
            fontStyle: 'normal',
          },
        }),
      }}>
      <BackgroundImage src={bgImage} className={classes.app}>{children}</BackgroundImage>
    </MantineProvider>
  );
}
