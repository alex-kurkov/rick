import { Suspense, lazy } from "react"
import { Loader, Center } from "@mantine/core"

export const generateLazyComponent = (pageName: string) => {
  const Component = lazy(() =>
    import(`../pages/${pageName}/${pageName}.tsx`).then((module) => ({
      default: module[pageName],
    }))
  );

  return (
    <Suspense
      fallback={
        <Center mx="auto">
          <Loader color="white" size="lg" />
        </Center>
      }>
      <Component />
    </Suspense>
  );
};
