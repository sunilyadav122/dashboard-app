import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { globalModeSelector } from "state/selectors";
import { themeSettings } from "theme";
import Layout from "scenes/Layout";
import Dashboard from "scenes/Dashboard";
import Products from "scenes/Products";
import Customers from "scenes/Customers";
import Transactions from "scenes/Transactions";
import Geography from "scenes/Geography";
import Overview from "scenes/Overview";
import Daily from "scenes/Daily";
import Monthly from "scenes/Monthly";
import Breakdown from "scenes/Breakdown";
import Admins from "scenes/Admins";

function App() {
  const mode = useSelector(globalModeSelector);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*The Layout is common UI(Navbar & Sidebar) between all the routes*/}
            <Route element={<Layout />}>
              {/* CHILDREN */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admins />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
