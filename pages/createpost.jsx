import React, { useState } from 'react';
import { Loader } from '../components';
import { useRouter } from 'next/router';
import $ from 'jquery';
import toast, { Toaster } from 'react-hot-toast';


const CreatePost = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        prompt: '',
        photo: ["/img.png"],
    });
    const { prompt } = form
    const [url, setUrl] = useState("")

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const generateImage = async () => {
        if (prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('https://aigallery-pk.netlify.app/api/dalle/image', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt
                    }),
                });
                const data = await response.json();
                // console.log(data)
                if (response.ok) {
                    // TODO openai response code
                    // const images = data.map(ele => ele.url);
                    // setForm({ ...form, photo: images });
                    
                    let img = data.map(ele=>ele.url);
                    let imgurl = img.slice(0,4)
                    setForm({ ...form, photo: imgurl });
                   
                } else {
                    toast.error(data)
                }             
                
            } catch (err) {
                toast.error(err.message);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            toast.error('Please provide proper prompt');
        }
    }
    const selectimg = (e, url) => {
        setUrl(url);
        $(e.target).parent().addClass("border-red-500");
        $(e.target).parent().siblings().removeClass("border-red-500");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if(url.includes("http")){
        try {
            const response = await fetch('https://aigallery-pk.netlify.app/api/dalle/cloud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt, url
                }),
            });
            let urlimage = await response.json();
            setUrl(urlimage);
            let data = {
                postedBy: "Pankaj",
                prompt,
                url:urlimage,
                userimage:"/logo.png"
            }
            try {
                await fetch('https://aigallery-pk.netlify.app/api/post/addpost', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body:JSON.stringify(data),
                  });
                  setLoading(false)
              } catch (err) {
                  toast.error(err.message)
              }

        } catch (error) {
            toast.error(error.message)
        }
    }
    setLoading(false)
             


    };

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <section className="h-[90vh] sm:mx-[10vw] mx-4  my-20 flex flex-col items-center">
                <div className="sm:w-[35vw] w-full h-fit border-2 p-2 py-4 sm:p-10 rounded-md shadow-lg shadow-gray-600 flex flex-col justify-center items-center">
                    <div className='flex flex-col w-full mb-10 '>
                        <h1 className="font-bold text-[#ffffff] text-3xl">Create</h1>
                        <p className="mt-2 text-para text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
                    </div>
                    <form onSubmit={handleSubmit} className='w-4/5 sm:w-full '>

                        <div className='w-full flex flex-wrap max-sm:justify-center gap-4' >
                            {form.photo.map((ele, i) => {
                                return (<div key={i} onClick={(e) => selectimg(e, ele)} className="relative cursor-pointer bg-transparent  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40 h-40 sm:w-64 sm:h-64 flex justify-center items-center">
                                    <img
                                        src={ele}
                                        alt={form.prompt}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>)
                            })}
                            {(generatingImg || loading)&& (
                                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                    <Loader />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col mt-10 justify-center max-sm:items-center w-full">
                            <div className="inputGroup w-full flex flex-col gap-2">
                                <label htmlFor="name" className='text-para mb-2'>Enter Prompt to generate image</label>
                                <input type="text" value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} required="" autoComplete="off" />

                            </div>
                            <div className="flex w-full">
                                <button
                                    type="button"
                                    onClick={generateImage}
                                    className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    {generatingImg ? 'Generating...' : 'Generate'}
                                </button>
                            </div>
                        </div>


                        <div className="mt-10">
                            <p className="mt-2 text-para text-[14px]">** Once you have created the image you want, you can share it with others in the community ** <br /> Select One image from above</p>


                            <button
                                type="submit"
                                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                {loading ? 'Sharing...' : 'Share with the Community'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default CreatePost;
