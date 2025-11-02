import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};
export default App;
