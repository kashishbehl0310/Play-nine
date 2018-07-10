import React from 'react';
import '../../bootstrap.min.css';

const Answer = (props) => {
    return(
        <div className="col-md-5">
            {props.selectedNumbers.map((number, i) => (
            <span
                 key={i}
                    className="numbers-span"
                    onClick={() => props.unselectNumber(number)}
            >
                {number}
            </span>
            ))}
        </div>
    )
}

export default Answer;