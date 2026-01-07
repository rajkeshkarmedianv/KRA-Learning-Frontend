/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const CategoryPage = async ({ params }) => {
  const { category } = await params; // 🔥 MUST
  const decodedCategory = decodeURIComponent(category);

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${decodedCategory}`
  );
  const products = await res.json();

  return (
    <div>
      <h2>Category: {decodedCategory}</h2>

      {products.map((p) => (
        <div key={p.id}>
          <img src={p.image} alt={p.title} width={120} />
          <h3>{p.title}</h3>
          <p>${p.price}</p>

          {/* Product Detail */}
          <Link href={`/shop/${encodeURIComponent(decodedCategory)}/${p.id}`}>
            View Product
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
