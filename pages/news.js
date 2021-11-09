import dayjs from 'dayjs';
import { Text, Center, Grid, Col, Paper } from '@mantine/core'
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const SEO = dynamic(() => import('../components/SEO'));
import { getAllPosts } from '../lib/api'
import config from '../components/config.json';

const News = ({ allPosts }) => {
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
              <Grid grow>
                <Col span={12} key={"Index featured NFT"}>
                  <Paper padding="md" shadow="xs">
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
                </Col>
              </Grid>
            )}
          </>
        )
      })
    : null;
}

export default News

export const getStaticProps = async ({locale}) => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ])

  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      allPosts,
      ...(await serverSideTranslations(locale, ['news', 'nav'])),
    },
  };
}
