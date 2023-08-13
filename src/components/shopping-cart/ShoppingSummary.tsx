import { useState, useMemo, useEffect } from 'react';
import useCart from '../../store/cart';
import useProduct from '../../store/product'

interface Props {
    changed: number,
    changedPrice: number,
    posts: any,
    discount: number
}

export default function ShoppingSummary({ posts, changed, changedPrice, discount }: Props) {
    const cart:any = useCart()
    const product:any = useProduct()
    let amount = 0;
    let price = 0;
    const [totalPrice, setTotalPrice] = useState(price)
    const [totalAmount, setTotalAmount] = useState(amount)

    useMemo(() => {
      posts.map((post: any) =>
      {!post.amount ? (null) : (
        amount += post.amount
        
      )
      !post.publication_item.publication_info.price ? (null) : (
        price += (post?.publication_item.publication_info.price * post?.amount)
      )}
      )
      // console.log(price)
      setTotalPrice(price)
      setTotalAmount(amount)
    }, [posts])

    return (
        <div className="row">
          <div className="col-md-4">
          {posts.map((post: any) =>
          <>
          {!post.amount ? (null):(
            <h6>{post.publication_item.item.name}</h6>
          )}
          </>
          )}
          {discount === 0 ? (null) : (
            <h6>Descuentos:</h6>
          )}
            <div className="my-3 line w-120"></div>
            <h6>Total productos:</h6>
            <h6>Costo total:</h6>
          </div>
          <div className="col-md-4">
          {posts.map((post: any, index:number) =>
          <div key={index}>
          {!post.amount ? (null):(
            <>
                <h6>${post?.publication_item.publication_info.price} c/u</h6>
            </>

          )}
          
          </div>
          )}

          {discount === 0 ? (null) : (
            <h6>- {(discount / 100) * (totalPrice + changedPrice)}</h6>
          )}

          <div className="my-3 line w-60"></div>
          <h6>{totalAmount + changed}</h6>
          {discount === 0 ? (
            <h6>{totalPrice + changedPrice} CLP</h6>
          ) : (
            <h6>{(totalPrice + changedPrice) - (discount / 100) * (totalPrice + changedPrice)} CLP</h6>
          )}
          </div>
        </div>
    );

}

