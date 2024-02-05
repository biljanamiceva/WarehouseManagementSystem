using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Order> AddOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(e => e.OrderId == orderId);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(e => e.OrderId == orderId);
            if (order == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return order;
        }

        public async Task<IEnumerable<ResponseOrder>> GetOrders()
        {
            var resultList = await _context.Orders
            .Include(r => r.Customer)
            .Select(order => new ResponseOrder
            {
                OrderId = order.OrderId,
                TotalAmount = order.TotalAmount,
                OrderStatus = order.OrderStatus,
                CustomerId = order.CustomerId,
                CompanyName = order.Customer != null ? order.Customer.CompanyName : null,
            })
            .ToListAsync();

            return resultList;
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return order;
        }


    }
}
