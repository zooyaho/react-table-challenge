import { PropsWithChildren } from "react";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <RecoilRoot>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </RecoilRoot>
  );
}
