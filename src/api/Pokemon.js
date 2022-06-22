import {API_HOST} from '../utils/Constants'

export async function getPokemonApi(endpointUrl){
    try{
        const url = `${API_HOST}/pokemon?limit=20&offset=0`;
        const respone = await fetch(endpointUrl || url);
        const result = await respone.json();
        return result;
    }catch(e){
        throw e;
    }
}

export async function getPokemonDetailsByUrlApi(url){
    try{
        const respone = await fetch(url);
        const result = await respone.json();
        return result;
    }catch(e){
        throw e;
    }
}

export async function getPokemonDetailsApi(id){
    try{
        const url = `${API_HOST}/pokemon/${id}`;
        const respone = await fetch(url);
        const result = await respone.json();
        return result;
    }catch(e){
        console.log(e);
    }
}