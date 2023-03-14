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
  // aqui a baixo não é nativo do react, então tem que importar
  const [ conteudo, setConteudo ] = useState(<></>)

  function carregarTodosOsPersonagens(){
    return mock
    
  }

  function listaPersonagens(){
    const todosPersonagens = carregarTodosOsPersonagens()

    
    return todosPersonagens.map(personagem =>
      <div className='card char'>
        <img src={personagem.image}/>
        <div className='name'>{ personagem.name}</div>
        <div className='info'>
          
          { personagem.status}
          { personagem.species}
          { personagem.type }
          { personagem.gender }
         
        </div>
        

      
      </div>
    )
  }
  useEffect(() =>{
    setConteudo(listaPersonagens())
  })

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
