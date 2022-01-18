import dayjs from 'dayjs';
import { Text, Center, Grid, Col, Paper } from '@mantine/core'
import Link from 'next/link';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import dynamic from 'next/dynamic';

const SEO = dynamic(() => import('../components/SEO'));
import { getAllPosts } from '../lib/api'
import config from '../components/config.json';

const News = ({ allPosts }) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  /*
    as={`/posts/${heroPost.slug}`}
    href="/posts/[slug]"
  */

  return allPosts && allPosts.length
    ? allPosts.map(heroPost => {
        return (
          <>
            <SEO
              description={t('news.header_description')}
              title={t('news.header_title', {title: config.title})}
              siteTitle={config.title}
              key={'SEO'}
            />
            {heroPost && (
              <Grid grow key={"News overview"}>
                <Col span={12}>
                  <Paper padding="md" shadow="xs">
                    <div>
                      <h3>
                        <Link
                          href={{pathname: `/posts/${heroPost.slug}`, query: query && query.lang ? `lang=${query['lang']}` : `lang=en`}}
                        >
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

  return {
    props: {
      allPosts,
    },
  };
}
