import '../../styles/NewPost.css'
import useProduct from '../../store/product'
import { useState } from 'react'
import swal from 'sweetalert'

interface Props {
    list: any,
    add: boolean,
    id: number
}

const tallas = ['xs', 's', 'm', 'l', 'xl', 'xxl', '36', '38', 
                '40', '42', '44', '46', '48', '50', '52']

const ItemForm = ({ list, add, id }: Props) => {
    const product:any = useProduct()
    const [newSku, setNewSku] = useState(0)
    const [newColor, setNewColor] = useState("")
    const [newSize, setNewSize] = useState("")
    const [newAmount, setNewAmount] = useState(0)

    async function createPublicationItem() {
      let pub_item = {publication_items: [
        {size: newSize, color: newColor, sku: newSku, amount: newAmount}
      ]}
      try{
      await product.addPublicationItem(id, pub_item)
      createSuccessful()
      }
      catch {
        swal('Un producto con ese SKU y otros datos ya existe', 'Asegúrese que sus datos están bien', 'error')
      }
    }

    const createSuccessful = async () => {
      await swal({
        title: '¡Producto actualizado con éxito!',
        icon: 'success',
        })
      window.location.reload()
    };
  

    return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <input
         min="0"
        type="number"
        name="varies.sku" 
        placeholder='SKU'
        onChange={(event:any) => {list.sku = event?.target.value; setNewSku(event?.target.value)}}
        className='input-field2'  
        required
        />

        <select defaultValue={'talla'} onChange={(event:any) => {list.size = event?.target.value; setNewSize(event?.target.value)}} className='input-field3'>
          <option value='talla' disabled>Talla</option>
          {tallas.map((option:any, index:number) => (
            <option key={index} value={option}>{option.toUpperCase()}</option>
          ))}
        </select>

        <input 
        onChange={(event:any) => {list.color = event?.target.value; setNewColor(event?.target.value)}}
        type="text"
        name="varies.color" 
        placeholder='Color'
        className='input-field3'
        required
        />

        <input 
        onChange={(event:any) => {list.amount = event?.target.value; setNewAmount(event?.target.value)}}
        type="number"
        min="0"
        name="varies.amount" 
        placeholder='Cantidad disponible'
        className='input-field2'
        required
        />
        {
          (add) ? (
            <button className='edit-button' onClick={() => createPublicationItem()}>Crear</button>
          ) : null
        }  
    </div>
  )
}

export default ItemForm;