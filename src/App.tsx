import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes as Switch, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Loader from "./components/loader";
import Login from "./pages/login";
import Page404 from "./pages/page404";
import Register from "./pages/register";
import { goodToken } from "./services/token";

const Public = ({ component: Component }: { component: React.FC }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const router = useNavigate();

  useEffect(() => {
    window && window.scrollTo(0, 0);
    const auth = async () => {
      const isGood = await goodToken();
      setLoading(false)
      if (isGood) {
        router("/");
      }
    };
    auth();
  }, [location, router]);

  return loading ? <Loader /> : <Component />
}

const Private = ({ component: Component }: { component: React.FC }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window && window.scrollTo(0, 0);
    const auth = async () => {
      setLoading(true);
      const isGood = await goodToken();
      if (isGood) {
        setError(false)
      } else {
        setError(true)
      }
      setLoading(false)
    }
    auth();

  }, [location]);

  return loading ? <Loader /> : error ? <Navigate to="/login" /> : <Component />;
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" element={<Public component={Register} />} />
        <Route path="/login" element={<Public component={Login} />} />
        <Route path="/*" element={<Private component={Dashboard} />} />
        <Route path="/*" element={<Public component={Page404} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;