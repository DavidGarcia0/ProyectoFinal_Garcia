
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"Bienvenido"}/>} />
          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/item/:itemId' element={<ItemDetailContainer />} />
          <Route path='*' element={<h1>404 NOT FOUND</h1>} />
          </Routes>
      </BrowserRouter>
      {/* <NavBar />
      <ItemListContainer greeting={'Bienvenidos'}/>
      <ItemDetailContainer /> */}
    </div>
  );
}

export default App;
