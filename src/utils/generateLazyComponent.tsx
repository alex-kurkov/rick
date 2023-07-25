import { Suspense, lazy } from "react"
import { Loader } from "../components/Loader"

export const generateLazyComponent = (pageName: string) => {
  const Component = lazy(() =>
    import(`../pages/${pageName}`).then((module) => ({
      default: module[pageName],
    }))
  );

  return (
    <Suspense fallback={<Loader location="overlay" />}>
      <Component />
    </Suspense>
  );
};
