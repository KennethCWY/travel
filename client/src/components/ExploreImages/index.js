import React, { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router';

const ExploreImages = () => {
    const [location, setLocation] = useState('');
    const history = useHistory();

    const redirectDubai = () => {
        setLocation('Dubai');
        history.push('/flights');
    };

    const redirectItaly = () => {
        setLocation('Italy');
        history.push('/flights');
    };

    const redirectNorway = () => {
        setLocation('Norway');
        history.push('/flights');
    };

    const redirectTokyo = () => {
        setLocation('Tokyo');
        history.push('/flights');
    };

    const redirectIndia = () => {
        setLocation('India');
        history.push('/flights');
    };

    const redirectGreece = () => {
        setLocation('Greece');
        history.push('/flights');
    };

    return (
        <div className="image-container box-shadow-below-hover">
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img
                        src="https://glitterrebel.com/wp-content/uploads/2020/05/best-luxury-yacht-tours-in-dubai-hero.jpg"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Dubai"
                        onClick={redirectDubai}
                    />

                    <img
                        src="https://www.lifeinnorway.net/wp-content/uploads/2018/02/norwegian-lifestyle-facts.jpg"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Norway"
                        onClick={redirectNorway}
                    />
                </div>

                <div className="col-lg-4 mb-4 mb-lg-0">
                    <img
                        src="https://lp-cms-production.imgix.net/features/2017/11/GettyRF_543346423-1-ab159824d5bd.jpg?auto=compress&fit=crop&fm=auto&sharp=10&vib=20&w=1200&h=800"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Italy"
                        onClick={redirectItaly}
                    />

                    <img
                        src="https://p0.piqsels.com/preview/660/121/257/taj-mahal-agra-india-during-daytime.jpg"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="India"
                        onClick={redirectIndia}
                    />
                </div>

                <div className="col-lg-4 mb-4 mb-lg-0">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/03/18/02/29/tokyo-4942411_1280.jpg"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Tokyo"
                        onClick={redirectTokyo}
                    />

                    <img
                        src="https://live.staticflickr.com/4688/38051518795_b3aafa8858_b.jpg"
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Greece"
                        onClick={redirectGreece}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExploreImages;
