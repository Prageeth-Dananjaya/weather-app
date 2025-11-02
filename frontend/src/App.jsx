import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Routes>
          <Route path="/" />
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};
export default App;
