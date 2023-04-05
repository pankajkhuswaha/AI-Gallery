import React from 'react';

const Card = ({ _id, postedBy,userimage, prompt, imageurl }) => (
  <>
    <div className='w-full h-fit flex items-center justify-center m-2'>
    <div className="rounded-md group relative shadow-card cursor-zoom-in transition-all delay-75  hover:shadow-cardhover card w-[90%] mb-2 ">
    <img
      className="h-auto object-cover rounded-md"
      src={imageurl}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-2 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold" src={userimage}/>
          <p className="text-white text-sm">{postedBy}</p>
        </div>
        {/* <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button> */}
      </div>
    </div>
  </div>
    </div>
  </>
);

export default Card;