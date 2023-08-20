import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import ParentRestaurant from "./components/ParentRestaurant";
import SearchPage from "./components/SearchPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HelpPartnerOnboardingContainer from "./components/HelpPartnerOnboardingContainer";
import HelpLegal from "./components/HelpLegal";
import LoginPage from "./components/LoginPage";
import SearchContainer from "./components/SearchContainer";
import HelpLegalContainer from "./components/HelpLegalContainer";
import CartContainer from "./components/CartContainer";

function App() {
  window.globalPrentUrl = "http://localhost:8090";
  window.publicImagePath = "/images/";
  return (
    <Router>
      <div className="App" style={{scrollbarGutter:"stable"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<ParentRestaurant />} />
          <Route path="/search" element={<SearchContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/help" element={<HelpPartnerOnboardingContainer/>} />
          <Route path="/help/issues/partner-onboarding" element={<HelpPartnerOnboardingContainer /> }/>
          <Route path="/help/issues/legal" element={<HelpLegalContainer /> }/>
          <Route path="/help/issues/FAQ" element={<HelpPartnerOnboardingContainer /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
