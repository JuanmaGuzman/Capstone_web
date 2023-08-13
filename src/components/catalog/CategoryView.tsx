
import './Catalog.css';

interface Props {
    title: string,
    photo: string
}

export default function CategoryView({ title, photo }: Props) {
    let title_lower = title.toLowerCase();
    return (
        <a href={`/catalog/${title_lower}`} style={{textDecoration: 'none', color: "black"}}>
            <div>
                <img style={{width: "8em", height: "8em", borderRadius: "50%"}} src={photo} alt="category"></img>
                <p>{title}</p>
            </div>
        </a>

    );

}
