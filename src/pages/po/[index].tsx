import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  MovieDetailContainer,
  MovieDetailHeader
} from '@styles/movie-detail.styles';
import { MovieDetailCard } from 'components/data-display/movie-detail-card/movie-detail-card.component';
import { Presentation } from 'components/data-display/presentation/presentation.component';
import { IconButton } from 'components/interactions/icon-button/icon-button.component';
import { ROMAN } from 'data/constants/roman.constant';
import { momentoPo } from 'data/constants/momento-po.constant';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const PODetail = () => {
  const [started, setStarted] = useState(false);

  const { t } = useTranslation('movieDetail');
  const router = useRouter();

  const index = Number(router.query.index);
  return (
    <>
      {!started && (
        <MovieDetailContainer>
          <MovieDetailHeader>
            <IconButton icon={'fa-arrow-left'} onClick={() => router.back()} />
            <h1>{t('title')}</h1>
          </MovieDetailHeader>

          <MovieDetailCard
            movie={{ ...momentoPo[index], characters: [] }}
            castUrl={momentoPo[index].characters}
            removeCharacters
          />
        </MovieDetailContainer>
      )}
      <div style={{ marginBottom: '32px' }}>
        <Presentation
          onStart={() => setStarted(true)}
          onStop={() => setStarted(false)}
          title={momentoPo[index].title.toUpperCase()}
          episode={`EPISODE ${ROMAN[momentoPo[index].episode_id - 1]}`}
          opening={momentoPo[index].opening_crawl.split('\r\n\r')}
        />
      </div>
    </>
  );
};

export default PODetail;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  try {
    if (!params?.index) {
      throw new Error('Param is required');
    }
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', [
          'movieDetail',
          'common'
        ])),
        pageTitle: momentoPo[Number(params.index)]?.title,
        noTranslate: true
      }
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }
};
