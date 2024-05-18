import './ExplosionOptimizada.css';
import React from 'react';

function ExplosionOptimizada(){
    return (
        <div className="explosion">
            {[...Array(9)].map((_, i) => (
                <div className="parte" key={i} style={{ animationDelay: `${0.1 + i * 0.02}s` }}></div>
            ))}
            {[...Array(5)].map((_, i) => (
                <div className="ember" key={i} id={`ember${i+1}`} style={{ '--x-offset': `${10 * (i + 1)}px`, '--y-offset': `${-10 * (i + 1)}px` }}></div>
            ))}
        </div>
    );
}

export default ExplosionOptimizada;
