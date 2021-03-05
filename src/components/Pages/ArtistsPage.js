import { getByPlaceholderText } from '@testing-library/react';
import React from 'react';
import Navbar from "../Navbar/Navbar";
import Genre from './PageFunctions/genre';


const ArtistsPage  = () => {
    const data = [
        {
            genre: 'Pop',
            artists: 
            [
                { img: 'test1.png', name: 'person1', },
                { img: 'test2.png', name: 'person2', },
            ]
        },
        {
            genre: 'Rock',
            artists: 
            [
                { img: 'test3.png', name: 'person3', },
                { img: 'test4.png', name: 'person4', },
            ]
        },
    ];

    return <div><Navbar/>
                <h1 className="main-heading">
                    {data.map((obj, index) => {
                        return <Genre key = {obj.genre} {...obj}>
                        </Genre>;
                    })}   
                </h1>
            </div>;
   };
   
   export default ArtistsPage;