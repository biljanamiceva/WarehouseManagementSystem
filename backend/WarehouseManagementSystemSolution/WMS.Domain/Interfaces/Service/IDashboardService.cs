using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IDashboardService
    {
        Task<ResponseDashboard> GetDashboard();
    }
}
