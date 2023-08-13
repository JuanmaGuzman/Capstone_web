import { useEffect, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom"
import useProduct from '../../store/product'
import '../../styles/NewPost.css'
import swal from 'sweetalert';
import Loading from '../../components/loading/Loading'
import InputProduct from '../../components/seller/InputProduct'
import ItemForm from '../../components/seller/ItemForm'
import { PublicationItemCreationSchema } from '../../lib/api'

const NewPost = () => {
    const navigate = useNavigate()
    const product:any = useProduct()
    const [formAmount, setFormAmount] = useState(0)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [photoArray, setPhotoArray] = useState<Array<any>>([])
    const location = useLocation()
    let initial = location.state as any;

    
    async function showCategory() {
      return await product.allCategories()
    }

    useEffect(() => {
      let promesa = showCategory()
      readPromise(promesa)
    }, [])

    useEffect(() => {
      if (initial != null){
        for (let j = formAmount; j < initial.publication_items.length - 1; j++){
          addForm()
        }
        formik.values.description = initial.description
        formik.values.price = initial.price
        formik.values.item_brand = initial.item_brand
        formik.values.item_name = initial.item_name
        formik.values.item_category_id = initial.category_id
      }
    }, []) 

    const readPromise = async (promesa:any) => {
      let categ = await promesa
      setCategories(categ)
      setLoading(true)
    }

    function addForm(){
      const newAmount = formAmount + 1
      setFormAmount(newAmount)
      formik.values.publication_items.push({
        size: "",
        color: "",
        sku: "",
        amount: "",
      })
    }

    const conflictAlert = (conflicts: Iterable<any>, data: object) => {
      swal(
        {
          title: 'El/los ítem(s) que estás intentando crear ya existe(n)', 
          icon: 'warning', 
          buttons: {
            confirm: {
              text: "Ver error",
              visible: true,
              value: 'confirm'
            }
          }
        })
      .then(() => {navigate('/seller/item-conflict', {state: {conflicts: conflicts, data: data }})});
    }
    
    
    const goodAlert = () => {
      swal(
        {
          title: 'Se ha(n) creado tu(s) producto(s)!', 
          icon: 'success', 
          buttons: {
            confirm: {
              text: "Ver mis productos",
              visible: true,
              value: 'confirm'
            }
          }
        })
      .then(() => {navigate('/seller/posts')});
    }
    
    function addPhotoArray(photos: Iterable<any>) {
      Array.from(photos).forEach((file:any) => 
      { 
        setPhotoArray(photoArray => [...photoArray, file])
      });
      
    }

    const formik = useFormik({
    initialValues: {
      price: "",
      description: "",
      item_name: "",
      item_brand: "",
      item_category_id: "",
      publication_items: [
        {
          size: "",
          color: "",
          sku: "",
          amount: "",
        }
      ]
    },
    onSubmit: async (data) => {
      const publication:any = data.publication_items[data.publication_items.length - 1]
      
      if (publication.size === ""){data
        data.publication_items.pop()
      }
      try {
            await product.createPublication(photoArray, data)
            goodAlert() 
          } catch (err: any) {
            if (err.status === 409)
            {
              conflictAlert(err.body.conflicts, data)
            }
          }
    }
  })

  return (
    <>
      {
        (loading) ? (
          <div className='container text-center mx-auto'>
          <h2>Crea una publicación</h2>
          <p>Para crear una publicación, debes rellenar todos los campos a continuación.
              <br/>
              Tu publicación luego será revisada por un administrador.
              
          </p>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <InputProduct type='text' value={formik.values.item_name} handleChange={formik.handleChange} 
                name="item_name" placeholder='Nombre del producto' min={-1} max={-1}/>
              <InputProduct type='text' value={formik.values.item_brand} handleChange={formik.handleChange} 
                name="item_brand" placeholder='Marca' min={-1} max={-1}/>
              <InputProduct type='number' value={formik.values.price} handleChange={formik.handleChange} 
                name="price" placeholder='Precio' min={0} max={100000000000000000}/>
              <InputProduct type='text' value={formik.values.description} handleChange={formik.handleChange} 
                name="description" placeholder='Descripción del producto' min={-1} max={-1}/>
              <select defaultValue={'categoria'} onChange={(event:any) => {formik.values.item_category_id = event?.target.value;}} className='input-field'>
                <option value='categoria' disabled>Categoría</option>
                {categories.map((option:any, index:number) => (
                  <option key={index} value={option.id}>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</option>
                ))}
              </select>

              <input 
              onChange={(event:any) => {addPhotoArray(event.target.files)}}
              type="file"
              multiple
              name="varies.photo" 
              placeholder='Cantidad disponible'
              className='file-field'
              required/>

              <ItemForm id={-1} list={formik.values.publication_items[0]} add={false}/>
              
              {
                [...Array(formAmount)].map((item: any, index: number) => 
                <div key={index}>
                  <ItemForm id={-1} list={formik.values.publication_items[index + 1]} add={false}/>
                </div>
                )
              }
              <div className='add-more'>
                <a onClick={addForm}>Agregar otra talla y/o color (con otro SKU)</a>
              </div>
              
              <div style={{marginTop: "25px"}}>
                <button type="submit" className='submit-button'>Crear publicación</button>
              </div>
            </form>
          </div>
        </div>
        ) : <Loading/>
      }
  </> 

  )
}

export default NewPost;