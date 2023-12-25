using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> AddProduct(RequestProduct request)
        {
            var product = new Product();

            product.ProductName = request.ProductName;
            product.ProductQuantityInStock = request.ProductQuantityInStock;
            product.ProductPrice = request.ProductPrice;
            product.ProductStatus = request.ProductStatus;

            return await _productRepository.AddProduct(product);
        }

        public async Task DeleteProduct(int productId)
        {
            await _productRepository.DeleteProduct(productId);
        }

        public async Task<Product> GetProductById(int productId)
        {
            return await _productRepository.GetProductById(productId);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productRepository.GetProducts();
        }

        public async Task<Product> UpdateProduct(int productId, RequestProduct request)
        {
            var product = await _productRepository.GetProductById(productId);

            if (product == null)
            {
                throw new exception("Product doesn't exist");
            }

            product.ProductName = request.ProductName;
            product.ProductQuantityInStock = request.ProductQuantityInStock;
            product.ProductPrice = request.ProductPrice;
            product.ProductStatus = request.ProductStatus;

            return await _productRepository.UpdateProduct(product);
        }
    }
}
