import React, { useEffect, useState } from 'react';

import { Card, Loader } from './index';
import { Toaster, toast } from 'react-hot-toast';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://aigallery-pk.netlify.app/api/post/getpost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.ok) {
        const result = await response.json();
        setAllPosts(result?.reverse());
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(allPosts)

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.postedBy.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        console.log(searchResult)
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto my-20">
      <Toaster position="top-right"
        reverseOrder={false} />
      <div>
        <h1 className="font-extrabold text-[#ffff] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      <div className="mt-16 inputGroup w-full flex flex-col gap-2">
        <input type="text" value={searchText} onChange={(e) => handleSearchChange(e)} required="" placeholder='    search....' />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#e10c0c]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (<>
                {/* <MasonaryLayout posts={allPosts}/> */}
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                /></>
              ) : (<>
                {/* <MasonaryLayout posts={allPosts}/> */}
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                /></>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
