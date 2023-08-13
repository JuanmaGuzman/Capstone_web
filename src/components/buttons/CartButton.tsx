import './button.css'
import { BsCart } from 'react-icons/bs';
import useCart from '../../store/cart';
import { Shopping_Cart } from '../../lib/api/models/Shopping_Cart';
import swal from 'sweetalert';
import { useNavigate } from 'react-router'


interface Props {
    productId: number,
    productAmount: Shopping_Cart,
    fromDetail: boolean,
    stock: number,
    publicationId: number
}

export default function CartButton({ productId, productAmount, fromDetail, stock, publicationId }: Props) {
    const navigate = useNavigate()
    const cart:any = useCart();

    const alert = () => {
        swal({
            title: 'Se ha agregado a tu carro de compras!',
            icon: 'success',
            buttons: {
              cancel: {
                text: "Seguir comprando",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Ir al carro",
                visible: true,
                value: 'confirm'
              }
            }
            
          })
          .then((value) => {
            switch (value) {
           
              case "cancel":
                navigate('/')
                break
           
              case "confirm":
                navigate('/cart')
                break
            }
          });
    }

    const handleCart = async (publicationId:number, productAmount: Shopping_Cart, productId:number) => {
        if (!fromDetail)
            await cart.addItemFromCart(publicationId, productAmount, productId)
        else
            await cart.addItem(publicationId, productAmount, productId)
        alert()
      }

      return (
        (stock !== 0) ?
        (
            <>
            <button className='displayed' type="button" onClick={() => handleCart(publicationId, productAmount, productId)}>
                Agregar al <BsCart style={{marginLeft: "5px"}}/>
            </button>
             </>
        ) : 
        (
            <>
            <button className='displayed' style={{opacity:0.5}} type="button" disabled={true}>
                Producto agotado
            </button>
             </>
        )
    );

}
