import { useMemo } from 'react';
import Head from 'next/head';

import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type fetchImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }): Promise<fetchImagesResponse> {
    if (pageParam) {
      const { data } = await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      });

      return data;
    }
    const { data } = await api.get(`/api/images`);
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Head>
        <title>Upfi</title>
      </Head>

      <Header />

      <Box>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
