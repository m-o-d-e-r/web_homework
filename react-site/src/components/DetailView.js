import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./DetailView.css";


const DetailView = (props) => {
    const [product, setProduct] = useState({});
    const [inBasket, setInBasket] = useState(false);

    useEffect(() => {
        axios.get(
            `http://localhost:8080/catalog/detail/${props.product_id}`,
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
            `http://localhost:8080/basket/contains`,
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
            `http://localhost:8080/basket/push_product`,
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
        <div className="detail_view_container">
            <div className="detail_view_inner">
                <div className="detail_product_item">
                    <img className="product_item_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXqqfA8GAwIIFZKPDlqjpzhbCgnPvnBFVuXQhvIyGbg&s"} alt={product.name} />
                    <div className="product_meta">
                        <h3>{product.name}</h3>
                        <p>${product.cost}</p>
                        <p>{product.description}</p> <br />
                        <button className="add_product_button" onClick={add_to_basket} disabled={inBasket}>Add to basket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
