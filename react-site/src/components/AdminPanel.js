import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./AdminPanel.css";
import "./main-container.css";
import { API_URL } from '../utils/config';


const fileTypes = ["JPG", "PNG", "GIF"];


function AdminPanel() {
  const [GoToProduct, setGoToProduct] = useState(false);
  const [productID, setProductID] = useState();
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList({});
  }, []);

  function getProductList(filters_list) {
    axios.post(
      `${API_URL}/catalog/product_list`,
      filters_list,
      { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
    ).then(res => {
      if (res.status === 200) {
        setProducts(res.data["product_list"]);
      }
    }).catch(err => { });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const product_name = document.getElementById("product_name").value;
    const product_cost = document.getElementById("product_cost").value;
    const product_count = document.getElementById("product_count").value;
    const product_description = document.getElementById("product_description").value;

    if (product_name === '' || product_cost === '' || product_description === '') {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append("name", product_name);
    formData.append("cost", product_cost);
    formData.append("description", product_description);
    formData.append("items_count", product_count);
    formData.append("product_image", file);

    axios.post(
      `${API_URL}/admin/products/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${Cookies.get('access_token')}`
        }
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

  const decrease_count = async (productId, currentCount) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/products/${productId}/`,
        {
          items_count: currentCount - 1
        },
        { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
      );
      if (response.status === 200) {
        getProductList({});
      }
    } catch (error) {
      console.error("Error decreasing count:", error);
    }
  }

  const increase_count = async (productId, currentCount) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/products/${productId}/`,
        {
          items_count: currentCount + 1
        },
        { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
      );
      if (response.status === 200) {
        getProductList({});
      }
    } catch (error) {
      console.error("Error decreasing count:", error);
    }
  }


  const remove_product = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/admin/products/${productId}/`,
        { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
      );
      if (response.status === 200) {
        getProductList({});
      }
    } catch (error) {
      console.error("Error increasing count:", error);
    }
  };

  function apply_filters() {
    var in_stock = document.getElementById("admin_products_filter_in_stock").checked;
    var product_name_template = document.getElementById("admin_products_filter_by_name").value;

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

  const update_product = async (productId) => {
    const product_name = document.getElementById("product_name_update").value;
    const product_cost = document.getElementById("product_cost_update").value;
    const product_description = document.getElementById("product_description_update").value;

    if (product_name === '' || product_cost === '' || product_description === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/admin/products/${productId}/`,
        {
          name: product_name,
          cost: product_cost,
          description: product_description
        },
        { headers: { "Authorization": `Bearer ${Cookies.get('access_token')}` } }
      );
      if (response.status === 200) {
        getProductList({});
      }
    } catch (error) {
      console.error("Error decreasing count:", error);
    }
  }

  if (GoToProduct) {
    return <Navigate to={"/catalog/" + productID} />
  }

  return (
    <div>
      <div className="main_container">
        <div className="admin_inner">
          <h2 className="admin_title">Create new product</h2>
          <form className="product_creation_form" onSubmit={handleSubmit}>
            <input className="form_item" id="product_name" type="text" placeholder="Name" />
            <input className="form_item" id="product_cost" type="number" placeholder="Cost" />
            <input className="form_item" id="product_count" type="number" placeholder="Product count" />
            <textarea className="form_item" id="product_description" placeholder="Description"></textarea>
            <div className="file_uploader_container">
              <center>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              </center>
              <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
            </div>
            <input className="form_item form_submit" type="submit" value="Add product" />
          </form>

          <h2 style={{ marginTop: "50px" }} className="admin_title">Update product data</h2>
          <div className="products_filtration_container">
            <label for="admin_products_filter_in_stock">In stock</label>
            <input type="checkbox" id="admin_products_filter_in_stock" defaultChecked />
            <input type="text" placeholder="Product name" id="admin_products_filter_by_name" />
            <input type="button" value="Apply filters" className="apply_filters_button" onClick={apply_filters} />
          </div>
          <div className="product_modification_container">
            {Array.isArray(products) && products.length > 0 ? (
              products.map(item => (
                <div className="admin_product_item">
                  <div>
                    <div className="admin_product_modification_area">
                      <input type="text" defaultValue={item.name} placeholder="Product name" id="product_name_update"></input>
                      <input type="number" defaultValue={item.cost} placeholder="Items count" id="product_cost_update"></input>
                      <textarea defaultValue={item.description} placeholder="Product description" id="product_description_update"></textarea>
                    </div>
                  </div>
                  <div className="admin_product_item_controls">
                    <div className="basket_view_controller minus" onClick={() => decrease_count(item.product_id, item.items_count)}></div>
                    <div className="product_counter">{item.items_count}</div>
                    <div className="basket_view_controller plus" onClick={() => increase_count(item.product_id, item.items_count)}></div>
                    <FontAwesomeIcon icon={faXmark} className="remove_item_button" size="3x" onClick={() => remove_product(item.product_id)} />
                  </div>
                  <button style={{ marginTop: "10px" }} className="form_item form_submit" onClick={() => update_product(item.product_id)}>Update</button>
                  <hr />
                </div>
              ))
            ) : (
              <p style={{ color: "#bbbbbb" }}>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default AdminPanel;
