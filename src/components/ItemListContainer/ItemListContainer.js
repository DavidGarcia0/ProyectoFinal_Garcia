import { useState, useEffect } from 'react'
import { getProducts, getProductsbyCategory } from '../../AsyncMock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    const categoryNames = {
        'Celular': 'Celulares',
        'Tablet': 'Tablets',
        'Notebook': 'Notebooks',
    }

    const categoryName = categoryId ? categoryNames[categoryId] : null;

    useEffect(() => {
        const AsyncFunc = categoryId ? getProductsbyCategory : getProducts

        AsyncFunc(categoryId)
        .then(response => {
            setProducts(response)
        })
        .catch(error => {
            console.error(error)
        })
    }, [categoryId])

    return(
        <div>
            <h1>{categoryName ? `${categoryName}` : greeting}</h1>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer