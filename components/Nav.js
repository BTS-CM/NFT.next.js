import React, {useState} from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useTheme, useLanguage } from './states';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import TranslateIcon from '@material-ui/icons/Translate';
import TwitterIcon from '@material-ui/icons/Twitter';
import SettingsIcon from '@material-ui/icons/Settings';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import CustomLink from './CustomLink';

const locales = [
  {'language': 'en', 'aka': 'English'},
  {'language': 'da', 'aka': 'Dansk'},
  {'language': 'de', 'aka': 'Deutsche'},
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  a: {
    textDecoration: "none",
    color: theme.palette.text.secondary
  }
}));

export default function Nav(properties) {
  const classes = useStyles();
  const router = useRouter();

  const { t } = useTranslation('nav');

  let environment = properties.environment;

  const [theme, setTheme] = useTheme('light');
  const [language, setLanguage] = useLanguage();

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

          <IconButton onClick={toggleDrawer(true)}  color="inherit" edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Drawer anchor='left' open={drawerToggle} onClose={toggleDrawer(false)}>
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem button component={CustomLink} key={'Home'} href={"/"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link1')} color="textPrimary" />
                </ListItem>
                <ListItem button component={CustomLink} key={'Gallery'} href={"/gallery"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link2')} />
                </ListItem>
                <ListItem button component={CustomLink} key={'Listings'} href={"/listings"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link3')} />
                </ListItem>
                <ListItem button component={CustomLink} key={'Search'} href={"/search"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link4')} />
                </ListItem>
                <ListItem button component={CustomLink} key={'About'} href={"/about"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link5')} />
                </ListItem>
                <ListItem button component={CustomLink} key={'License'} href={"/license"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link6')} />
                </ListItem>
                <ListItem button component={CustomLink} key={'Other Viewers'} href={"/viewers"} locale={language}>
                    <ListItemText className={classes.a} primary={t('link7')} />
                </ListItem>
              </List>
            </div>
          </Drawer>

          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link href="/" locale={language}>
              <a className={classes.a}>
                {t("header")}
              </a>
            </Link>
          </Typography>

          <Button
            style={{'marginRight': '5px', 'float': 'right'}}
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            size="small"
            variant="contained"
            href={"https://twitter.com/NFTEA_Gallery"}
          >
            <TwitterIcon />
          </Button>

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
                <a className={classes.a}>{option.aka}</a>
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
