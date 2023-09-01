import { init } from "@/App.module";
import { useInit } from "@/hooks";
import { RouterProvider } from "@/providers";
import { Fragment } from "react";

export function App() {
  // const navigate = useNavigate();

  useInit({
    init,
  });

  // useNativeAppEvent({
  //   backButton({ canGoBack }) {
  //     if (!initialized || !canGoBack) return;
  //     navigate(-1);
  //   },
  // });

  return (
    <Fragment>
      <RouterProvider />
    </Fragment>
  );
}
