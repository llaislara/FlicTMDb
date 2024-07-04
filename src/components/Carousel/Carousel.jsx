import { useRef, useState } from "react";
import "./carousel.css";
import { PiArrowFatLeftFill, PiArrowFatRightFill  } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Img from "../LazyLoad/Img";
import PosterFallback from "../../assets/no-poster.png";
import MovieRate from "../MovieRate/MovieRate";
import Genres from "../Genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - carouselContainer.current.offsetLeft);
    setScrollLeft(carouselContainer.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.current.offsetLeft;
    const walk = (x - startX) * 3; 
    carouselContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselContainer.current.offsetLeft);
    setScrollLeft(carouselContainer.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselContainer.current.offsetLeft;
    const walk = (x - startX) * 1; 
    carouselContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const handleScrollLeft = () => {
    if (carouselContainer.current) {
      carouselContainer.current.scrollLeft -= 200; 
    }
  };

  const handleScrollRight = () => {
    if (carouselContainer.current) {
      carouselContainer.current.scrollLeft += 200; 
    }
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {title && <div className="section-title p-title">{title}</div>}
        <PiArrowFatLeftFill 
          className="carouselLeftNav arrow"
          onClick={handleScrollLeft}
        />
        <PiArrowFatRightFill 
          className="carouselRighttNav arrow"
          onClick={handleScrollRight}
        />
        {!loading ? (
          <div
            className="carouselItems"
            ref={carouselContainer}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} className="poster-img" />
                    <MovieRate rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton container">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
