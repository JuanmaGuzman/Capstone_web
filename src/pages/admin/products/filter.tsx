import { useLocation } from 'react-router-dom';
import Filters from '../../../components/catalog/Filters';
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useMemo } from 'react';
import ProductItem from '../../../components/catalog/ProductItem';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useProduct from '../../../store/product';
import { SuccinctPublicationSchema } from '../../../lib/api';


interface CustomizedState {
    filtro: Array<any>
  }

export default function catalogFilter() {
    const [filterPosts, setFilterPosts] = useState(Array)
    let location = useLocation();
    const state = location.state as CustomizedState;
    const { filtro } = state;
    let brandfilter = Object.entries(filtro)[0][1];
    let categoryfilter = Object.entries(filtro)[1][1];
    const product:any = useProduct()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
      product.nonActivePublications().then(setPosts)
      .finally(() => {setLoading(false)})
    }, []);

    const [pagination, setPagination] = useState({
        data: [], offset: 0, numberPerPage: 12, pageCount: 0, currentData: [] as any});

    useMemo(() => {
        if (brandfilter.filter((item: any) => item).length != 0 && categoryfilter.filter((item: any) => item).length != 0)
            setFilterPosts(posts.filter((post: SuccinctPublicationSchema) => brandfilter.includes(post.general_item_info?.brand) && categoryfilter.includes(post.general_item_info?.category.name)))
        else if (brandfilter.filter((item: any) => item).length != 0)
            setFilterPosts(posts.filter((post: SuccinctPublicationSchema) => brandfilter.includes(post.general_item_info?.brand)))
        else
            setFilterPosts(posts.filter((post: SuccinctPublicationSchema) => categoryfilter.includes(post.general_item_info?.category.name)))
    }, [posts])
    
    useMemo(() => {        
        setPagination((prevState: any) => ({   ...prevState,
            data: filterPosts,
        }))

    }, [filterPosts])

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
                    <h2 style={{marginBottom: "1%"}}>Publicaciones nuevas con filtros</h2>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-3">
                        <Filters filtrado={true} filtersUsed={brandfilter.concat(categoryfilter)} brands={[]} categories={[]} fromCatalog={false}/>
                    </div>
                    <div className="col-9">
                    <div className="row">
                    {
                        (filterPosts.length == 0) ? 
                        (
                            <div className="container my-5" style={{ textAlign: "center" }}>
                                <div className="mt-4">
                                <h4 style={{color:'#bf3b4b', marginTop:50, marginLeft: -200}}>No hay publicaciones por revisar</h4>
                                </div>
                            </div>
                        ) :
                        (pagination.currentData && pagination.currentData.map((post: any) =>
                            <div className="col-3">
                                <ProductItem title={post.general_item_info.name} imgurl={post.photo_uris[0]} price={post.price} brand={post.general_item_info.brand} id={post.id} stock={post.general_item_info.total_amount}/>
                                
                            </div>
                        )
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
