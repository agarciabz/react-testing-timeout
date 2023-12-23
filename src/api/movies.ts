import { API_URL } from '../config/api';

export interface SearchResponse {
  search: Movies; // Movies
  totalResults: number;
  response: boolean;
}

export interface ErrorResponse {
  message: string;
}

interface MovieDBResponse {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

export interface Movie {
  poster: string;
  title: string;
  year: string;
  imdbID: string;
}

export type Movies = Movie[];

export type ApiResponse = SearchResponse | ErrorResponse;

export const responseIsError = (res: ApiResponse): res is ErrorResponse =>
  Object.prototype.hasOwnProperty.call(res, 'message');

const mapMovie: (data: MovieDBResponse) => Movie = data => ({
  imdbID: data.imdbID,
  poster: data.Poster === 'N/A' ? '' : data.Poster,
  title: data.Title,
  year: data.Year,
});

export const getMovie = (id: string) =>
  fetch(`${API_URL}&i=${id}`)
    .then(data => data.json())
    .then(mapMovie);

export const getMovies = (ids: string[]) => Promise.all(ids.map(getMovie));

export const searchMovies = async (
  term: string,
  page: number
): Promise<ApiResponse> => {
  try {
    const data = await fetch(`${API_URL}&s=${term}&type=movie&page=${page}`);
    const res = await data.json();
    return {
      response: res.Response,
      search: (res.Search || []).map(mapMovie),
      totalResults: res.totalResults || 0,
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'Service unavailable',
    };
  }
};
