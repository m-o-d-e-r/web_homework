import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie';
import axios from 'axios';
import "./BasketView.css"

function BasketView() {
    const access_token = Cookies.get('access_token');
    const [basketData, setBasketData] = useState([]);

    const fetchBasketData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/basket/`,
                { headers: { "Authorization": `Bearer ${access_token}` } }
            );
            if (response.status === 200) {
                const basketItems = response.data["products"];
                const detailedItems = await Promise.all(basketItems.map(async (item) => {
                    const productDetailResponse = await axios.get(
                        `http://localhost:8080/catalog/detail/${item.product_id}`,
                        { headers: { "Authorization": `Bearer ${access_token}` } }
                    );
                    if (productDetailResponse.status === 200) {
                        return {
                            ...item,
                            productName: productDetailResponse.data.name,
                            productCost: productDetailResponse.data.cost
                        };
                    }
                }));
                setBasketData(detailedItems);
            }
        } catch (error) {
            console.error("Error fetching basket data:", error);
        }
    };

    useEffect(() => {
        fetchBasketData();
    }, [access_token]);

    const decrease_count = async (productId, currentCount) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/basket/update_count`,
                {
                    product_id: productId,
                    count: currentCount - 1
                },
                { headers: { "Authorization": `Bearer ${access_token}` } }
            );
            if (response.status === 200) {
                fetchBasketData();
            }
        } catch (error) {
            console.error("Error decreasing count:", error);
        }
    };
    
    const increase_count = async (productId, currentCount) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/basket/update_count`,
                {
                    product_id: productId,
                    count: currentCount + 1
                },
                { headers: { "Authorization": `Bearer ${access_token}` } }
            );
            if (response.status === 200) {
                fetchBasketData();
            }
        } catch (error) {
            console.error("Error increasing count:", error);
        }
    };

    const remove_product = async (productId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/basket/remove`,
                { product_id: productId },
                { headers: { "Authorization": `Bearer ${access_token}` } }
            );
            if (response.status === 200) {
                fetchBasketData();
            }
        } catch (error) {
            console.error("Error increasing count:", error);
        }
    };
    

    return (
        <div>
            <div className="basket_view_container">
                <div className="basket_view_container_inner">
                    <h2 className="basket_view_title">Basket</h2>
                    <ul className="basket_view_items">
                        {basketData.map((item) => (
                            <li className="basket_view_item" key={item.product_id}>
                                <div className="basket_view_item_meta">
                                    <h3>'{item.productName}'</h3>
                                    <h3>${item.productCost} (${Math.round(item.productCost * item.count)})</h3>
                                </div>
                                <div className="product_counter_controllers">
                                    <div className="basket_view_controller minus" onClick={() => decrease_count(item.product_id, item.count)}></div>
                                    <div className="product_counter">{item.count}</div>
                                    <div className="basket_view_controller plus" onClick={() => increase_count(item.product_id, item.count)}></div>
                                    <FontAwesomeIcon icon={faXmark} className="remove_item_button" size="3x" onClick={() => remove_product(item.product_id)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BasketView;
