import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Paper } from '@mantine/core';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic'

const SEO = dynamic(() => import('../../components/SEO'));

import markdownToHtml from '../../lib/markdownToHtml'
import config from '../../components/config.json';

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return ([
    <SEO
      title={`${post.title} | ${config.title}`}
      description={`${config.title} article about "${post.title}"`}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Paper padding="lg" shadow="lg" withBorder key={'post'}>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article>
            <h2>{post.title}</h2>
            <h3>
              <time dateTime={post.date}>
                {
                  dayjs(post.date).format("D MMMM YYYY")
                }
              </time>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </Paper>
  ]);
}

export async function getStaticProps({ params, locale }) {
  const {getPostBySlug} = (await import('../../lib/api'));

  let post;
  try {
    post = getPostBySlug(params.slug, [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'ogImage',
      'coverImage',
    ]);
  } catch(e) {
    return {
      notFound: true,
    }
  }

  if (!post) {
    return {
      notFound: true,
    }
  }

  const content = await markdownToHtml(post.content || '')
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));
  return {
    props: {
      post: {
        ...post,
        content,
      },
      ...(await serverSideTranslations(locale, ['nav'])),
    },
  };
}

export const getStaticPaths = async ({ locales }) => {
  const {getAllPosts} = (await import('../../lib/api'));
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
      fallback: false //indicates the type of fallback
  }
}
