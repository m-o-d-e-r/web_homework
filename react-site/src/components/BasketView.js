import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie';
import axios from 'axios';
import "./BasketView.css"
import "./main-container.css"
import { API_URL } from '../utils/config';


function BasketView() {
    const access_token = Cookies.get('access_token');
    const [basketData, setBasketData] = useState([]);
    const [summaryCost, setSummaryCost] = useState(0);

    const fetchBasketData = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/basket/`,
                { headers: { "Authorization": `Bearer ${access_token}` } }
            );
            if (response.status === 200) {
                const basketItems = response.data["products"];
                const detailedItems = await Promise.all(basketItems.map(async (item) => {
                    const productDetailResponse = await axios.get(
                        `${API_URL}/catalog/detail/${item.product_id}`,
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

    useEffect(() => {
        const totalCost = basketData.reduce((acc, item) => {
            return acc + item.productCost * item.count;
        }, 0);
        setSummaryCost(totalCost);
    }, [basketData]);

    const decrease_count = async (productId, currentCount) => {
        try {
            const response = await axios.post(
                `${API_URL}/basket/update_count`,
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
                `${API_URL}/basket/update_count`,
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
                `${API_URL}/basket/remove`,
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

    const order_products = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/basket/buy_products`,
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
            <div className="main_container">
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
                    {
                        basketData.length > 0 ? (
                            <div className="order_button_container">
                                <div className="order_summary_info">
                                    <h4>Final cost: ${summaryCost}</h4>
                                </div>

                                <button className="order_button" onClick={order_products}>Order</button>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default BasketView;
