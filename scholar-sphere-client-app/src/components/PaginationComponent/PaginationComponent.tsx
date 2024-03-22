import { Pagination, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import React from 'react'
import './PaginationComponent.scss'
interface PaginationProps {
    pageNumber:number;
    pageSize: number;
    totalElementsCount: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    onPageSizeChange: (event: SelectChangeEvent) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
    pageNumber, pageSize, totalElementsCount, onPageChange, onPageSizeChange
}) => {
  return (
    <div className='pagination-component'>
        <Pagination
          count={totalElementsCount}
          page={pageNumber}
          color="primary"
          boundaryCount={1}
          onChange={onPageChange}
        />
        <Select
          size="small"
          labelId="papers-per-page"
          id="demo-simple-select"
          value={pageSize.toString()}
          onChange={onPageSizeChange}
          color='primary'
          variant="outlined"
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
    </div>
  )
}

export default PaginationComponent