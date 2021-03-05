import React from 'react'

const Genre = ({genre, artists}) => {

    return (
        <div>
            <h1>{genre}</h1>
            {artists.map((obj) => {
                return <p>
                    {obj.name}
                </p>;
            })}
        </div>
    );

};

export default Genre
