using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IJwtService
    {
        AccessTokenGeneratorResponse GenerateToken(User user);
    }
}
