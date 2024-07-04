import { useSelector } from 'react-redux';
import Img from '../LazyLoad/Img';
import avatar from '../../assets/avatar.png';
import './cast.css';

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => (
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );

    return (
        <section className="cast">
            <div className="cast-container container">
                {!loading ? (
                    <div className="cast-items">
                        {data?.slice(0, 7).map((item) => {
                            let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                            return (
                                <div key={item.id} className="cast-item">
                                    <div className="cast-img">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="cast-name">{item.name}</div>
                                    <div className="cast-character">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="cast-item">
                                {skeleton()}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cast;
