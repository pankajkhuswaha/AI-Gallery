import { Loader } from '@/components';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const intial = { prompt: "", url: "/img.png", postedBy: "Pankaj", userimage: "/logo.png" }
  const [inputVal, setInputVal] = useState(intial);
  const [loading, setLoading] = useState(false);


  const handleimg = (e) => {
    const file = e.target.files[0]
    // console.log(e.target.files[0])
    const reader = new FileReader();
    if (file.type.includes("image")) {
      reader.onload = (e) => {
        // console.log(e.target.result)
        setInputVal({ ...inputVal, url: e.target.result })
      }
      reader.readAsDataURL(file)
    }
    else {
      toast.error("Pleaae upload image only which is lesser than 3MB")
    }
  }


  const submithandle = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await fetch('https://aigallery-pk.netlify.app/api/post/addpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputVal),
      });
      setLoading(false)
      toast.success("Added sucessfully")
      setInputVal(intial)
      // setInputVal({...inputVal,prompt:""})
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }
  return (
    <>
      <Toaster />
      { loading && (
        <div className="absolute inset-0 z-[60] flex justify-center h-[130vh] items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
          <Loader />
        </div>
      )}
      <div className='flex justify-center items-center max-sm:my-16 w-[97vw] h-[100vh] z-0'>
        <div className='border-2 shadow-md shadow-white w-4/5 sm:w-[30%] min-h-[400px] flex flex-col max-sm:mb-16 gap-4 max-sm:p-6 sm:p-10 rounded-md justify-center'>
          <div className='w-full max-sm:flex-col flex gap-4 items-center justify-center'>
            <form onSubmit={(e) => submithandle(e)} className='flex flex-col gap-2 ' >
              <div className='flex cursor-pointer overflow-hidden justify-center flex-col items-center'>
                <div className="relative cursor-pointer bg-transparent  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full flex  justify-center items-center">
                  <img
                    src={inputVal.url}
                    alt={inputVal.prompt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <input onChange={(e) => handleimg(e)} className='h-60 absolute opacity-0' type="file" />
              </div>
              <div className="inputGroup">
                <input onChange={(e) => setInputVal({ ...inputVal, prompt: e.target.value })} type="text" required placeholder='Enter Prompt' />
              </div>

              <button className='bg-blue-600 p-2 rounded-md' type='submit'>Add Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp