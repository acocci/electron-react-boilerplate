import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Header from '../../../src/components/Header/Header';
import { defaultHeaderMenuItems } from '../../../src/components/Header/Header.types';

// TODO: Remove placeholder content
function Layout() {
  return (
    <>
      <Header
        auth
        links={defaultHeaderMenuItems}
        logo={<SettingsIcon />}
        messages
        switchLanguage
        title="application.title"
      />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            mx: 3,
            py: 3,
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
}
export default Layout;
