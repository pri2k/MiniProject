"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";


// Define TypeScript interface for the image object
interface IllusionImage {
  _id: string;
  filename: string;
  question: string;
  options: Record<string, number>; // Example: { "Tree": 3, "Man": 5 }
}

const Display = () => {
  const [images, setImages]= useState([]);
  useEffect (()=>{
    const fetchImages= async() =>{
      try{
        const response =await fetch('api/illusionRoutes');
        const result= await response.json();
        console.log("Fetch images:", result)
        if (result.success){
          setImages(result.illusions);  //this illusions is from the api route file 
        }
        else{
          console.log('Error')
        }
      }
      catch(error){
        console.log(error)
      }
    };
    fetchImages();
  },[])  //here [] it suggests the api will be called only once
  return (
    <>
    <h2>Loading Images</h2>
    {/* <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {
        images.map((image) => (
          <div key={image._id} style={{margin: '10px'}}>
            <img src={`data:${image.filename};base64,${Buffer.from
              (image.data).toString('base64')}`}
              alt={image.filename}
              style={{maxWidth: '100px', maxHeight: '100px'}}>
            </img> </div>
        ))
      }
      </div> */}
    </>
  )
}

export default Display;
