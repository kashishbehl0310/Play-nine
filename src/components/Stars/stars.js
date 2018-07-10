import React from 'react';
import range from 'lodash/range';
import '../../bootstrap.min.css';
import './stars.css'

var FontAwesome = require('react-fontawesome');

const Stars = (props) => {
    return(
        <div className="col-md-5">
            {range(props.numberOfStars).map(i => 
                <FontAwesome key={i} name="star" className="game-stars" />
            )}
        </div>
    )
}

export default Stars;