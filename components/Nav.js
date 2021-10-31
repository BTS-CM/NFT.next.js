import {useState} from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Link from 'next/link';

const Toolbar = dynamic(() => import('@mui/material/Toolbar'));
const IconButton = dynamic(() => import('@mui/material/IconButton'));
const Drawer = dynamic(() => import('@mui/material/Drawer'));
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'));

const Typography = dynamic(() => import('@mui/material/Typography'));
const Button = dynamic(() => import('@mui/material/Button'));
const List = dynamic(() => import('@mui/material/List'));
const ListItem = dynamic(() => import('@mui/material/ListItem'));
const ListItemText = dynamic(() => import('@mui/material/ListItemText'));
const AppBar = dynamic(() => import('@mui/material/AppBar'));
const Menu = dynamic(() => import('@mui/material/Menu'));

const Brightness5Icon = dynamic(() => import('@mui/icons-material/Brightness5'));
const NightsStayIcon = dynamic(() => import('@mui/icons-material/NightsStay'));
const TranslateIcon = dynamic(() => import('@mui/icons-material/Translate'));
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'));

import MenuItem from '@mui/material/MenuItem';
import CustomLink from './CustomLink';
import { useTheme, useLanguage, useEnvironment } from './states';

const locales = [
  {'language': 'en', 'aka': 'English'},
  {'language': 'da', 'aka': 'Dansk'},
  {'language': 'de', 'aka': 'Deutsche'},
  {'language': 'ee', 'aka': 'Eestlane'},
  {'language': 'es', 'aka': 'Español'},
  {'language': 'th', 'aka': 'ไทย'},
  {'language': 'it', 'aka': 'Italiano'},
  {'language': 'fr', 'aka': 'Français'},
  {'language': 'ko', 'aka': '한국어'},
  {'language': 'pt', 'aka': 'Português'},
  {'language': 'ja', 'aka': '日本語'},
  {'language': 'ru', 'aka': 'русский'}
];

const ITEM_HEIGHT = 48;

export default function Nav(properties) {
  const router = useRouter();

  const { t } = useTranslation('nav');

  const [theme, setTheme] = useTheme('light');
  const [language, setLanguage] = useLanguage();
  const [environment, setEnvironment] = useEnvironment();

  const [drawerToggle, setDrawerToggle] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerToggle(value);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClicked = (language) => {
    setLanguage(language);
    handleClose();
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>

        <IconButton
          onClick={toggleDrawer(true)}
          color="inherit"
          edge="start"
          sx={{mr: 2}}
          aria-label="menu"
          size="large">
          <MenuIcon />
        </IconButton>

        <Drawer anchor='left' open={drawerToggle} onClose={toggleDrawer(false)}>
          <div
            sx={{width: '250px'}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={CustomLink} key={'Home'} href={"/"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link1')} color="textPrimary" />
              </ListItem>
              <ListItem button component={CustomLink} key={'Gallery'} href={"/gallery"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link2')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'Listings'} href={"/listings"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link3')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'Search'} href={"/search"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link4')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'About'} href={"/about"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link5')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'License'} href={"/license"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link6')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'Other Viewers'} href={"/viewers"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link7')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'Settings'} href={"/settings"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link8')} />
              </ListItem>
              <ListItem button component={CustomLink} key={'News'} href={"/news"} locale={language}>
                  <ListItemText sx={{textDecoration: "none", color: 'text.secondary'}} primary={t('link9')} />
              </ListItem>
            </List>
          </div>
        </Drawer>

        <Typography variant="h6" color="inherit" sx={{flexGrow: 1}}>
          <Link href="/" locale={language}>
            <a sx={{textDecoration: "none", color: 'text.secondary'}}>
              {t("header")} {environment && environment === 'staging' ? t("staging"): null}
            </a>
          </Link>
        </Typography>

        <Button
          aria-label="more"
          style={{'marginRight': '5px', 'float': 'right'}}
          aria-controls="long-menu"
          aria-haspopup="true"
          size="small"
          variant="contained"
          onClick={handleClick}
        >
          <TranslateIcon />
        </Button>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {locales.map((option) => (
            <MenuItem component={CustomLink} locale={option.language} href={`${router.asPath}`} key={option.language} selected={option.language === language} onClick={() => { handleClicked(option.language) }}>
              <a sx={{textDecoration: "none", color: 'text.secondary'}}>{option.aka}</a>
            </MenuItem>
          ))}
        </Menu>

        <Button size="small" variant="contained" onClick={() => { theme === 'dark' ? setTheme('light') : setTheme('dark') }}>
          {theme === 'dark' ? <NightsStayIcon /> : <Brightness5Icon />}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
