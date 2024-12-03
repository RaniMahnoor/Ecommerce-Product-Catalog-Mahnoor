import React from 'react';

interface FilteredDataProps {
  product: any[];
}

const FilteredProduct: React.FC<FilteredDataProps> = ({ product }) => {
  return (
    <>
      {product.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        product.map((prod) => (
          <div key={prod.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg">
            <img
              src={prod.image}
              alt={prod.title}
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{prod.title}</h2>
            <p className="text-gray-600">${prod.price}</p>
            <p className="text-yellow-500">{prod.rating.rate}</p>
            <p className="text-sm text-gray-500">{prod.rating.count}</p>
          </div>
        ))
      )}
    </>
  );
};
export default FilteredProduct;
