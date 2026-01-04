import { useEffect, useState } from "react";

const GRID_CONFIG = {
  base: { cols: 4, rows: 6 }, // mobile
  md: { cols: 8, rows: 6 }, // md+
};

export default function useGridSize() {
  const [grid, setGrid] = useState(GRID_CONFIG.base);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const updateGrid = () => {
      setGrid(media.matches ? GRID_CONFIG.md : GRID_CONFIG.base);
    };

    updateGrid();
    media.addEventListener("change", updateGrid);

    return () => media.removeEventListener("change", updateGrid);
  }, []);

  return grid;
}
