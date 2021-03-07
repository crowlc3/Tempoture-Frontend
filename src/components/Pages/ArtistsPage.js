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
                { img: 'test3.png', name: 'person3', },
            ]
        },
        {
            genre: 'Rock',
            artists: 
            [
                { img: 'test4.png', name: 'person4', },
                { img: 'test5.png', name: 'person5', },
                { img: 'test6.png', name: 'person6', },
            ]
        },
    ];

    return <div><Navbar/>
                <div>
                    {data.map((obj, index) => {
                        return <Genre key = {obj.genre} {...obj}>
                        </Genre>;
                    })}   
                </div>
            </div>;
   };
   
   export default ArtistsPage;