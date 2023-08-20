import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ErrorBoundary } from '../components/hocs';
import { AppShell, Header, Navbar, Title, Center } from '@mantine/core';

const MainLayout = () => {
  return (
    <AppShell
      header={
        <Header height={200} bg="#1115">
          <Center h={200} maw="80%" m="0 auto">
            <Title
              order={1}
              ff="get-schwifty"
              size="48"
              ta="center"
              color="#fff">
              Rick and Morty React-router educational app
            </Title>
          </Center>
        </Header>
      }
      padding={2}
      navbar={
        <Navbar width={{ base: 240 }} bg="none">
          <Navigation />
        </Navbar>
      }
    >
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </AppShell>
  );
};

export default MainLayout;
