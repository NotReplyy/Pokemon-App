import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, getTypes } from '../../Redux/Actions/Actions';
import './CreatePokemon.css'




export default function CreatePokemon() {


  const allTypes = useSelector((state) => state.types);
  //const namePokemons = useSelector((state) => state.allpokemons).map(e => e.name)
  const dispatch = useDispatch();

  const history = useHistory();


  useEffect(() => {
    dispatch(getTypes())
    // dispatch(getByName())
    // dispatch(validate())
  }, [dispatch])

  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  })


  const [errors, setErrors] = useState({});


  const validate = (input) => {
    let errors = {};

    const regExVal = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
    const regExHeigth = /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$/

    // if (namePokemons.includes(input.name)) {
    //   errors.name = '"The pokemon already exists, use another name"';
    // }
    if (!input.name) {
      errors.name = "A name is required";
    } else if (!/^[a-zA-Z]{3,10}$/.test(input.name)) {
      errors.name = "Name is invalid";
    }

    if (!input.hp) {
      errors.hp = 'A Hp is required'
    } else if (!regExVal.test(input.hp)) {
      errors.hp = 'Hp is invalid'
    }

    if (!input.height) {
      errors.height = "Height is required";
    } else if (!regExHeigth.test(input.height)) {
      errors.height = "Heightis invalid";
    }

    if (!input.weight) {
      errors.weight = "Weight is required";
    } else if (!/^([1-9]|[1-9][0-9]{1,3}|10000)$/.test(input.weight)) {
      errors.weight = "Weight is invalid";
    }

    if (!input.speed) {
      errors.speed = "Speed is required";
    } else if (!regExVal.test(input.speed)) {
      errors.speed = "Speed is invalid";
    }

    if (!input.attack) {
      errors.attack = "Attack is required";
    } else if (!regExVal.test(input.attack)) {
      errors.attack = "Attack is invalid";
    }

    if (input.types.length === 0) {
      errors.types = "Type is required";
    } else if (input.types.length > 2) {
      errors.types = "Type exceeds maximum is 2";
    }

    if (!input.defense) {
      errors.defense = "Defense is required";
    } else if (!regExVal.test(input.defense)) {
      errors.defense = "Defense is invalid";
    }

    if (!input.image) {
      errors.image = "An Image url is required";
    } else if (!/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/.test(input.image)) { errors.image = "url is invalid"; }
    return errors;
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && input.name) {
      dispatch(createPokemon(input));
      alert("Pokemon has been created");
      setInput({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
      });
      history.push('/home')
    }
    console.log(input)
  };

  const handleInputChange = (e) => {
    e.preventDefault()
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handleChangeType(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    } else {
      setInput({
        ...input,
        types: input.types.filter((t) => t !== e.target.value),
      });
    }
    if (e.target.checked) {
      setErrors(validate({
        ...input,
        types: [...input.types, e.target.value]
      }))
    } else {
      setErrors(validate({
        ...input,
        types: input.types.filter((t) => t !== e.target.value)
      }))
    }
  }



  return (
    <div className='Container-Create'>
      <form onSubmit={e => handleOnSubmit(e)} >
        <div>
          <div className='container-input'>
            <div className='form-name'>
              <h4 htmlFor='name' >Name</h4>
              <input type='text' name='name' id='name' placeholder='Insert Name...' onChange={(e) => handleInputChange(e)} />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className='form-hp'>
              <h4 htmlFor='hp'>Hp</h4>
              <input type='number' name='hp' placeholder='Insert 1-255...' id='hp' onChange={(e) => handleInputChange(e)} />
              {errors.hp && <p>{errors.hp}</p>}
            </div>
            <div className='form-attack'>
              <h4 htmlFor='attack'>Attack</h4>
              <input type='number' name='attack' placeholder='Insert 1-255...' id='attack' onChange={(e) => handleInputChange(e)} />
              {errors.attack && <p>{errors.attack}</p>}
            </div>
            <div className='form-defense'>
              <h4 htmlFor='defense'>Defense</h4>
              <input type='number' name='defense' placeholder='Insert 1-255...' id='defense' onChange={(e) => handleInputChange(e)} />
              {errors.defense && <p>{errors.defense}</p>}
            </div>
            <div className='form-speed'>
              <h4 htmlFor='speed'>Speed</h4>
              <input type='number' name='speed' placeholder='Insert 1-255...' id='speed' onChange={(e) => handleInputChange(e)} />
              {errors.speed && <p>{errors.speed}</p>}
            </div>
            <div className='form-height'>
              <h4 htmlFor='height'>Height</h4>
              <input type='number' name='height' placeholder='Insert 1-200...' id='height' onChange={(e) => handleInputChange(e)} />
              {errors.height && <p>{errors.height}</p>}
            </div>
            <div className='form-weight'>
              <h4 htmlFor='weight'>Weight</h4>
              <input type='number' name='weight' placeholder='Insert 1-10000...' id='weight' onChange={(e) => handleInputChange(e)} />
              {errors.weight && <p>{errors.weight}</p>}
            </div>
          </div>
          <div className='form-type'>
            <h4 htmlFor='types'>Types</h4>
            {allTypes.map((e, index) => <label key={index}><input type='checkbox' value={e.id} id='types' onChange={(e) => handleChangeType(e)} /> {e.name}|</label>)}
            {errors.types && <p>{errors.types}</p>}
          </div>
          <div className='form-image'>
            <h4 htmlFor='image'>Image</h4>
            <input type='text' name='image' placeholder='Insert Url...' id='image' onChange={(e) => handleInputChange(e)} />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className='form-button'>
            <button type='submit' disabled={Object.keys(errors).length !== 0 || !input.name} >Create Pokemon</button>
          </div>
        </div>
      </form>
    </div>
  )
}



