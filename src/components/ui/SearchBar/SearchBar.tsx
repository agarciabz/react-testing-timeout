export interface SearchBarProps {
  onChange: (term: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { onChange } = props;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className="h-16 bg-white border-b-2 flex flex-row px-4 py-2">
      <input
        className="w-full border p-2 rounded-lg xl:w-4/5 xl:mx-auto"
        onInput={handleInput}
        type="search"
        placeholder="Search movie titles"
      ></input>
    </div>
  );
}
