import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../services/firebase/firebaseConfig';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    const categoryNames = {
        'Celular': 'Celulares',
        'Tablet': 'Tablets',
        'Notebook': 'Notebooks',
    };

    const categoryName = categoryId ? categoryNames[categoryId] : null;

    useEffect(() => {
        setLoading(true);

        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(collectionRef)
            .then(response => {
                const productAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Oculta el mensaje de carga
            });
    }, [categoryId]);

    if (loading) {
        return <h1>Cargando productos...</h1>;
    }

    return (
        <div>
            <h1>{categoryName ? `${categoryName}` : greeting}</h1>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;