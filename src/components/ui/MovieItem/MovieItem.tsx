import { Movie } from '../../../api/movies';

export interface MovieItemProps {
  movie?: Movie;
  loaded: boolean;
}

export function MovieItem(props: MovieItemProps) {
  const { movie, loaded } = props;

  return loaded && movie ? (
    <div
      className="flex flex-col border rounded shadow
      hover:shadow-xl hover:cursor-pointer
    hover:bg-sky-200 hover:shadow-sky-200 hover:border-sky-200"
    >
      <img
        className="w-full h-64 object-cover"
        alt={movie.title}
        src={movie.poster}
      ></img>
      <div className="p-2">
        <div className="font-semibold">{movie.title}</div>
        <div className="text-slate-500 text-sm">{movie.year}</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col border rounded shadow space-y-2 animate-pulse">
      <div className="w-full h-64 bg-slate-200"></div>
      <div className="p-2 space-y-2">
        <div className="h-4 bg-slate-200"></div>
        <div className="h-4 w-10 bg-slate-200"></div>
      </div>
    </div>
  );
}
