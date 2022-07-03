import axios from 'axios'
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const CLEAN_DETAIL_POKEMON = 'CLEAN_DETAIL_POKEMON';
export const ORDER_POKEMON = 'ORDER_POKEMON';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATE = 'FILTER_BY_CREATE';

export const getAllPokemon = () => {
    return async function (dispatch) {
        try {
            let response = await axios('/pokemons')
            dispatch({ type: GET_POKEMONS, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/pokemons/?name=${name}`)
            dispatch({ type: GET_BY_NAME, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDetails = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/pokemons/${id}`)
            dispatch({ type: GET_DETAILS, payload: response.data })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const getTypes = () => {
    return async function (dispatch) {
        try {
            const response = await axios(`/types`)
            dispatch({ type: GET_TYPES, payload: response.data })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const createPokemon = (pokemon) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`/pokemons`, pokemon)
            dispatch({ type: CREATE_POKEMON, payload: response.data })
        }
        catch (error) {
            console.log(error.message)
        }
    }
}

export const cleanDetails = () => {
    return {
        type: CLEAN_DETAIL_POKEMON,
        payload: {},
    };
};

export const orderPokemon = (payload) => {
    return {
        type: ORDER_POKEMON,
        payload,
    }
}

export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPE,
        payload,
    }
}

export const filterByCreate = (payload) => {
    return {
        type: FILTER_BY_CREATE,
        payload,
    }
}