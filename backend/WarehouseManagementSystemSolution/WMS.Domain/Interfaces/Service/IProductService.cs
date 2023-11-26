
using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProducts();

        // Get a single product by their ID
        Task<Product> GetProductById(int productId);

        // Add a new product
        Task<Product> AddProduct(RequestProduct request);

        // Update an existing product
        Task<Product> UpdateProduct(int productId, RequestProduct request);

        // Delete a product
        Task DeleteProduct(int productId);
    }
}
