import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, cleanDetails } from '../../Redux/Actions/Actions.jsx';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import imageLoading from '../../Images/10172dc2-f05e-4804-948f-94ec8a1747ce.gif'
import './PokemonDetails.css'


function PokemonDetails() {

    const { id } = useParams();
console.log(id);
    const dispatch = useDispatch();

    const allDetails = useSelector((state) => state.pokemonDetail)

    useEffect(() => {
        dispatch(getDetails(id))
        return () => dispatch(cleanDetails())
    }, [dispatch, id])

    return (
        <div className='div-details'>
            {allDetails.name ? (
                <div>
                    <div className='id-details'>
                        <h1>{id}</h1>
                    </div>
                    <div className='name-details'>
                        <h1>{allDetails.name}</h1>
                    </div>
                    <div className='image-details'>
                        <img src={allDetails.image} alt={allDetails.name} />
                    </div>
                    <div className='details-text'>
                        <div className='weight-details'>
                            <h1>Weight:</h1>
                            <p>{allDetails.weight / 10} Kg</p>
                        </div>
                        <div className='height-details'>
                            <h1>Height:</h1>
                            <p>{allDetails.height / 10} M</p>
                        </div>
                        <div className='types-details'>
                            <h1>Types:</h1>
                            {allDetails.types.map((type, index) => (
                                <p key={index}>{type}</p>
                            ))}
                        </div>
                        <div className='hp-details'>
                            <h1>Hp:</h1>
                            <p>{allDetails.hp} ❤️️</p>
                        </div>
                        <div className='attack-details'>
                            <h1>Attack:</h1>
                            <p>{allDetails.attack} ⚔️</p>
                        </div>
                        <div className='defense-details'>
                            <h1>Defense:</h1>
                            <p>{allDetails.defense} 🛡️</p>
                        </div>
                        <div className='speed-details'>
                            <h1>Speed:</h1>
                            <p>{allDetails.speed} ⚡</p>
                        </div>
                    </div>
                </div>) : <div className='pokebola'>
                <img className='image-loading' src={imageLoading} alt='Loading' />
            </div>}

        </div>
    )
}

export default PokemonDetails