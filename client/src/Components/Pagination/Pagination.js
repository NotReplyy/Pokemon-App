import React, { useState } from 'react'
import './Pagination.css'

function Pagination({ currentPage, setCurrentPage, maxPokemons }) {

    const [input, setInput] = useState();

    const nextPage = () => {
        setInput(input + 1)
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        setInput(input - 1)
        setCurrentPage(currentPage - 1)
    }

    return (
        <div>
            <div className='content-pag'>
                <div>
                <button className='button-pag' disabled={currentPage <= 1} onClick={prevPage} >Prev</button>
                </div>           
                <div>
                    <button className='button-pag' disabled={currentPage === maxPokemons} onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Pagination