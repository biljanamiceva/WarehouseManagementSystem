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
            order.OrderTitle = request.OrderTitle;
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
                product.ProductQuantityInStock -= quantity;

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

        public async Task<Order> MarkReceiptAs(int orderId, RequestMarkOrderAs request)
        {
            var order = await _orderRepository.GetOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Order doesn't exist");
            }
   
            order.OrderStatus = request.OrderStatus;

            return await _orderRepository.UpdateOrder(order);
        }

        public async Task<Order> UpdateOrder(int orderId, RequestOrder request)
        {
            var order = await _orderRepository.GetOrderById(orderId);

            if (order == null)
            {
                throw new Exception("Order doesn't exist");
            }

            order.OrderStatus = request.OrderStatus;
            order.CustomerId=request.CustomerId;
            order.OrderTitle=request.OrderTitle;

            // Update order products if necessary (e.g., change quantities)
            var productIds = request.ProductIds?.ToList();
            var products = await _productRepository.GetProductsByIds(productIds!);

            if (products.Count() != request.Quantities.Count())
            {
                throw new Exception("Product and Quantity count do not match");
            }

            for (int i = 0; i < products.Count; i++)
            {
                var product = products[i];
                var quantity = request.Quantities[i];

                var existingOrderProduct = order.OrderProducts.FirstOrDefault(op => op.ProductId == product.ProductId);
                if (existingOrderProduct != null)
                {
                    // Update existing order product quantity and amount
                    existingOrderProduct.Quantity = quantity;
                    existingOrderProduct.Amount = quantity * product.ProductPrice;

                    // Update total amount of the order
                    order.TotalAmount -= existingOrderProduct.Amount;
                    order.TotalAmount += (quantity * product.ProductPrice);
                }
                else
                {
                    // Add new order product if not already present
                    var orderProduct = new OrderProducts()
                    {
                        ProductId = product.ProductId,
                        OrderId = order.OrderId,
                        Quantity = quantity,
                        Amount = quantity * product.ProductPrice
                    };
                    order.TotalAmount += (int)orderProduct.Amount;
                    order.OrderProducts.Add(orderProduct);
                }

                // Update product quantity in stock (assuming this is necessary for your business logic)
                product.ProductQuantityInStock -= quantity;
            }

            return await _orderRepository.UpdateOrder(order);
        }

    }
}
