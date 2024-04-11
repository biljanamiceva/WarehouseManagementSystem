using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.ResponseModels;

namespace WMS.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;

        public DashboardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseDashboard> GetDashboard()
        {
            return new ResponseDashboard
            {
                TotalCustomers = _context.Customers.Count(),
                TotalOrders = _context.Orders.Count(),
                TotalProducts = _context.Products.Count(),
                TotalSuppliers = _context.Suppliers.Count(),
            };
        }
    }
}
