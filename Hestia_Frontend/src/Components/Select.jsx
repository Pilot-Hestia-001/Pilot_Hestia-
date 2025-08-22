import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({handleChange}) => {
    const [size, setSize] = React.useState('');

    const handleSelectChange = (event) => {
      const newSize = event.target.value;
      setSize(newSize);
      handleChange(newSize); // Pass selected size back to parent
    };
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="size"
          onChange={(e) => handleSelectChange(e)}
        >
          <MenuItem value={"xs"}>XS</MenuItem>
          <MenuItem value={"s"}>S</MenuItem>
          <MenuItem value={"m"}>M</MenuItem>
          <MenuItem value={"l"}>L</MenuItem>
          <MenuItem value={"xl"}>XL</MenuItem>
          <MenuItem value={"xxl"}>XXL</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect