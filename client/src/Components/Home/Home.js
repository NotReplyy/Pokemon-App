import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByType, getAllPokemon, getTypes, orderPokemon, filterByCreate } from '../../Redux/Actions/Actions.jsx';
import Card from '../Card/Card';
import Filters from '../Filters/Filters.js';
import Pagination from '../Pagination/Pagination.js';
import imageLoading from '../../Images/10172dc2-f05e-4804-948f-94ec8a1747ce.gif'
import './Home.css';

function Home() {

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);
  const typesPokemons = useSelector((state) => state.types);


  /////////////////////////////////////////////////////////////////////
  // PAGINATION
  /////////////////////////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1)
  const [currentByPage] = useState(12)
  const maxPokemons = Math.ceil(allPokemons.length / currentByPage)


  /////////////////////////////////////////////////////////////////////
  // FILTER AND ORDER
  /////////////////////////////////////////////////////////////////////

  const [, setOrder] = useState("");
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPokemon())
  }, [dispatch])

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderPokemon(e.target.value))
    setOrder(`Order By: ${e.target.value}`)
    setCurrentPage(1)
  };

  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value))   
    setCurrentPage(1)
  };

  const handleFilterByCreation = (e) => {
    e.preventDefault();
    dispatch(filterByCreate(e.target.value))   
    setCurrentPage(1)
  };

  return (
    <div className='Container-div-home'>
      <div className='container-Subnav'>
        <div className='filter'>
          <Filters typesPokemons={typesPokemons} handleFilterByCreation={handleFilterByCreation} handleFilterByType={handleFilterByType} handleOrderByName={handleOrderByName} />
        </div>
        <div className='poke-h1'>
          <h1>Poke App</h1>
        </div>
        <div className='poke-pagination'>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPokemons={maxPokemons} />
        </div>
      </div>
      <div className='Container-card'>
        {allPokemons.length > 0 ? allPokemons
          .slice((currentPage - 1) * currentByPage, (currentPage - 1) * currentByPage + currentByPage)
          .map(({ name, id, types, image }) =>
            <Link className='card-title2' to={`/pokemons/${id}`} key={id}  >
              <div className='Class-Card'>
                <Card name={name} types={types} image={image} />
              </div>
            </Link>
          ) :
          <div className='pokebola'>
            <img className='image-loading' src={imageLoading} alt='Loading' />
          </div>
        }
      </div>
    </div>

  )
}

export default Home