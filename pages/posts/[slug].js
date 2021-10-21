import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import moment from 'moment';

import Layout from '../../components/Layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import config from '../../components/config.json';

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

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  const classes = useStyles();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout
      title={`${post.title} | ${config.title}`}
      description={`${config.title} article about "${post.title}"`}
      siteTitle={config.title}
    >
      <Paper className={classes.paper}>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article>
              <h2>{post.title}</h2>
              <h3>
                <time dateTime={post.date}>
                  {
                    moment(post.date).format("Do MMMM YYYY")
                  }
                </time>
              </h3>
              <div className={classes.markdown}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
      </Paper>
    </Layout>
  )
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
      ...await serverSideTranslations(locale, ['nav']),
    },
  }
}

export const getStaticPaths = async ({ locales }) => {

  const posts = getAllPosts(['slug'])

  let postParams = posts.map(post => ({params: {slug: post.slug}}));
  let paths = [];

  for (let i = 0; i < postParams.length; i++) {
    const currentPost = postParams[i];

    paths.push(
      ...locales.map(locale => ({...currentPost, locale: locale}))
    )
  }

  return {
      paths: paths, //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}
