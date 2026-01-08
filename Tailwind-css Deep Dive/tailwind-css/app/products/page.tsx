import ProductCard from "@/app/components/Product";
import { Product } from "@/app/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    description: "High quality sound and noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155228f6d1",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    description: "Track fitness and notifications.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 1499,
    description: "Ergonomic and adjustable stand.",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  },
];

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
