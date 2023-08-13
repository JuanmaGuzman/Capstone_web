
import { useState, useEffect } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import './Catalog.css';
import FilterCard from './FilterCard';
import { useNavigate } from 'react-router';
import { FiFilter } from 'react-icons/fi';


interface Props {
    filtrado: boolean,
    filtersUsed: any
    brands:any
    categories:any
    fromCatalog: boolean
}

export default function Filters({ filtrado, filtersUsed, brands, categories, fromCatalog }: Props) {
    const [brandfilt, setBrandFilt] = useState(Array<string>);
    const [categoryfilt, setCategoryFilt] = useState(Array<string>);
    let navigate = useNavigate();
    function handleClick(){
        if (fromCatalog)
            navigate("/catalog/filter", {state: {filtro: { brand: brandfilt, category: categoryfilt }}});
        else
            navigate("/admin/products/filter", {state: {filtro: { brand: brandfilt, category: categoryfilt }}});
    }


    return (
        <Card>
            <Card.Body>
            <h5>Filtros <FiFilter/></h5>
            <Accordion className='shadow-0' defaultActiveKey={['0']} alwaysOpen>
                {
                    (filtrado) ? (
                        <>
                            <Accordion.Item className='accordion' eventKey='0' style={{textAlign: "left"}}>
                                <FilterCard check={filtrado} setFilt={setBrandFilt} title='Filtros aplicados' options={filtersUsed.filter((item: any) => item)}/>
                            </Accordion.Item>
                            <a style={{textDecoration: "none", color: "#bf3b4b", fontWeight: "bold"}} href={(fromCatalog) ? ('/catalog/all') : ('/admin/products/all')}>Limpiar filtros</a>
                        </>
                    ) : (
                        <>
                            <Accordion.Item className='accordion' eventKey='0' style={{textAlign: "left"}}>
                                <FilterCard check={filtrado} setFilt={setBrandFilt} title='Marca' options={brands}/>
                            </Accordion.Item>
                            <Accordion.Item className='accordion' eventKey='1' style={{textAlign: "left"}}>
                                <FilterCard check={filtrado} setFilt={setCategoryFilt} title='Categoría' options={categories}/>
                            </Accordion.Item> 
                            <button style={{marginTop: '5%'}} className='displayed' onClick={handleClick}> Aplicar filtros</button>
                        </>
                    )
                }
            </Accordion>
            </Card.Body>

        </Card>
    );

}
