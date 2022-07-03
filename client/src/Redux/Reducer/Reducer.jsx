import {
    GET_POKEMONS,
    GET_BY_NAME,
    GET_DETAILS,
    GET_TYPES,
    CREATE_POKEMON,
    CLEAN_DETAIL_POKEMON,
    ORDER_POKEMON,
    FILTER_BY_TYPE,
    FILTER_BY_CREATE,
} from '../Actions/Actions'

const initialState = {
    pokemons: [],
    allpokemons: [],
    types: [],
    pokemonDetail: {},
    filters: [],
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS: return {
            ...state,
            pokemons: action.payload,
            filters: action.payload
        }
        case GET_BY_NAME: return {
            ...state,
            allpokemons: action.payload
        }
        case GET_DETAILS: return {
            ...state,
            pokemonDetail: action.payload
        }
        case GET_TYPES: return {
            ...state,
            types: action.payload
        }
        case CREATE_POKEMON: return {
            ...state,

        }
        case CLEAN_DETAIL_POKEMON:
            return {
                ...state,
                pokemonDetail: action.payload,
                allpokemons: action.payload,
            }

        case ORDER_POKEMON:
            const orderPokemon =
                action.payload === 'ID' ? state.pokemons.sort((a, b) => {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id < b.id) {
                        return 1;
                    } return 0
                }) :
                    action.payload === 'ABC' ?
                        state.pokemons.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name < b.name) {
                                return 1;
                            } return 0
                        }) : action.payload === 'ZYX' ?
                            state.pokemons.sort((a, b) => {
                                if (a.name > b.name) {
                                    return -1;
                                }
                                if (a.name > b.name) {
                                    return 1;
                                } return 0
                            }) : action.payload === 'ASC'
                                ? state.pokemons.sort((a, b) => b.attack - a.attack)
                                : action.payload === 'DESC'
                                    ? state.pokemons.sort((a, b) => a.attack - b.attack)
                                    : state.pokemons
            return {
                ...state,
                pokemons: orderPokemon
            }

        case FILTER_BY_CREATE:
            const all = state.filters;
            const createdFilter =
                action.payload === "API"
                    ? all.filter(e => isNaN(e.id) === false)
                    : all.filter(e => isNaN(e.id) !== false);
            return {
                ...state,
                pokemons: action.payload === 'JOIN' ? all : createdFilter,
            };

        case FILTER_BY_TYPE:
            let allPokes = state.filters.filter((p) =>
                (p.types.includes(action.payload))
            );
            if (action.payload === "ALL") {
                allPokes = state.filters;
            }
            return {
                ...state,
                pokemons: allPokes,
            };
        default:
            return state
    }
}


