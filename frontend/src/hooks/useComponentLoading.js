import React from "react"

export const useComponentLoading = () =>{

    return () => {
        return <div className='loading'>
                    <p>Carregando...</p>
                    <p>Carregando...</p>
                </div>
        
    }

}
