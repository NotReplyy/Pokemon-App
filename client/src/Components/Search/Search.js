import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Search.css'

function Search() {
    const [name, setName] = useState("")
    const [msg, setMsg] = useState("");

    const { pathname } = useLocation()

    const onInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value.toLowerCase())
    }

    const handleOnClick = () => {
        if (name) {
            setName('')
            setMsg('')
        }
        else {
            setMsg("Please write a name");

        }
    }

    return (
        <div>
            <div className='search-Class'>
                <form className='form-search'>
                    <input className='input-Search' type="text" onChange={(e) => { onInputChange(e) }} placeholder="Search..." value={name} />
                    <Link to={!name ? `${pathname}` : `/pokemon/${name}`}>
                        <button className='button-Search' onClick={handleOnClick} >Search</button>
                    </Link>
                </form>
            </div>     
            <div className='error-search'>
                <label >{msg}</label>
            </div>
        </div>
    )
}

export default Search



// () => { setName('') }