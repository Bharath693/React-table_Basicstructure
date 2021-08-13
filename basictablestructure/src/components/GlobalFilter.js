import React, { useState } from "react";
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChange =useAsyncDebounce((value) =>{
      setFilter(value || undefined)
  },1000)

  return (
    <div style={{ textAlign: "center" }}>
      search:{" "}
      <input
        value={filter}
        onChange={(e) => {
         setValue(e.target.value)
         onChange(e.target.value)
        }}
      />
    </div>
  );
};
export default GlobalFilter;
