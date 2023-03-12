import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import useDebounce from '../../../hooks/useDebounce';
import { useSetSharedFilter } from '../../../atoms/shared';
import { Search } from '@mui/icons-material';

const SearchField: React.FC = () => {
  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value);
  const setSharedFilter = useSetSharedFilter();

  React.useEffect(() => {
    setSharedFilter(debouncedValue);
  }, [debouncedValue, setSharedFilter]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      sx={{ mb: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
