import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./DetailView.css";
import "./main-container.css"
import { API_URL } from '../utils/config';


const DetailView = (props) => {
    const [product, setProduct] = useState({});
    const [inBasket, setInBasket] = useState(false);

    useEffect(() => {
        axios.get(
            `${API_URL}/catalog/detail/${props.product_id}`,
            { headers: {"Authorization" : `Bearer ${Cookies.get("access_token")}`} }
        )
        .then(res => {
            if (res.status === 200) {
                setProduct(res.data);
            }
        })
        .catch(error => {
            return;
        });


        axios.post(
            `${API_URL}/basket/contains`,
            { "product_id": parseInt(props.product_id) },
            { headers: {"Authorization" : `Bearer ${Cookies.get("access_token")}`} }
        )
        .then(res => {
            if (res.status === 200) {
                setInBasket(res.data["contains"]);
            }
        })
        .catch(error => {
            return;
        });
    }, [props.product_id]);

    const add_to_basket = () => {
        axios.post(
            `${API_URL}/basket/push_product`,
            {
                "product_id": props.product_id
            },
            {
                headers: {"Authorization" : `Bearer ${Cookies.get("access_token")}`},

            }
        )
        .catch(error => {
            console.error('Error fetching product details:', error);
            alert("Please login first");
        });
        setInBasket(true);
    };


    return (
        <div className="main_container">
            <div className="detail_view_inner">
                <div className="detail_product_item">
                    <img className="detail_product_item_img" src={`${API_URL}/catalog/files/${product.product_id}`} alt={product.name} />
                    <div className="product_meta">
                        <h3>{product.name}</h3>
                        <p>${product.cost}</p>
                        <p>{product.description}</p> <br />
                        <button className={"add_product_button " + (inBasket ? "button_inactive" : "button_active")} onClick={add_to_basket} disabled={inBasket}>Add to basket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
