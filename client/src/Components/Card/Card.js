import React from "react";
import './Card.css'

export default function Card({ name, image, types }) {
    return (
        <div className='father-Card'>
            <div className='card'>
                <div className="content-card">
                    <h3 className='card-title'>{name}</h3>
                    <img className='card-image' src={image} alt={name} />
                    {types.map((type, index) => (
                        <h4 className='card-Type' key={index}>{type}</h4>
                    ))}
                </div>
            </div>
        </div>
    );
}

