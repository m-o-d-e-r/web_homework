import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./Catalog.css";
import { API_URL } from '../utils/config';


function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post(
            `${API_URL}/catalog/product_list`,
            {},
            { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
        ).then(res => {
            if (res.status === 200) {
                setProducts(res.data["product_list"]);
            }
        }).catch(err => {});
    }, []);

    return (
        <section className="main_container">
            <div className="products_container_inner">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(item => (
                        <a className="product_item" href={'/catalog/' + item.product_id}>
                            <img className="product_item_img" src={`${API_URL}/catalog/files/${item.product_id}`} alt={item.name} />
                            <div style={{padding: "20px"}}>
                                <h3>{item.name}</h3>
                                <p>${item.cost}</p>
                                <p>{item.description}</p> <br />
                            </div>
                        </a>
                    ))
                ) : (
                    <p style={{color: "#bbbbbb"}}>No products available</p>
                )}
            </div>
        </section>
    );
}

export default Catalog;
