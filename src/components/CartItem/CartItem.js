import './CartItem.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ id, name, price, quatity, img }) => {
    const { removeItem } = useContext(CartContext);

    const handleRemove = () => {
        removeItem(id);
    };

    // Calcular el subtotal
    const subtotal = (price * quatity).toFixed(2); // Aseguramos que el subtotal tenga dos decimales

    return (
        <div className="CartItem">
            <div className="CartItemDetails">
                {/* Imagen del producto */}
                <img className="CartItemImg" src={img} alt={name} />
                
                <div className="CartItemText">
                    <h4 className="CartItemName">{name}</h4>
                    <p className="CartItemPrice">Precio: ${price}</p>
                    <p className="CartItemQuantity">Cantidad: {quatity}</p>
                    <p className="CartItemSubtotal">Subtotal: ${subtotal}</p>
                </div>
            </div>

            <button onClick={handleRemove} className="Button5">
                Eliminar
            </button>
        </div>
    );
};

export default CartItem;