import { Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import ActiveDevicePage from '../pages/ActiveDevicesPage';
import CatalogPage from '../pages/catalogPage/CatalogPage';
// import DevicePage from 'pages/DevicePage';

// // NOTE: TokenPage is for testing purposes
// import TokenPage from 'pages/TokenPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/active-devices" element={<ActiveDevicePage />} />
        {/* <Route path="/devices" element={<DevicePage />} /> */}
        {/* <Route path="/token-test" element={<TokenPage />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
