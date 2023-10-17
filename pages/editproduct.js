import React, { useState, useEffect } from 'react';
import style from '../styles/form.module.css';

export default function EditProduct() {
    const [displayTable, setDisplayTable] = useState(false);
    const [items, setItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isUpdate, setIsupdate] = useState(false);


    const apiUrl = "http://localhost:8055/items/product";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 0B8pGyJ-BJHG9KQVsYGXhq07fIt_H3JS");
    useEffect(() => {
        const handleRead = () => {
            fetch(apiUrl, {
                headers: myHeaders,
            })
                .then((response) => response.json())
                .then((data) => {
                    setItems(data.data);
                    setDisplayTable(true);
                });
        };
        handleRead();
        setIsupdate(false);
    }, [isUpdate]);
    const handleEdit = (product) => {
        setEditMode(true);
        setProductToEdit(product);
    };

    const handleSaveEdit = async () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 0B8pGyJ-BJHG9KQVsYGXhq07fIt_H3JS`,
        };
        const body = {
            Product_Name: productToEdit.Product_Name ?? productToEdit.Product_Name,
            Product_Price: productToEdit.Product_Price ?? productToEdit.Product_Price,
            Product_quantity: productToEdit.Product_quantity ?? productToEdit.Product_quantity,
        };
        console.log(body);
        let requestOptions = {
            method: 'PATCH',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(body)
        };
        const response = await fetch(`http://localhost:8055/items/product/${productToEdit.id}`, requestOptions);
        console.log(response);

        setItems((prevItems) => prevItems.map(item =>
            item.id === productToEdit.id ? productToEdit : item
        ));
        setIsupdate(true);
        setEditMode(false);
        setProductToEdit(null);
        console.log(productToEdit);

    };

    const handleDelete = async (productId) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 0B8pGyJ-BJHG9KQVsYGXhq07fIt_H3JS`,
        };
        let requestOptions = {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow',
        };
        await fetch(`http://localhost:8055/items/product/${productId}`, requestOptions);
        setItems((prevItems) => prevItems.filter(item => item.id !== productId));


    };

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setProductToEdit(prevProduct => ({
            ...prevProduct,
            [key]: value,
        }));
        console.log(productToEdit);
    };

    return (
        <>
            {/* <button onClick={handleRead} className={style.button}>Read Items</button> */}
            {displayTable && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product name</th>
                            <th>Product price</th>
                            <th>Product quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {editMode && productToEdit?.id === item.id ? (
                                        <input
                                            type="text"
                                            value={productToEdit.Product_Name}
                                            onChange={(e) => handleInputChange(e, 'Product_Name')}
                                        />
                                    ) : (
                                        item.Product_Name
                                    )}
                                </td>
                                <td>
                                    {editMode && productToEdit?.id === item.id ? (
                                        <input
                                            type="text"
                                            value={productToEdit.Product_Price}
                                            onChange={(e) => handleInputChange(e, 'Product_Price')}
                                        />
                                    ) : (
                                        item.Product_Price
                                    )}
                                </td>
                                <td>
                                    {editMode && productToEdit?.id === item.id ? (
                                        <input
                                            type="text"
                                            value={productToEdit.Product_quantity}
                                            onChange={(e) => handleInputChange(e, 'Product_quantity')}
                                        />
                                    ) : (
                                        item.Product_quantity
                                    )}
                                </td>
                                <td>
                                    {editMode && productToEdit?.id === item.id ? (
                                        <>
                                            <button onClick={handleSaveEdit}>Save</button>
                                            <button onClick={() => setEditMode(false)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(item)}>Edit</button>
                                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
