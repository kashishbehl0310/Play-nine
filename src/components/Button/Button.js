import React from 'react';
import '../../bootstrap.min.css';

var FontAwesome = require('react-fontawesome');

const Button = (props) => {
    let button;
    switch(props.answerIsCorrect){
        case true:
            button = (
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <FontAwesome name="check" />
                </button>
            )
            break;
        case false: 
            button = (
                <button className="btn bt-danger">
                    <FontAwesome name="times" />
            </button> )
            break;
        default:
            button = (
            <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button> )
                break;
    }
    return(
        <div className="col-md-2 text-center">
            {button}
            <br />
            <br />
            <button className="btn btn-warning" onClick={props.redraw}
                disabled={props.redraws === 0}>
                <FontAwesome name="refresh" /> {props.redraws}
            </button>
        </div>
    )
}
export default Button;