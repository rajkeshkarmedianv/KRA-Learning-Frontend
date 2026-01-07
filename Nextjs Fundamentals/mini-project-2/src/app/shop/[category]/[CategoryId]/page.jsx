/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

const ProductPage = async ({ params }) => {
  const { category, CategoryId } = await params;
  const decodedCategory = decodeURIComponent(category);

  const res = await fetch(`https://fakestoreapi.com/products/${CategoryId}`);

  if (!res.ok) notFound();

  const product = await res.json();

  
  if (product.category !== decodedCategory) {
    notFound();
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={200} />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductPage;
