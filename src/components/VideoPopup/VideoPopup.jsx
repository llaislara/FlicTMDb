import PropTypes from 'prop-types';
import './videopopup.css';
import ReactPlayer from 'react-player/youtube';
import { IoCloseCircleOutline } from "react-icons/io5";



const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`video-popup ${show ? 'visible' : ''}`}>
            <div className="opacity-layer" onClick={hidePopup}></div>
            <div className="video-player">
                <span className="close-btn" onClick={hidePopup}>
                    <IoCloseCircleOutline />
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

VideoPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    videoId: PropTypes.string,
    setVideoId: PropTypes.func.isRequired,
};

export default VideoPopup;
