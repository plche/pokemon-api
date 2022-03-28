import './App.css';
import {useState} from "react";

function App() {
    const [pokemon, setPokemon] = useState([]);

    const getPokemon = async (apiURL) => {
        try {
            let rawRes = await fetch(apiURL);
            if (!rawRes.ok) throw {status: rawRes.status, statusText: rawRes.statusText};
            let res = await rawRes.json();
            console.log("Console log dentro de getPokemon: ", res);
            return res;
        }
        catch (e) {
            let msg = e.statusText || "An error happened.";
            console.error(msg);
        }
    }

    const handleOnClick = () => {
        let apiURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1130';
        getPokemon(apiURL).then(response => {
            console.log("Console log dentro de handleOnClick: ", response);
            setPokemon([...pokemon, ...response.results]);
        });
    }

    return (
        <div className="App">
            <div>
                <button onClick={handleOnClick}>Fetch Pokémon</button>
            </div>
            <div>
                <ul>
                    {pokemon.length > 0 && pokemon.map((pokemonItem, index) => {
                        return (<li key={index}>{pokemonItem.name}</li>)
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
