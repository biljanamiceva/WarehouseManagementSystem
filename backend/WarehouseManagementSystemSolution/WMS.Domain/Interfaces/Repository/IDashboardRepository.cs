using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IDashboardRepository
    {
        Task<ResponseDashboard> GetDashboard();
    }
}
