import React from 'react'

function InputField({setSearch}) {
  return (
    <div className="search-input">
        <input
        
          type="text"
          placeholder="Search "
          onChange={(e) => {
            console.log(e);
            setSearch(e.target.value);
          }}
        />
      </div>
  )
}

export default InputField