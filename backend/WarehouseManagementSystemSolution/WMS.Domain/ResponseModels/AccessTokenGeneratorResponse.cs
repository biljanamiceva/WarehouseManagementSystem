namespace WMS.Domain.ResponseModels
{
    public class AccessTokenGeneratorResponse
    {
        public string AccessToken { get; set; }
        public DateTime AccessTokenExpirationDate { get; set; }
    }
}
