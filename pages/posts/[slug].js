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
              <h4>{post.title}</h4>
              <h5>
                <time dateTime={post.date}>
                  {
                    moment(post.date).format("Do MMMM YYYY")
                  }
                </time>
              </h5>
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
    },
    ...await serverSideTranslations(locale, ['license', 'nav']),
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
