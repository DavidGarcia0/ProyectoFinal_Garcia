import './ItemDetailContainer.css';
import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true); // Activa el estado de carga

        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(response => {
                const data = response.data();
                const productAdapted = { id: response.id, ...data };
                setProduct(productAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Desactiva el estado de carga
            });
    }, [itemId]);

    if (loading) {
        return <h1>Cargando producto...</h1>;
    }

    return (
        <div className="ItemDetailContainer">
            <ItemDetail {...product} />
        </div>
    );
};

export default ItemDetailContainer;
