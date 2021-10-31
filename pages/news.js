import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const SEO = dynamic(() => import('../components/SEO'));
import { getAllPosts } from '../lib/api'
import config from '../components/config.json';

const Index = ({ allPosts }) => {
  const { t } = useTranslation('news');

  return allPosts && allPosts.length
    ? allPosts.map(heroPost => {
        return (
          <>
            <SEO
              description={t('header_description')}
              title={t('header_title', {title: config.title})}
              siteTitle={config.title}
            />
            {heroPost && (
              <Paper sx={{p: 2, textAlign: 'left', color: 'text.secondary'}}>
                <div>
                  <h3>
                    <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
                      <a sx={{color: 'text.secondary'}}>{heroPost.title}</a>
                    </Link>
                  </h3>
                  <div>
                    {dayjs(heroPost.date).format("D MMMM YYYY")}
                  </div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">{heroPost.excerpt}</p>
                </div>
              </Paper>
            )}
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
      ...(await serverSideTranslations(locale, ['news', 'nav'])),
    },
  };
}
