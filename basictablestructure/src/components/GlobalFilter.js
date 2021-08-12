import React, { useState } from 'react'

 const GlobalFilter = ({ filter, setFilter }) => {
    
    console.log(filter)
    return (
        <div style={{textAlign:"center"}}>
            search:{' '}
            <input 
            value={filter || ''}
            onChange={(e) =>{setFilter(e.target.value || undefined)}}
           
           />
        </div>
    )
}
export default GlobalFilter;