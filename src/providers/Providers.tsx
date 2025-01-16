import { PropsWithChildren } from "react";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";

export default function Providers({ children }: PropsWithChildren) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
