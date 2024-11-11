import './ItemList.css'
import Item from '../Item/Item'

const ItemList = ({ products }) => {
    return (
        <div className="ListGroup">
            {products && products.length > 0 ? (
                products.map(prod => <Item key={prod.id} {...prod} />)
            ) : (
                <p>No hay productos en esta categoría.</p>
            )}
        </div>
    )
}

export default ItemList
