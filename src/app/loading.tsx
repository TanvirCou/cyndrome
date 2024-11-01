import Image from 'next/image'
import React from 'react'
import loadingGif from "../../public/Loading_gif.gif"

const loading = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <Image src={loadingGif} alt='Loading...' width={300} height={300} />
    </div>
  )
}

export default loading