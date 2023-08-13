import { useState, useEffect } from 'react';
import useCart from '../../store/cart';
import useProduct from '../../store/product'
import './button.css'

interface Props {
    post: any,
    initialAmount: number,
    setChanged: any,
    changed: number,
    setPriceChange: any
}

const removeStyle = {
    marginRight: "5px",
    borderRadius: "5px",
    width: "40px",
    height: "30px",
    border: "1px solid grey",
    backgroundColor: "white"
};

const addStyle = {
    marginLeft: "5px",
    borderRadius: "5px",
    width: "40px",
    height: "30px",
    border: "1px solid grey",
    backgroundColor: "white",
};

export default function CartQuantityButton({ post, initialAmount, setChanged, changed, setPriceChange }: Props) {
    const cart:any = useCart()
    
    const [quantity, setQuantity] = useState(initialAmount);
    useEffect(() => {
        setQuantity(initialAmount)
    }, [post])
    
    function manageRemoveOneItem(publicationId: number, productId:number) {
        setQuantity(quantity - 1)
        const data = { amount : quantity - 1}
        cart.addItem(publicationId, data, productId)
        setChanged(changed - 1)
        setPriceChange((changed - 1) * post.publication_item.publication_info.price)
      }
    
    function manageAddItem(publicationId: number, productId:number) {
    setQuantity(quantity + 1)
    const data = { amount : quantity + 1}
    cart.addItem(publicationId, data, productId)
    setChanged(changed + 1)
    
    // const newPrice = (changed + 1) * post.publication.price
    // console.log(newPrice)
    setPriceChange((changed + 1) * post.publication_item.publication_info.price)
    }
    
    return (
        <>
        <div className="d-flex mt-10">
        {
            (quantity === 1) ? (
            <>
            <button onClick={() => manageRemoveOneItem(post.publication_item.item.id, post.publication_item.publication)} className="remove" type="button" style={removeStyle} disabled={true}> - </button>
            <span className="cart-quantity">{quantity}</span>
            <button onClick={() => manageAddItem(post.publication_item.item.id, post.publication_item.publication)} className="add" type="button" style={addStyle}> + </button>
            </>
            ) : (quantity === post.available) ? 
            (
            <>
            <button onClick={() => manageRemoveOneItem(post.publication_item.item.id, post.publication_item.publication)} className="remove" type="button" style={removeStyle}> - </button>
            <span className="cart-quantity">{quantity}</span>
            <button onClick={() => manageAddItem(post.publication_item.item.id, post.publication_item.publication)} className="add" type="button" style={addStyle} disabled={true}> + </button>
            </>
            ) : (
            <>
            <button onClick={() => manageRemoveOneItem(post.publication_item.item.id, post.publication_item.publication)} className="remove" type="button" style={removeStyle}> - </button>
            <span className="cart-quantity">{quantity}</span>
            <button onClick={() => manageAddItem(post.publication_item.item.id, post.publication_item.publication)} className="add" type="button" style={addStyle}> + </button>
            </>
            )
        }
        </div>
        <h6 className="mt-15">{post.publication_item.publication_info.price * quantity}</h6>
        </>
    );

}

