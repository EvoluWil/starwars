import { GetStaticProps } from 'next';
import { MoviesContainer, MoviesContent } from '@styles/movies.styles';
import { MovieCard } from 'components/data-display/movie-card/movie-card.component';
import { HeaderPageContainer } from 'styles/header-page.styles';
import { momentoPo } from 'data/constants/momento-po.constant';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const PO: React.FC = () => {
  const router = useRouter();
  const handleClick = (index: number) => {
    router.push(`/po/${index}`);
  };
  return (
    <MoviesContainer>
      <HeaderPageContainer>
        <h1>MOMENTO PO... PO... PO...</h1>
      </HeaderPageContainer>
      <MoviesContent>
        {momentoPo?.map((momento, index) => (
          <MovieCard
            key={momento.title}
            movie={momento}
            onClick={() => handleClick(index)}
          />
        ))}
      </MoviesContent>
    </MoviesContainer>
  );
};

export default PO;

export async function getStaticPaths() {
  return {
    paths: [{ params: { index: '0' } }, { params: { index: '1' } }],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['movies', 'common'])),
      pageTitle: 'POMoment'
    }
  };
};
