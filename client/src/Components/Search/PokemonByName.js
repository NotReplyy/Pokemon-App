import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { cleanDetails, getByName } from '../../Redux/Actions/Actions';
import Card from '../Card/Card';
import imageLoading from '../../Images/10172dc2-f05e-4804-948f-94ec8a1747ce.gif'
import './PokemonByName.css'


function PokemonByName() {
    const { name } = useParams()

    const dispatch = useDispatch()

    const namePokemons = useSelector((state) => state.allpokemons)

    useEffect(() => {
        dispatch(getByName(name));
        return () => dispatch(cleanDetails())
    }, [dispatch, name]);

    return (
        <div className='div-card-Search'>          
            <div>
                {namePokemons.length > 0 ? namePokemons?.map(({ name, id, types, image }) =>
                    <Link className='card-search-link' to={`/pokemons/${id}`} key={id}  >
                        <div className='card-searched'>
                            <Card  name={name} types={types} image={image} />
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

export default PokemonByName