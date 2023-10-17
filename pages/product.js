import { useState, useEffect } from "react";
import style from "../styles/form.module.css";
import { useRouter } from "next/router";

export default function Product() {
    const [ProductName, setProductName] = useState("");
    const [ProductPrice, setProductPrice] = useState("");
    const [ProductQuntity, setProductQuntity] = useState("");
    const [showPopup, setShowPopup] = useState(null);

    const apiUrl = "http://localhost:8055/items/product";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer apikey");

    const handleProductName = (event) => {
        setProductName(event.target.value);
    };
    const handleProductPrice = (event) => {
        setProductPrice(event.target.value);
    };
    const handleProductQuntity = (event) => {
        setProductQuntity(event.target.value);
    };

    const createProduct = async () => {
        // const id = Math.floor(Math.random() * Date.now())
        const newItem = {
            Product_Name: ProductName,
            Product_Price: ProductPrice,
            Product_quantity: ProductQuntity,
        };
        await fetch(apiUrl, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newItem),
        }).then((response) => response.status)
            .then((data) => {
                console.log("Created item:", data);
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
                etProductName("");
                setProductPrice("");
                setProductQuntity("");
            });
    };
    return (
        <>
            <div>
                <h1>Create Product</h1>
                <form>
                    <div>
                        <input type="text" onChange={handleProductName} placeholder="enter product name" />
                        <br />
                        <input type="text" onChange={handleProductPrice} placeholder="product price" />
                        <br />
                        <input type="text" onChange={handleProductQuntity} placeholder="product quanity" />
                    </div>
                    <button onClick={createProduct}>Create Product</button>
                </form>
                {showPopup && <div>Item created successfully!</div>}
            </div>
        </>
    );
}
