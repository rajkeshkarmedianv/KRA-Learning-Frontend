/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mb-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            ₹{product.price}
          </span>

          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
