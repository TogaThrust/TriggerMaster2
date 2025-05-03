import { SignedIn, SignedOut, RedirectToSignIn, SignInButton } from '@clerk/clerk-react';

import { BrowserRouter, Routes, Route } from "react-router";

import LoginScreen from './components/LoginScreen';

export const BASE_URL = "http://localhost:4000/api/" 

function App() {
  return (
        <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={
          <SignInButton>
            Sign In
          </SignInButton>
        } />

        {/* Protected route */}
        <Route
          path="/main"
          element={
            <>
              <SignedIn>
                <LoginScreen />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{/* <Box textAlign="center" py={10} px={6}>
<Heading as="h1" size="2xl" mb={4}>
  Welcome to My App
</Heading>
<Text fontSize="xl" mb={8}>
  This is the main page of the application.
</Text>

</Box> */}
