import { useState, useEffect } from "react";
import { Typography, Card } from "antd";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  // estado para la suma del precio de los productos
  const [sum, setSum] = useState({});

  // estado para manejar los productos
  const [products, setProducts] = useState([]);
  // estado para el loading
  const [loading, setLoading] = useState(true);
  // fetch a la api
  useEffect(() => {
    async function fetchData() {
      await fetch("https://fakestoreapi.com/products?limit=6")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);

          setLoading(false);
        });
      // ...
    }
    return fetchData;
  }, [loading]);

  const handleChange = (e, title) => {
    let holder = document.getElementById(title);

    holder.style.fontSize = e.target.value + "px";
  };

  return loading ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div>
      <div className="text-change-container">
        <input
          placeholder="Modifica los titulos aquí"
          className="text-change"
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="App">
        {products.map((product, index) => (
          <Card
            className="card-container"
            index={index}
            key={product.id}
            cover={
              <img className="card-img" alt="example" src={product.image} />
            }
            title={
              <Typography.Text id={product.title}>
                {text.length === 0 ? product.title : text}
              </Typography.Text>
            }
          >
            <div>
              {" "}
              <input
                className="range-text"
                type="range"
                id={product.title}
                min={14}
                max={100}
                step={1}
                onChange={(e) => handleChange(e, product.title)}
              />
            </div>
            <div className="product-price">
              <p>${product.price}</p>
              <input
                placeholder="0"
                className="input-price"
                value={sum[product.title] && sum.value}
                type="number"
                onChange={(e) => {
                  setSum((prev) => ({
                    ...prev,
                    [product.title]: e.target.value,
                  }));
                }}
              />
            </div>
            <span className="description-card">{product.description}</span>
            <div className="btn-card">
              <button className="btn-1">Add to cart</button>
              <a href="/" className="btn-2">
                Learn more
              </a>
            </div>
            <span className="total-price">
              TOTAL:
              <strong>
                ${sum[product.title] && sum[product.title] * product.price}
              </strong>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
