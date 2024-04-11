using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repository;

        public DashboardService(IDashboardRepository repository)
        {
            _repository = repository;
        }

        public async Task<ResponseDashboard> GetDashboard()
        {
            return await _repository.GetDashboard();
        }
    }
}
