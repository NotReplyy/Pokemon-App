import React from 'react'
import './Filters.css'




function Filters({ typesPokemons, handleOrderByName, handleFilterByType, handleFilterByCreation }) {
  return (
    <div className='filters-order'>
      <div className='class-orderName'>
        <label>Order</label>
        <select onChange={(e) => { handleOrderByName(e) }}>
          <option value='ID'>ID</option>
          <option value='ABC'>A-Z</option>
          <option value='ZYX'>Z-A</option>
          <option value='ASC'>+ Attack</option>
          <option value='DESC'>- Attack</option>
        </select>
      </div>
      <div className='class-filterType'>
        <label>Filter Type</label>
        <select onChange={(e) => handleFilterByType(e)}>
          <option value='ALL' >All</option>
          {typesPokemons.map((type, index) => (
            <option key={index} value={type.name}  >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className='class-filterCreation'>
        <label>Filter Creation</label>
        <select onChange={(e) => handleFilterByCreation(e)}>
          <option value='JOIN' >All</option>
          <option value='API'>PokeApi</option>
          <option value='DB'>Created DB</option>
        </select>
      </div>
    </div>
  )
}

export default Filters





