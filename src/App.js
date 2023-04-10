import { useEffect, useState } from "react";
import "./css/App.css";

const mock = [
  {
    id: 16,
    name: "Amish Cyborg",
    status: " Dead ",
    species: "Alien ",
    type: " Parasite ",
    gender: " Male ",
    episode: "S01E01",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/15"],
    url: "https://rickandmortyapi.com/api/character/16",
    created: "2017-11-04T21:12:45.235Z",
  },
];

function App() {
  // 1 - criar busca
  const [busca, setBusca] = useState("");

  function traduzirStatus(status) {
    switch (status) {
      case "Alive":
        return "vivo";
      case "unknown":
        return "Desconhcido";
      case "Dead":
        return "morto";
      default:
        return status;
    }
  }

  function traduzirGender(gender) {
    switch (gender) {
      case "Male":
        return "macho";
      case "Female":
        return "femea";
      case "unknown":
        return "desconhecido";
      default:
        return gender;
    }
  }
  function traduzirSpecies(species) {
    switch (species) {
      case "Human":
        return "humano";
      default:
        return species;
    }
  }
    function montarFiltro(tipo, valor){
      const filtros = new URLSearchParams(busca);

      const retorno = filtros.get(tipo);
      if(retorno === valor){
        filtros.delete(tipo);
      }else{
      filtros.set(tipo, valor);
      }

      setBusca('?'+filtros.toString());
    }

  // aqui a baixo não é nativo do react, então tem que importar
  const [conteudo, setConteudo] = useState(<></>);
  // o "await" é basicamente espera a função terminar para continuar
  async function carregarTodosOsPersonagens() {
    const retorno = await fetch(
      "https://rickandmortyapi.com/api/character" + busca,
      { method: "GET" }
    ).then((response) => response.json());
    console.log(retorno);
    return retorno.results;
  }
  // comunicação sincrona é tudo que funciona que só na mesma hora como as aula
  // comunicação assincrona é tudo que funciona que não precisa esperar a resposta para continuar
  async function listaPersonagens() {
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map((personagem) => (
      <div className="card char">
        <img src={personagem.image} />
        <br></br>
        <div className="char-info">
          <spam>
            <b>Nome: </b>
            {personagem.name}
          </spam>
        </div>
        <hr></hr>
        <div className="char-info">
          <spam>
            <b>Status: </b>
            {traduzirStatus(personagem.status)}
          </spam>
        </div>
        <hr></hr>
        <div className="char-info">
          <spam>
            <b>Espécies: </b>
            {traduzirStatus(personagem.species)}
          </spam>
        </div>
        <hr></hr>
        <div className="char-info">
          <spam>
            <b>Gênero: </b>
            {traduzirStatus(personagem.gender)}
          </spam>
        </div>
        <hr></hr>
        <p className="lista-secundaria">
          {personagem.episode.map((ep) => (
            <spam key={personagem.name + ep.split("episode/")[1]}> 
              Ep-{ep.split( "episode/")[1]}, {""}
            </spam>
          ))}
        </p>

        
      </div>
    ));
  }
  useEffect(() => {
    async function getConteudo() {
      setConteudo(await listaPersonagens());
    }
    getConteudo();
  }, [busca]);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="filtros">
        <spam className="filtros-titulo">Filtros</spam>
        <div className="filtro status">
          <b>Status:</b>
          <span onClick={() => setBusca("?status=live")}>Vivo</span>
          <span onClick={() => setBusca("?status=dead")}>Morto</span>
          <span onClick={() => setBusca("?status=unknown")}>Desconhcido</span>
        </div>
        <div className="filtro genero">
          <b>Gênero:</b>
          <span onClick={() => setBusca("?gender=male")}>Masculino</span>
          <span onClick={() => setBusca("?gender=female")}>Feminino</span>
          <span onClick={() => setBusca("?gender=unknown")}>Desconhecido</span>
        </div>
        <div className="filtro genero">
          <b>Filtro duplo:</b>
          <span onClick={() => montarFiltro('status' , 'dead')}>teste</span>
         
        </div>
        <div className="filtro especies">
          <b>Espécies:</b>
          <span onClick={() => setBusca("?species=human")}>Humano</span>
          <span onClick={() => setBusca("?species=alien")}>Alien</span>
          <span onClick={() => setBusca("?species=umanoid")}>Humanoid</span>
          <span onClick={() => setBusca("?species=poopybutthole")}>
            Poopybutthole
          </span>
          <span onClick={() => setBusca("?species=mythological")}>
            Mythological Creature
          </span>
          <span onClick={() => setBusca("?species=animal")}>Animal</span>
          <span onClick={() => setBusca("?species=Cronenberg")}>Cronenberg</span>
          <span onClick={() => setBusca("?species=Robot")}>Robot</span>
        </div>
      </div>
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;
