import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import Layout from '../components/Layout'
import { getAllPosts } from '../lib/api'
import config from '../components/config.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  a: {
    color: theme.palette.text.secondary
  }
}));

const Index = ({ allPosts }) => {
  const classes = useStyles();

  const { t } = useTranslation('news');

  return allPosts && allPosts.length
    ? allPosts.map(heroPost => {
        return (
          <>
            <Layout
              description={t('header_description')}
              title={t('header_title', {title: config.title})}
              siteTitle={config.title}
            >
                {heroPost && (
                  <Paper className={classes.paper}>
                    <div>
                      <h3>
                        <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
                          <a className={classes.a}>{heroPost.title}</a>
                        </Link>
                      </h3>
                      <div>
                        {moment(heroPost.date).format("Do MMMM YYYY")}
                      </div>
                    </div>
                    <div>
                      <p className="text-lg leading-relaxed mb-4">{heroPost.excerpt}</p>
                    </div>
                  </Paper>
                )}
            </Layout>
          </>
        )
      })
    : null;
}

export default Index

export const getStaticProps = async ({locale}) => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ])

  return {
    props: {
      allPosts,
      ...await serverSideTranslations(locale, ['news', 'nav']),
    },
  }
}
