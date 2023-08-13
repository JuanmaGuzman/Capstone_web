import 'bootstrap/dist/css/bootstrap.min.css';
import PostCard from '../components/landing/PostCard';
import './landing.css';
import useProduct from '../store/product';
import { useState, useMemo, useEffect } from 'react';
import CategoryRow from '../components/landing/CategoryRow';
import { useLocation } from 'react-router-dom';



const hardcoded_posts = [
    { key: 0, title: "Camisa azul rayada", price: "$10.000", imgurl: "https://oldnavy.gap.com/Asset_Archive/ONWeb/content/0029/395/863/assets/220700_96-M7659_W_DP_Tops.jpg"},
    { key: 1, title: "Chaqueta negra", price: "$54.990", imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpDlU0WC-LeLzrP9vjPg3ySU5J8JEdscUTgQ&usqp=CAU"},
    { key: 2, title: "Vestido corto", price: "$14.990", imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSavqMdNviZaZViYP3ORWFeNIJ-Z0dmSS8NQ&usqp=CAU"},
    { key: 3, title: "Vestico Halter canela", price: "$19.990", imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1eabBnbgiyI-o_d6c7874jXCY6EU_S5yBww&usqp=CAU"},
    { key: 4, title: "Polera Dryfit calipso", price: "$12.000", imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSN_GJNVW7P1bBDgnUGeH5aXMJYwNJIMCdBQ&usqp=CAU"},
    { key: 5, title: "Polera rosa deportiva", price: "$9.990", imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvYnmkRWCkKEgoLIoNyuFn2RHKz6XUFqVbw&usqp=CAU"},

];

interface CustomizedState {
    state: any
  }


export default function Landing() {
    const product:any = useProduct();
    const [posts, setPosts] = useState([])
    const [newPosts, setNewPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [recomendations, setRecomendations] = useState([])

    useEffect(() => {
        product.activePublications()
          .then(setPosts)
        product.allCategories()
            .then(setCategories)
        product.getRecomendations(10)
            .then(setRecomendations)
      }, [stop]);
    
    
    useMemo(() => {
        setNewPosts(posts.sort(function(a: any, b: any){
            return (new Date(b.publish_date) as any) - (new Date(a.publish_date) as any)
        }))
      }, [posts]);
      
    return (
        <>
            <div className='main-landing-div'>
                <div id='main-landing-div-description'>
                    <h1>
                        ¡Bienvenido a Nudos Eline!
                    </h1>
                    <p className='text-center'>
                        Encuentra todos los productos que quieres y necesitas
                    </p>
                    <a href="/catalog/all" className='displayed' role="button">Ver catálogo</a>
                </div>
                <img src='https://demo.themeies.com/silon/images/ban-1.png'/>
            </div>
            <div className="container text-center testimonial-group mx-auto"> 
                <div className="row">
                    <h3>Nuevos productos</h3>
                </div>
                <hr/>
                <div className="row">
                    {
                        newPosts.slice(0, 6).map((post: any, index: number) =>
                        <>
                        
                        <div className="col" key={index}>
                            <PostCard title={post.general_item_info.name} price={post.price} imgurl={post.photo_uris[0]} id={post.id} stock={post.general_item_info.total_amount}/>
                        </div>
                        </>
                            
                        )   
                    }
                </div>
                {
                    (recomendations.length > 0) ? 
                    (
                        <>
                        <div className="row">
                            <h3 style={{marginTop: "20px"}}>Nuestra selección para tí</h3>
                        </div>
                        <hr/>
                        <div className="row">
                            {
                                recomendations.map((post: any, index: number) =>
                                <>
                                
                                <div className="col" key={index}>
                                    <PostCard title={post.general_item_info.name} price={post.price} imgurl={post.photo_uris[0]} id={post.id} stock={post.general_item_info.total_amount}/>
                                </div>
                                </>
                                    
                                )   
                            }
                        </div>
                        </>
                    ) : 
                    (null)
                }
                <div className="row">
                    <h3 style={{marginTop: "20px"}}>Explora nuestras categorías</h3>
                </div>
                <hr/>
                    <CategoryRow categories={categories} first={0} last={2} id='category-rows-web'/>
                    <CategoryRow categories={categories} first={2} last={4} id='category-rows-web'/>

                    <CategoryRow categories={categories} first={0} last={1} id='category-rows-mobile'/>
                    <CategoryRow categories={categories} first={1} last={2} id='category-rows-mobile'/>
                    <CategoryRow categories={categories} first={2} last={3} id='category-rows-mobile'/>
                    <CategoryRow categories={categories} first={3} last={4} id='category-rows-mobile'/>
                    <a style={{textDecoration: "none", padding: "10px", marginTop: "30px"}} href="/categories" className='displayed' role="button">Ver todas las categorías</a>
            </div>
        </>
    );
}
