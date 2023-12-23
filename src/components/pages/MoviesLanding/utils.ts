import { ApiResponse, responseIsError } from '../../../api/movies';

export const getNextPageParam = (
  lastPage: ApiResponse,
  pages: ApiResponse[]
) => {
  if (responseIsError(lastPage)) {
    return undefined;
  }
  //const remainingResults = currentResults < lastPage.search.length
  // Current page + 1
  return pages.length + 1;
};
