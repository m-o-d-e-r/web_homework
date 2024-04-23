import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import "./AdminPanel.css";
import "./main-container.css";
import { API_URL } from '../utils/config';


const fileTypes = ["JPG", "PNG", "GIF"];


function AdminPanel() {
    const [GoToProduct, setGoToProduct] = useState(false);
    const [productID, setProductID] = useState();
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const product_name = document.getElementById("product_name").value;
        const product_cost = document.getElementById("product_cost").value;
        const product_description = document.getElementById("product_description").value;

        if (product_name === '' || product_cost === '' || product_description === '') {
            alert('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append("name", product_name);
        formData.append("cost", product_cost);
        formData.append("description", product_description);
        formData.append("product_image", file);

        axios.post(
            `${API_URL}/admin/add_product`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`}
            }
        ).then(res => {
            if (res.status === 200) {
                setProductID(res.data["product_id"]);
                setGoToProduct(true);
            }
        });
    };

    const handleChange = (file) => {
        setFile(file);
    };

    if (GoToProduct) {
        return <Navigate to={"/catalog/" + productID} />
    }

    return (
        <div>
            <div className="main_container">
                <div className="admin_inner">
                    <h2 className="admin_title">Admin panel</h2>
                    <form className="product_creation_form" onSubmit={handleSubmit}>
                        <input className="form_item" id="product_name" type="text" placeholder="Name" />
                        <input className="form_item" id="product_cost" type="number" placeholder="Cost" />
                        <textarea className="form_item" id="product_description" placeholder="Description"></textarea>
                        <div className="file_uploader_container">
                            <center>
                                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            </center>
                            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
                        </div>
                        <input className="form_item form_submit" type="submit" value="Add product" />
                    </form>
                </div>
            </div>
        </div>
    );
}


export default AdminPanel;
