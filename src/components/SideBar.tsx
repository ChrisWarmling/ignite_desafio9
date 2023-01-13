import { useMemo, useCallback, memo } from "react";
import { Button } from "./Button";

interface SideBarProps {
  genres: Array<{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

export function SideBarComponent({
  genres,
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {

  const filteredGenres = useMemo(() => {
    return genres.filter(genre => genre.id === selectedGenreId);
  }, [genres, selectedGenreId]);

  const handleButtonClick = useCallback((genreId) => {
    buttonClickCallback(genreId);
  }, [buttonClickCallback]);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {filteredGenres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleButtonClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}
export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});