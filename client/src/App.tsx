import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([{
      name: "Product1",
      price: 100
    }, {
      name: "Product2",
      price: 200
    }
  ])
  
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  function addProduct() {
    const nextProductID = products.length + 1

    setProducts([...products, {
      name: "Product" + nextProductID,
      price: nextProductID * 100
    }])
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, i) => (
          <li key={item.name + i}>
            {item.name} - {item.price}$
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>
        Add Product
      </button>
    </div>
  )
}

export default App;
