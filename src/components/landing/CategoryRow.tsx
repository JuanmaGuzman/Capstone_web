import CategoryCard from './CategoryCard';

interface Props {
    first: number,
    last: number,
    id: string,
    categories: Array<any>
}

export default function CategoryRow({first, last, id, categories}: Props) {

    return (
        <div className="row" id={id}>
            {
                categories?.slice(first, last).map((item: any, index: number) =>
            
                <div className="col" key={index}>
                    <a href={`/catalog/${item.name}`}>
                        <CategoryCard title={item.name.charAt(0).toUpperCase() + item.name.slice(1)} imgurl={item.image_uri}/>
                    </a>
                </div>
                    
                )   
            }
        </div>
    );

}


