import LoginScreen from "@/components/LoginScreen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const BASE_URL = "http://localhost:4000/api/"
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <LoginScreen />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;