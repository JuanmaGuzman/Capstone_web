
import { Accordion } from 'react-bootstrap';
import './Catalog.css';
import FilterCheckbox from './FilterCheckbox';
import { useEffect, useState } from 'react';

interface Props {
    title: string,
    options: Array<string>,
    setFilt: (newType: Array<string>) => void,
    check: boolean
}

let categoryCheckList = new Array<string>;
let brandCheckList = new Array<string>;

export default function FilterCard({ title, options, setFilt, check }: Props) {
    const [checked, setChecked] = useState('');
    let checkList = new Array<string>;

    useEffect(() => {
        if (title === 'Marca'){
            checkList = brandCheckList;
        }
        else if (title === 'Categoría'){
            checkList = categoryCheckList;
        }
        if (!checkList.includes(checked)) {
            checkList.push(checked);
        }
        else {
            checkList = checkList.filter(item => item != checked);
            }   
        setFilt(checkList);
      }, [checked]);

    return (
        <>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
            {
                options.map((item, index) =>
                    <div className="form-check" key={index}>
                        <FilterCheckbox onFilterChecked ={setChecked} option={item} check={check}/>
                    </div>
                )
            }
            </Accordion.Body>
        </>
    );

}
