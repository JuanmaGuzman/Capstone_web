import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import ProductOnEvaluation from '../../../components/admin/ProductOnEvaluation';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import CategoryView from '../../../components/catalog/CategoryView';
import Filters from '../../../components/catalog/Filters';
import { useState, useEffect, useMemo } from 'react';
import useProduct from '../../../store/product';
import { BsCart } from 'react-icons/bs';

export default function inactiveCatalog() {

    const product:any = useProduct()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        product.nonActivePublications().then(setPosts)
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

    if (posts.length == 0) {
        return (
            <div className="container my-5" style={{ textAlign: "center" }}>
            <div className="mt-4">
              <h4 className="fw-600" style={{color:'#bf3b4b', margin:240}}>No hay publicaciones por revisar</h4>
            </div>
          </div>
        )
    }


    return (
        <>
            <div className="container text-center mx-auto">
                <div className="row " >
                    <h2 style={{marginBottom: "1%"}}>Publicaciones postuladas</h2>
                </div>

                <hr/>
                <div className="row ">
                    <div className="col-3">
                    <Filters filtrado={false} filtersUsed={['']} brands={brands} categories={categories.map((category:any) => category.name)} fromCatalog={false}/>
                    </div>
                    <div className="col-9">
                    <div className="row ">
                    {
                        pagination.currentData && pagination.currentData.map((post: any) =>
                            <div className="col-4">
                                <ProductOnEvaluation title={post.general_item_info.name} imgurl={post.photo_uris[0]} price={post.price} brand={post.general_item_info.brand} id={post.id} />
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
