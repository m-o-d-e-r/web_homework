import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import "./AdminPanel.css"
import { API_URL } from '../utils/config';


function AdminPanel() {
    const [GoToProduct, setGoToProduct] = useState(false);
    const [productID, setProductID] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        const product_name = document.getElementById("product_name").value;
        const product_cost = document.getElementById("product_cost").value;
        const product_description = document.getElementById("product_description").value;

        if (product_name === '' || product_cost === '' || product_description === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post(
            `${API_URL}/admin/add_product`,
            {
                "name": product_name,
                "cost": product_cost,
                "description": product_description
            },
            { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
        ).then(res => {
            if (res.status === 200) {
                setProductID(res.data["product_id"]);
                setGoToProduct(true);
            }
        });
    };

    if (GoToProduct) {
        return <Navigate to={"/catalog/" + productID} />
    }

    return (
        <div>
            <div className="admin_container">
                <div className="admin_inner">
                    <h2 className="admin_title">Admin panel</h2>
                    <form className="product_creation_form" onSubmit={handleSubmit}>
                        <input className="form_item" id="product_name" type="text" placeholder="Name" />
                        <input className="form_item" id="product_cost" type="float" placeholder="Cost" />
                        <textarea className="form_item" id="product_description" placeholder="Description"></textarea>
                        <input className="form_item form_submit" type="submit" value="Add product" />
                    </form>
                </div>
            </div>
        </div>
    );
}


export default AdminPanel;
