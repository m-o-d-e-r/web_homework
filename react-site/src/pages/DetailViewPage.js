import {useParams} from "react-router-dom";
import React from 'react';
import Header from "../components/Header";
import DetailView from "../components/DetailView";
import Footer from "../components/Footer";


function DetailViewPage() {
    let { id } = useParams();

    return (
        <div className="general_container">
            <Header />
            <DetailView product_id={id}/>
            <Footer />
        </div>
    );
}

export default DetailViewPage;
