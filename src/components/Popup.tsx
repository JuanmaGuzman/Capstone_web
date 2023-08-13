import React from 'react'
import '../styles/Popup.css'


const Popup = (props: any) => {

	return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>x</button>
                { props.children }
            </div>
        </div>
    ) : <p> </p>;
}

export default Popup