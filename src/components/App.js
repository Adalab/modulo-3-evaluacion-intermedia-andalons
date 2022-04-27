import '../styles/App.scss';
//import friendsData from '../data/friendsData.json';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';

function App() {
  //llamada a la api
  useEffect(() => {
    callToApi().then((response) => {
      setInitialData(response);
    });
  }, []);

  //constantes de estado
  const [initialData, setInitialData] = useState([]);
  const [newData, setNewData] = useState({
    quote: '',
    character: '',
  });
  const [filterQuoteData, setFilterQuoteData] = useState('');
  const [filterCharacterData, setFilterCharacterData] = useState('Todos');

  //funciones manejadoras
  const handleNewData = (ev) => {
    const objectProp = ev.target.name;
    const objectValue = ev.target.value;
    setNewData({ ...newData, [objectProp]: objectValue });
  };

  const handleClickNewData = (ev) => {
    ev.preventDefault();
    setInitialData([...initialData, newData]);
  };

  const handleFilterQuote = (ev) => {
    setFilterQuoteData(ev.target.value);
  };

  const handleFilterCharacter = (ev) => {
    setFilterCharacterData(ev.target.value);
  };

  //render
  const renderHTML = () => {
    return initialData
      .filter((object) =>
        object.quote.toLowerCase().includes(filterQuoteData.toLowerCase())
      )
      .filter((object) => {
        if (filterCharacterData !== 'Todos') {
          return object.character === filterCharacterData;
        } else {
          return initialData;
        }
      })

      .map((object, i) => (
        <li key={i} className="list__element">
          <p>"{object.quote}"</p>
          <p>
            <strong>{object.character}</strong>
          </p>
        </li>
      ));
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <form className="form">
          <legend className="form__title">Filtra tu búsqueda:</legend>
          <label htmlFor="filterPhrase">Filtrar por frase: </label>
          <input
            type="text"
            name="filterPhrase"
            id="filterPhrase"
            onChange={handleFilterQuote}
            value={filterQuoteData}
          />
          <label htmlFor="filterCharacter"> Filtrar por personaje: </label>
          <select
            name="filterCharacter"
            id="filterCharacter"
            onChange={handleFilterCharacter}
          >
            <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Rachel">Rachel</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Joey">Joey</option>
            <option value="Monica">Monica</option>
          </select>
        </form>
      </header>
      <ul className="list">{renderHTML()}</ul>
      <form className="form">
        <legend className="form__title">Añadir una nueva frase: </legend>
        <label htmlFor="addQuote">Frase: </label>
        <input
          type="text"
          name="quote"
          id="addQuote"
          onChange={handleNewData}
        />
        <label htmlFor="addCharacter">Personaje: </label>
        <input
          type="text"
          name="character"
          id="addCharacter"
          onChange={handleNewData}
        />
        <input
          type="submit"
          value="Añade tu frase"
          onClick={handleClickNewData}
        />
      </form>
    </div>
  );
}

export default App;
