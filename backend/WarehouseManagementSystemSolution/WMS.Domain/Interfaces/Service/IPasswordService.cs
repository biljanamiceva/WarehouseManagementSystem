namespace WMS.Domain.Interfaces.Service
{
    public interface IPasswordService
    {
        string HashPassword(string password);
        bool VerifyPassword(string requestPassword, string userPasswordInDatabase);
    }
}
