
import './Catalog.css';
import { useState } from 'react';

interface Props {
    option: string,
    onFilterChecked: (newType: string) => void,
    check: boolean
}

export default function FilterCheckbox({ option, onFilterChecked, check }: Props) {
    
    return (
        <> 
        {
            (check) ? (
                <>
                    <input onChange={(e) => {const { value, checked } = e.target; onFilterChecked(value);}} 
                        className="form-check-input" type="checkbox" value={option} id="flexCheckDefault" checked/>
                    <label className="form-check-label" htmlFor="flexCheckDefault" style={{marginLeft: "5%"}}>
                        {option}
                    </label>
                </>
            ) : (
                <>
                    <input onChange={(e) => {const { value, checked } = e.target; onFilterChecked(value);}} 
                    className="form-check-input" type="checkbox" value={option} id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault" style={{marginLeft: "5%"}}>
                        {option}
                    </label>
                </>
            )
        }
           
        </>
    );
}