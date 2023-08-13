import '../../styles/NewPost.css'

interface Props {
    value: string,
    handleChange: any,
    placeholder: string,
    type: string,
    name: string,
    min: number,
    max: number
}
const InputProduct = ({ value, handleChange, placeholder, type, name, min, max }: Props) => {
    return (
        <>
        { 
            (min != -1) ? (
                <div>
                    <input
                        type={type}
                        value={value} 
                        onChange={handleChange}  
                        name={name} 
                        placeholder={placeholder}
                        className='input-field'
                        max={max}
                        required
                    />
                </div>
            ) : (
                <div>
                    <input
                        type={type}
                        value={value} 
                        onChange={handleChange}  
                        name={name} 
                        placeholder={placeholder}
                        className='input-field'
                        min={min}
                        required
                    />
                </div> 
            )
        }
        </>
        
    )
}

export default InputProduct;