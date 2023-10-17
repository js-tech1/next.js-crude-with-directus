import { useState, useEffect } from 'react';
import style from '../styles/form.module.css'

export default function Viewproduct() {
    const [displayTable, setDisplayTable] = useState(false);
    const [items, setItems] = useState([]);

    const apiUrl = "http://localhost:8055/items/product";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 0B8pGyJ-BJHG9KQVsYGXhq07fIt_H3JS");

    const handleRead = () => {
        fetch(apiUrl, {
            headers: myHeaders,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setItems(JSON.stringify(data.data));
                setDisplayTable(!displayTable);
            });
    };
    return (
        <>
            <button onClick={handleRead} className={style.button}>Read Items</button>
            {displayTable && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product name</th>
                            <th>product price</th>
                            <th>product quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {JSON.parse(items).map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.Product_Name}</td>
                                <td>{item.Product_Price}</td>
                                <td>{item.Product_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}