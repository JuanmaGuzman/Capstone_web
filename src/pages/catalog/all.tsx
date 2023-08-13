import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import ProductItem from '../../components/catalog/ProductItem';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import CategoryView from '../../components/catalog/CategoryView';
import Filters from '../../components/catalog/Filters';
import { useState, useEffect, useMemo } from 'react';
import useProduct from '../../store/product';
import PostCard from  '../../components/landing/PostCard'
import { CategorySchema } from '../../lib/api/models/CategorySchema'


export default function mainCatalog() {

    const product:any = useProduct()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        product.activePublications().then(setPosts)
        .then (() => {
        product.allCategories().then(setCategories)
        })
        .then (() => {
        product.allBrands().then(setBrands)
        })
        .finally(() => {setLoading(false)})
      }, []);
    
    const [pagination, setPagination] = useState({data: [] as any, offset: 0, numberPerPage: 12, pageCount: 0, currentData: [] as any});

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
                <div className="row " >
                    <h2 style={{marginBottom: "1%"}}>Catálogo</h2>
                </div>
                <hr/>
                <div style={{ alignItems: 'center'}}>
                    {
                        categories.slice(0, 6).map((item: any) =>
                            <div style={{margin: "0 2% 0 2%", display: 'inline-block'}}>
                                <CategoryView title={item.name} photo={(item.image_uri!!) ? (item.image_uri) : ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrccRWUBdozTUq1fVuKNeb39pwDOXwuvxQCIEzMputeKFQaVvNgQD81-iiUyYkZF1iCoc&usqp=CAU')}/>
                            </div>
                        )
                    }
                </div>
                <hr/>
                <div className="row ">
                    <div className="col-3">
                        <Filters filtrado={false} filtersUsed={['']} brands={brands} categories={categories.map((category:CategorySchema) => category.name)} fromCatalog={true}/>
                    </div>
                    <div className="col-9">
                    <div className="row ">
                    {
                        pagination.currentData && pagination.currentData.map((post: any) =>
                            <div className="col-4">
                                <ProductItem title={post.general_item_info.name} imgurl={post.photo_uris[0]} price={post.price} brand={post.general_item_info.brand} id={post.id} stock={post.general_item_info.total_amount}/>
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
