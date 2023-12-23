import { useInfiniteQuery, useQuery } from 'react-query';
import {
  Movies,
  getMovies,
  responseIsError,
  searchMovies,
} from '../../../api/movies';
import * as config from '../../../config/api';
import { ErrorResponse } from 'react-router-dom';
import { MovieItem } from '../../ui/MovieItem';
import { SearchBar } from '../../ui/SearchBar';
import { useDebounce } from '../../../hooks/useDebounce';
import { getNextPageParam } from './utils';
import { useEffect, useRef } from 'react';

export function MoviesLanding() {
  const favMoviesIds = config.myFavMovies;
  const [searchTerm, setSearchTerm] = useDebounce<string>(
    '',
    config.DEBOUNCE_TIME
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: favMovies,
    isLoading: favMovieIsLoading,
    isError: favMovieIsError,
  } = useQuery<Movies, ErrorResponse>({
    queryKey: ['movies', favMoviesIds.toString()],
    queryFn: () => getMovies(favMoviesIds),
  });

  const {
    data: infiniteQueryData,
    isLoading: searchIsLoading,
    isError: searchIsError,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', searchTerm],
    queryFn: ({ pageParam = 1 }) => searchMovies(searchTerm ?? '', pageParam),
    enabled: !!searchTerm,
    getNextPageParam: (page, allpagse) => getNextPageParam(page, allpagse),
  });

  const isLoading = favMovieIsLoading || searchIsLoading;
  const isError = favMovieIsError || searchIsError;

  const searchResults: Movies | undefined = infiniteQueryData?.pages?.reduce(
    (acc, page) => {
      const pageMovies = responseIsError(page) ? [] : page?.search;
      return [...acc, ...pageMovies];
    },
    [] as Movies
  );

  /** If search term is empty then display fav movies */
  const movies = searchTerm && searchResults ? searchResults : favMovies;

  useEffect(() => {
    // Setup scroll detection
    const options: IntersectionObserverInit = {
      root: document,
      rootMargin: '20px',
      threshold: 1,
    };
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      if (entries[0].isIntersecting) {
        console.debug('Bottom reached!!');
        if (!isFetching && hasNextPage) {
          fetchNextPage();
        }
      }
    };
    const observer = new IntersectionObserver(callback, options);
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    // Unmount
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="sticky top-0  z-10">
        <SearchBar onChange={setSearchTerm}></SearchBar>
      </div>
      <div
        className="p-4 grid gap-4 grid-cols-2
          md:grid-cols-4 lg:grid-cols-6 xl:w-4/5 xl:mx-auto"
        id="movieList"
      >
        {movies?.map(movie => (
          <MovieItem key={movie.imdbID} movie={movie} loaded={true} />
        ))}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Something went wrong...</div>}
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
}
