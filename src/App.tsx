import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FilteredProduct from './assets/Components/filteredData';
import SortDropdown from './assets/Components/Sorting';

type product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const App: React.FC = () => {
  const [product, setProduct] = useState<product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProduct(response.data);
      } catch (error) {
        console.error('Error Fetching Data from API', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProduct = product.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function
  const sortedProduct = (products: product[]) => {
    let sortedArray = [...products];

    switch (sortOption) {
      case 'price-asc':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case 'rating-asc':
        sortedArray.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case 'rating-desc':
        sortedArray.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'title':
        sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sortedArray;
  };

  // Combine filter and sort logic
  const productsToDisplay = searchTerm
    ? sortedProduct(filteredProduct) // Filter and then sort
    : sortedProduct(product); // Sort all products when no search term

  // Pagination logic
  const totalProducts = productsToDisplay.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get the products to display for the current page
  const currentProducts = productsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-center text-2xl font-bold">Product Catalog</h1>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search Products..."
            className="p-2 rounded border text-black"
            value={searchTerm} // Bind the input field to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when user types
          />
          {/* Sorting Dropdown */}
          <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
        </header>

        <main className="p-4">
          <p className="text-gray-700 text-center">Welcome to Product Catalog!</p>

          {/* Display filtered and sorted products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <FilteredProduct product={currentProducts} />
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="p-2 rounded bg-blue-500 text-white"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Display page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`p-2 mx-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="p-2 rounded bg-blue-500 text-white"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
