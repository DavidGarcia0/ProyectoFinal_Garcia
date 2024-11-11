import cart from './assets/cart.svg';
import './CartWidget.css'

const CartWidget = () => {
    return (
        <div>
            <img src={cart} alt="Cart Widget"/>
            0
        </div>
    )
}

export default CartWidget