import '../styles/App.scss';
import friendsData from '../data/friendsData.json';
import { useState } from 'react';

function App() {
  //constantes de estad
  const [initialData, setInitialData] = useState(friendsData);
  const [newData, setNewData] = useState({
    quote: '',
    character: '',
  });

  //funciones manejadoras

  //render
  const renderHTML = () => {
    return initialData.map((object, i) => (
      <li key={i}>
        <p>{object.quote}</p>
        <p>{object.character}</p>
      </li>
    ));
  };

  return (
    <div>
      <h1>Frases de Friends</h1>
      <ul>{renderHTML()}</ul>
    </div>
  );
}

export default App;
