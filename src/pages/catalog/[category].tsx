import { useParams } from 'react-router-dom';
import Filters from '../../components/catalog/Filters';
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useMemo } from 'react';
import ProductItem from '../../components/catalog/ProductItem';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useProduct from '../../store/product';


export default function catalogCategory() {
    const product:any = useProduct()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    let { category } = useParams();

    useEffect(() => {
        product.publicationsByCategory(category)
          .then(setPosts)
          .finally(() => {setLoading(false)})
      }, []);

    const [pagination, setPagination] = useState({
        data: [], offset: 0, numberPerPage: 12, pageCount: 0, currentData: [] as any});

    useMemo(() => {
        setPagination((prevState: any) => ({   ...prevState,
            data: posts,
        }))
    }, [posts])
        
    useEffect(() => {
        if (!loading)
            setPagination((prevState: any) => ({   ...prevState,
                pageCount: prevState.data.length / prevState.numberPerPage,
                currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
          }))
        }, [pagination.numberPerPage, pagination.offset, loading])

    const handlePageClick = (event: any) => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    if (loading) {
        return (
            <div>
                <section className='container'>
                    <h2 style={{marginTop: "1000px"}}>Loading...</h2>
                </section>
            </div>
        )
    }

    
    return (
        <>
            <div className="container text-center mx-auto"> 
                <div className="row">
                    <h2 style={{marginBottom: "1%"}}>Catálogo de {category}</h2>
                    <a href='./all' style={{textDecoration: "none", color: "#Bf3b4b", fontWeight: "bold"}}>Volver al catálogo completo</a>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                    <div className="row">
                    {
                        pagination.currentData && pagination.currentData.map((post: any) =>
                            <div className="col-3">
                                <ProductItem title={post.general_item_info.name} imgurl={post.photo_uris[0]} price={post.price} brand={post.brand} id={post.id} stock={post.general_item_info.total_amount}/>                                
                            </div>
                        )
                    }
                    </div>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={<IoIosArrowBack/>}
                    nextLabel={<IoIosArrowForward/>}
                    breakLabel={'...'}
                    pageCount={pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </>
    );

}
