import './Cart.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

    if (totalQuantity === 0) {
        return (
            <div>
                <h1>No hay items en el carrito</h1>
                <Link to='/' className='Option'>Productos</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cart.map(p => <CartItem key={p.id} {...p} />)}
            <h3>Total: ${total}</h3>  {/* Mostrar el total aquí */}
            <h3>Cantidad Total: {totalQuantity}</h3>  {/* Mostrar la cantidad total de productos */}
            <button onClick={() => clearCart()} className='Button4'>Limpiar carrito</button>
            <Link to='/checkout' className='Option'>Checkout</Link>
        </div>
    );
};

export default Cart;