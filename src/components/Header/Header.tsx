/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, ButtonGroup, Link } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

import { flags } from 'components/icons';

import { StyledAppBar } from './Header.styles';
import { HeaderProps } from './Header.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = ({
  auth,
  links,
  logo,
  messages,
  switchLanguage,
  sx,
  title,
  translate = true,
}: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const languages = useMemo(
    () => Object.keys(i18n.services.resourceStore.data),
    [i18n.services.resourceStore.data]
  );

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <StyledAppBar position="static" color="primary" elevation={0} sx={sx}>
        <Toolbar component={Grid} container spacing={2}>
          <Grid xs="auto">{logo && <>{logo}</>}</Grid>
          <Grid xs="auto">
            <Typography
              variant="h1"
              color="inherit"
              noWrap
              // eslint-disable-next-line no-return-assign
              onClick={() => (window.location.href = '/')}
            >
              <Link
                component={RouterLink}
                variant="button"
                color="inherit"
                sx={{
                  mx: 1.5,
                  my: 1,
                  textDecoration: 'none',
                  fontSize: 18,
                  textTransform: 'initial',
                }}
                to={'/'}
              >
                {translate ? t(title) : title}
              </Link>
            </Typography>
          </Grid>
          <Grid xs>
            <Box
              component={'nav'}
              sx={{ alignItems: 'center', display: 'flex' }}
            >
              {links &&
                links.map((item) => (
                  <Link
                    key={item.name}
                    component={RouterLink}
                    variant="button"
                    color="inherit"
                    sx={{ mx: 1.5, my: 1 }}
                    to={item.value}
                  >
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      {item.Icon && (
                        <item.Icon fontSize="small" sx={{ marginRight: 0.5 }} />
                      )}
                      {translate ? t(item.name) : item.name}
                    </Box>
                  </Link>
                ))}
            </Box>
          </Grid>

          {/* TODO: Use message info from redux */}
          {/* {messages && (
            <Grid>
              <BadgeDisplay color="secondary" content={1} />
            </Grid>
          )} */}

          {/* TODO: Use auth to display values or login/logout from redux */}
          {/* {auth && <Grid>Name | Role</Grid>} */}

          <Grid xs="auto">
            {switchLanguage && (
              <ButtonGroup variant="text" color="inherit">
                <>
                  {languages &&
                    languages.map((item) => (
                      <Button key={item} onClick={() => onChangeLanguage(item)}>
                        <>{flags[item]}</>
                      </Button>
                    ))}
                </>
              </ButtonGroup>
            )}
          </Grid>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Header;
