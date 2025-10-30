import { useState } from "react";

const ImageSlider =(props)=>{
    const images =props.images;
    const [activeImage,setactiveImage]= useState(0)

    const handleActiveImage=(i)=>{
        setactiveImage(i);
    }

    return(
        <div className="px-10 flex w-[450px] h-[500px] relative">
            <img src={images[activeImage]} className="h-[400px] w-[400px] object-cover border border-gray-100 rounded-2xl border-2"/>
            <div className="flex absolute bottom-0 w-full left-0 h-[100px] justify-center items-center gap-2">
                {images?.map(
                    (image,i)=>{
                        return(
                            <img 
                                key={i} 
                                src={image} 
                                className={`w-[90px] h-[90px] rounded-2xl object-cover hover:cursor-pointer 
                                ${i===activeImage?"border-acsent border-3":" hover:scale-105 border-3 border-secondary"}
                                `}
                                onClick={()=>handleActiveImage(i)}
                            />
                        )
                    }
                )}
            </div>
            
        </div>
    )
}

export default ImageSlider;