import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { addDoc, collection, documentId, getDocs, query, Timestamp, where, writeBatch } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"
import CheckoutForm from "../CheckoutForm/CheckoutForm"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOderId] = useState('')

    const { cart, total, clearCart } = useContext(CartContext)

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                item: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            }

            const batch = writeBatch(db)

            const outOfStock = []

            const ids = cart.map(prod => prod.id)

            const productsRef = collection(db, 'procducts')

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const { docs } = productsAddedFromFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stockDb
                
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.prodQuantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb = prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0){
                await batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)

                setOderId(orderAdded.id)
                clearCart()
            } else {
                console.error('hay productos que están fuera de stock')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(loading) {
        return <h1>Se está generando su orden...</h1>
    }

    if(orderId) {
        return <h1>El id de su orden es: {orderId}</h1>
    }

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    )
}

export default Checkout