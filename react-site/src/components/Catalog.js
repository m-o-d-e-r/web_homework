import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./Catalog.css";
import { API_URL } from '../utils/config';


function Catalog() {
    const [products, setProducts] = useState([]);

    function getProductList(products_filter) {
        axios.post(
            `${API_URL}/catalog/product_list`,
            products_filter,
            { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
        ).then(res => {
            if (res.status === 200) {
                setProducts(res.data["product_list"]);
            }
        }).catch(err => {});
    }

    useEffect(() => {
        getProductList(
            {
                "in_stock": true
            }
        );
    }, []);

    function apply_filters() {
        var in_stock = document.getElementById("products_filter_in_stock").checked;
        var product_name_template = document.getElementById("products_filter_by_name").value;

        if (product_name_template === "") {
            product_name_template = null;
        }

        getProductList(
            {
                "in_stock": in_stock,
                "name": product_name_template
            }
        );
    }

    return (
        <section className="main_container">
            <div className="products_filtration_container">
                <label for="products_filter_in_stock">In stock</label>
                <input type="checkbox" id="products_filter_in_stock" defaultChecked />
                <input type="text" placeholder="Product name" id="products_filter_by_name" />
                <input type="button" value="Apply filters" className="apply_filters_button" onClick={apply_filters} />
            </div>
            <div className="products_container_inner">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(item => (
                        <a className="product_item" href={'/catalog/' + item.product_id}>
                            <img className="product_item_img" src={`${API_URL}/catalog/files/${item.product_id}`} alt={item.name} />
                            <div style={{padding: "20px", textAlign: "left"}}>
                                <h3>{item.name}</h3>
                                <p>${item.cost}</p>
                                <p>{item.description.slice(0, 100)}...</p> <br />
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
