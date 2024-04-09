import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./BasketView.css"


function BasketView() {
    const [basketData, setBasketData] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8080/basket/`,
            { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
        ).then(res => {
            if (res.status === 200) {
                setBasketData(res.data["basket"]);
            }
        }).catch(err => { });
    }, []);

    return (
        <div>
            <div className="basket_view_container">
                <div className="basket_view_container_inner">
                    <h2 className="basket_view_title">Basket</h2>

                    <ul className="basket_view_items">
                        {basketData.map(item => (
                            <li className="basket_view_item" key={item.product_id}>
                                <div>
                                    {item.product_id}
                                </div>
                                <div className="product_counter_controllers">
                                    <div className="basket_view_controller">-</div>
                                    <div className="product_counter">{item.count}</div>
                                    <div className="basket_view_controller">+</div>
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
