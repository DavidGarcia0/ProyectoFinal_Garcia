import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout';

function App() {
  console.log("REACT_APP_TEST_VARIABLE:", process.env.REACT_APP_TEST_VARIABLE);
  return (
    <div className="App">
      <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"Bienvenido"}/>} />
          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/item/:itemId' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<h1>404 NOT FOUND</h1>} />
          </Routes>
          </CartProvider>
      </BrowserRouter>
      {/* <NavBar />
      <ItemListContainer greeting={'Bienvenidos'}/>
      <ItemDetailContainer /> */}
    </div>
  );
}

export default App;
