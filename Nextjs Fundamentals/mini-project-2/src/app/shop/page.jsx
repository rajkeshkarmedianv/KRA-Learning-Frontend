/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ShopPage = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <div>
      <h1>All Products</h1>

      {products.map((p) => (
        <div key={p.id}>
          <img src={p.image} alt={p.title} width={120} />
          <h3>{p.title}</h3>
          <p>Category: {p.category}</p>
          <p>Price: ${p.price}</p>

          {/* Category Page */}
          <Link href={`/shop/${encodeURIComponent(p.category)}`}>
            View Category
          </Link>

          <br />

          {/* Product Detail Page */}
          <Link href={`/shop/${encodeURIComponent(p.category)}/${p.id}`}>
            View Product
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
