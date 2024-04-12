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
        <section className="products_container">
            <div className="products_container_inner">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(item => (
                        <div className="product_item">
                            <img className="product_item_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXqqfA8GAwIIFZKPDlqjpzhbCgnPvnBFVuXQhvIyGbg&s"} alt={item.name} />
                            <div style={{padding: "20px"}}>
                                <a style={{textDecoration: "none", color: "#2a2f3a"}} href={'/catalog/' + item.product_id}><h3>{item.name}</h3></a>
                                <p>${item.cost}</p>
                                <p>{item.description}</p> <br />
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{color: "#bbbbbb"}}>No products available</p>
                )}
            </div>
        </section>
    );
}

export default Catalog;
