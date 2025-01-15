import { PropsWithChildren } from "react";
import { queryClient } from "@/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function TanstackQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      {children}
    </QueryClientProvider>
  );
}
