import React from 'react'
import loadingGid from '../images/loadingGif.gif'
const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader_image">
            <img src={loadingGid} alt="" />
        </div>
    </div>
  )
}

export default Loader