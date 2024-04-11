namespace WMS.Domain.ResponseModels
{
    public class UserLoginResponse
    {
        public string AccessToken { get; set; }
        public DateTime AccessTokenExpirationDate { get; set; }

        public string Role { get; set; }
    }
}
