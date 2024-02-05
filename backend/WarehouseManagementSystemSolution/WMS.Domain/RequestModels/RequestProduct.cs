using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestProduct
    {
        public string? ProductName { get; set; }
        public int ProductQuantityInStock { get; set; }

        public int ProductPrice { get; set; }
        public ProductStatus ProductStatus { get; set; }
    }
}
