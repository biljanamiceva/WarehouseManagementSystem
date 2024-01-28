

using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class OrderService : IOrderService
    {

        private readonly IOrderRepository _orderRepository;

        private readonly IProductRepository _productRepository;

        private readonly IOrderProductRepository _orderProductRepository;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IOrderProductRepository orderProductRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _orderProductRepository = orderProductRepository;
        }

        public async Task<int> AddOrder(RequestOrder request)
        {
            var order = new Order();

            order.OrderStatus = request.OrderStatus;
            order.CustomerId = request.CustomerId;
            var productIds = request.ProductIds?.ToList();
            var products = await _productRepository.GetProductsByIds(productIds!);

            if (products.Count() == 0)
                throw new Exception("Add at least one product");

            if (products.Count() != request.Quantities.Count())
                throw new Exception("Product and Quantity count dooes not match");

            await _orderRepository.AddOrder(order);
            for (int i = 0; i < products.Count; i++)
            {

                var product = products[i];
                var quantity = request.Quantities[i];

                var orderProducts = new OrderProducts()
                {
                    ProductId = product.ProductId,
                    OrderId = order.OrderId,
                    Quantity = quantity,
                    Amount = (quantity * product.ProductPrice)
                };
                order.TotalAmount += (int)orderProducts.Amount;
                await _orderProductRepository.AddOrderProduct(orderProducts);
            }
            return order.OrderId;
        }

        public async Task DeleteOrder(int orderId)
        {
            await _orderRepository.DeleteOrder(orderId);
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            return await _orderRepository.GetOrderById(orderId);
        }

        public async Task<IEnumerable<ResponseOrder>> GetOrders()
        {
            return await _orderRepository.GetOrders();
        }

        public async Task<Order> UpdateOrder(int orderId, RequestOrder request)
        {
            var order = await _orderRepository.GetOrderById(orderId);

            if (order == null)
            {
                throw new exception("Order doesn't exist");
            }


            order.OrderStatus = request.OrderStatus;

            return await _orderRepository.UpdateOrder(order);
        }
    }
}
