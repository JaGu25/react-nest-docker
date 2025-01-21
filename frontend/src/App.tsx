import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { ErrorProvider } from "@/shared/providers/ErrorProvider";
import { router } from "@/routes";
import { Toaster } from "@/shared/components/shadcn/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider storageKey="ui-theme" defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <ErrorProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ErrorProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
