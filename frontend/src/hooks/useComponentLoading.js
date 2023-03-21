import React from "react"
import LodingImage from '../loading.png'

export const useComponentLoading = () =>{

    return () => {
        return <div className='loading'>
                    <p>Carregando... </p>
                    {/* <img src={LodingImage} alt="teste" /> */}
                </div>
        
    }

}
