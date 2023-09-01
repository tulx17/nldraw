import { init } from "@/App.module";
import { useInit } from "@/hooks";

export default function App() {
  useInit({
    async init() {
      await init();
    },
  });

  return <>App</>;
}
