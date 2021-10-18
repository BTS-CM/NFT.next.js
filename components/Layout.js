// components/Layout.js
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Head from 'next/head'
import { useTheme, useLanguage } from './states';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from "./Nav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

function Layout({ description, title, siteTitle, imageURL, children }) {
  const classes = useStyles();

  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLanguage();

  const themeMemo = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: theme,
        },
      }),
    [theme],
  );

  return (
    <>
      <html lang="en">
        <Head>
          <title>{`${title} | ${siteTitle}`}</title>
          <meta name="description" content={description} />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="./favicon.ico" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
          <meta charSet="utf-8" />
          <meta httpEquiv="content-language" content={language ? language : 'en'} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={siteTitle} />
          <meta property="twitter:card" content="summary" key="twcard" />
          <meta property="twitter:title" content={title} />
          <meta name="twitter:site" content="@NFTEA_Gallery" />
          <meta name="twitter:creator" content="@NFTEA_Gallery" />
          <meta property="twitter:description" content={description} />
          <meta name="twitter:image" content={imageURL} />
          <meta property="og:image" content={imageURL} />
        </Head>
        <body>
          <ThemeProvider theme={themeMemo}>
            <CssBaseline/>
            <div className={classes.root}>
              <Container maxWidth="lg">
                <Grid container spacing={4}>

                  <Grid item xs={12}>
                    <Nav />
                  </Grid>

                  <Grid item xs={12}>
                    <main>{children}</main>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

export default Layout;
