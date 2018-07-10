import React from 'react';
import '../../bootstrap.min.css';
import range from 'lodash/range';
import './Numbers.css';

const Numbers = (props) => {
    const numberClassName = (number) => {
        if(props.usedNumbers.indexOf(number) >=0 ){
            return 'used';
        }
        if(props.selectedNumbers.indexOf(number) >=0 ){
            return 'selected';
        }
    }
    return(
        <div className="text-center card">
            <div className="text-center">
                {Numbers.list.map((number, i) => 
                    <span key={i} className={`numbers-span ${numberClassName(number)}`}
                    onClick={() => props.selectNumber(number)}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    )
}
Numbers.list = range(1, 10);
export default Numbers;