using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();

        Task<Product> GetProductById(int productId);

        Task<Product> AddProduct(Product product);

        Task<Product> UpdateProduct(Product product);

        Task DeleteProduct(int productId);
    }
}
