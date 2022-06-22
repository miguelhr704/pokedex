import {POKEMON_TYPE_COLORS} from './Constants';

const getColorByPokeomType = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()];


export default getColorByPokeomType;