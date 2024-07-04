import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import Img from '../../components/LazyLoad/Img';
import Trending from '../../components/Trending/Trending';
import Popular from '../../components/Popular/Popular';
import TopRated from '../../components/TopRated/TopRated';
import VideoPopup from '../../components/VideoPopup/VideoPopup';
import { IoPlayOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";


const keyAPI = 'aeaa2a4339ffb122a72ee5bf75938913';

const Home = () => {
  const [background, setBackground] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoId, setVideoId] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    if (data?.results?.length > 0) {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      const bg = url.backdrop + randomMovie.backdrop_path;
      setBackground(bg);
      setSelectedMovie(randomMovie);
    }
  }, [data, url.backdrop]);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (selectedMovie) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${keyAPI}`
        );
        const trailerData = await response.json();
        const trailer = trailerData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setVideoId(trailer.key);
        }
      }
    };

    fetchTrailer();
  }, [selectedMovie]);

  const handleSeeMore = () => {
    if (selectedMovie) {
      navigate(`/movie/${selectedMovie.id}`);
    }
  };

  const handleWatchTrailer = () => {
    setShowVideoPopup(true);
  };

  return (
    <>
      <section className="section home">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>
        <div className="home-container container">
          <div className="home-content">
            {selectedMovie ? (
              <h3 className="home-title">
                {selectedMovie.title}
              </h3>
            ) : (
              <h3 className="home-title"> </h3>
            )}
            {selectedMovie && (
              <div className="button-group">
                <button className="home-btn-see-more" onClick={handleSeeMore} style={{width: 200}}>
                  <IoIosAdd />
                  See More
                </button>
                <button className="home-btn-trailer" onClick={handleWatchTrailer} style={{width: 200}}>
                  <IoPlayOutline />
                  Watch Trailer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Trending />
      <Popular />
      <TopRated />

      <VideoPopup
        show={showVideoPopup}
        setShow={setShowVideoPopup}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  );
}

export default Home;
