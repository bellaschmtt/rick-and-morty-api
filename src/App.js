import { useEffect, useState } from 'react';
import './css/App.css';

const mock = [
  {
    "id": 16,
    "name": "Amish Cyborg",
    "status": " Dead ",
    "species": "Alien ",
    "type": " Parasite ",
    "gender": " Male ",
    "episode": "S01E01",
    "origin": {
    "name": "unknown",
    "url": ""
    },
    "location": {
    "name": "Earth (Replacement Dimension)",
    "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    "episode": [
    "https://rickandmortyapi.com/api/episode/15"
    ],
    "url": "https://rickandmortyapi.com/api/character/16",
    "created": "2017-11-04T21:12:45.235Z"
  }
]



function App() {

  function traduzirStatus(status){
    switch(status){
      case 'Alive':
        return "vivo"
      case 'unknown':
        return 'Desconhcido' 
      case 'Dead':
        return 'morto' 
      default:
        return status
    }
  }

  function traduzirGender(gender){
    switch(gender){
      case 'Male':
        return "macho"
      case 'Female':
        return 'femea' 
      case 'unknown':
        return 'desconhecido' 
      default:
        return gender
    }
  }
  function traduzirSpecies(species){
    switch(species){
      case 'Human':
        return "humano"
      default:
        return species
    }
  }
  

  // aqui a baixo não é nativo do react, então tem que importar
  const [ conteudo, setConteudo ] = useState(<></>)

  async function carregarTodosOsPersonagens(){
    const retorno = await fetch(
      "https://rickandmortyapi.com/api/character",
      {method: "GET"}
    )
    .then((response) => response.json())
    console.log(retorno)
    return retorno.results
    
  }

  async function listaPersonagens(){
    const todosPersonagens = await carregarTodosOsPersonagens()

    
    return todosPersonagens.map(personagem =>
      <div className='card char'>
        <img src={personagem.image}/>
        <div className='name'>{ personagem.name}</div>
        <p>{traduzirStatus (personagem.status)}</p> 
        <p>{traduzirSpecies( personagem.species)}</p>  
        <p>{traduzirGender( personagem.gender) }</p>
        <p>{ personagem.episode.map(ep =>(
          <spam key={personagem.name+(ep.split('episode/')[1])}>
            Ep-{(ep.split('episode/')[1])}
          </spam>
        ))}</p>
        
        <div className='char-info'>
          <spam>
            <b>Nome:</b>
             { personagem.name}
          </spam>
        </div>
      
      </div>
    )
  }
  useEffect(() =>{
    async function carregar(){
      setConteudo(await listaPersonagens())
    }  
    carregar()
  }, []);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className='lista-principal'>
          {conteudo}
      </div>
    </div>
  );
}

export default App;
