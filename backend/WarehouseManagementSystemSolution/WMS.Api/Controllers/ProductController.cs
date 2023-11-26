using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Service;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productService.GetProducts();
        }

        [HttpPost]
        public async Task<Product> AddProduct(RequestProduct request)
        {
            return await _productService.AddProduct(request);
        }

        [HttpPut("{productId}")]
        public async Task<Product> UpdateProduct(int productId, RequestProduct request)
        {
            return await _productService.UpdateProduct(productId, request);
        }

        [HttpDelete("{productId}")]
        public async Task DeleteProduct(int productId)
        {
            await _productService.DeleteProduct(productId);
        }

        [HttpGet("{productId}")]
        public async Task<Product> GetProductById(int productId)
        {
            return await _productService.GetProductById(productId);
        }
    }
}
