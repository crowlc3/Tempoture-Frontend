import React from 'react'
import Artist from './artist';

const Genre = ({genre, artists}) => {

    return (
        <div>
            <h7>{genre}</h7>
            <div className="artistlist">
                {artists.map((obj) => {
                    return <Artist {...obj}></Artist>;
                })} 
            </div>
        </div>
    );

};

export default Genre
