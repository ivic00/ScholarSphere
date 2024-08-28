import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
type SortByButtonsProps = {
  sortState: number;
  setSortState: React.Dispatch<React.SetStateAction<number>>;
};
function SortByButtons({ setSortState, sortState }: SortByButtonsProps) {
  const buttons = [
    <ToggleButton
      key="0"
      value={0}
      color="primary"
      size="small"
      onClick={() => {
        setSortState(0);
      }}
    >
      Latest
    </ToggleButton>,
    <ToggleButton
      key="1"
      value={1}
      size="small"
      color="primary"
      onClick={() => {
        setSortState(1);
      }}
    >
      Earliest
    </ToggleButton>,
  ];
  return (
    <ToggleButtonGroup
      value={sortState}
      exclusive
      fullWidth
      aria-label="Sort By"
    >
      {buttons}
    </ToggleButtonGroup>
  );
}

export default SortByButtons;
