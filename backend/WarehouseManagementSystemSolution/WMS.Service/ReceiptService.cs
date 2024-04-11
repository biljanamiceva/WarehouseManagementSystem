using System.Diagnostics;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class ReceiptService : IReceiptService
    {

        private readonly IReceiptRepository _receiptRepository;

        private readonly IProductRepository _productRepository;

        public ReceiptService(IReceiptRepository receiptRepository, IProductRepository productRepository)
        {
            _receiptRepository = receiptRepository;
            _productRepository = productRepository;
        }

        public async Task<Receipt> AddReceipt(RequestReceipt request)
        {
            var receipt = new Receipt();

            receipt.ReceiptDate = request.ReceiptDate;
            receipt.Quantity = request.Quantity;
            //receipt.Amount = request.Amount;
            receipt.ReceiptStatus = request.ReceiptStatus;
            receipt.SupplierId = request.SupplierId;
            receipt.ProductId = request.ProductId;

            var product = await _productRepository.GetProductById(request.ProductId);

            if (product == null)
            {
                throw new Exception("Product not found");
            }
            product.ProductQuantityInStock += request.Quantity;
            receipt.Amount = receipt.Amount + (receipt.Quantity * product.ProductPrice);

            await _productRepository.UpdateProduct(product);

            return await _receiptRepository.AddReceipt(receipt);
        }

        public async Task DeleteReceipt(int receiptId)
        {

            var receipt = await _receiptRepository.GetReceiptById(receiptId);
            if (receipt == null)
            {
                throw new Exception("Receipt not found");
            }
            var product = await _productRepository.GetProductById(receipt.ProductId);
           

            product.ProductQuantityInStock -= receipt.Quantity;

            await _productRepository.UpdateProduct(product);

            await _receiptRepository.DeleteReceipt(receiptId);
        }

        public async Task<IEnumerable<ResponseReceipt>> GetReceipts()
        {
            return await _receiptRepository.GetReceipts();
        }

        public async Task<Receipt> GetReceiptById(int receiptId)
        {
            return await _receiptRepository.GetReceiptById(receiptId);
        }

        public async Task<Receipt> UpdateReceipt(int receiptId, RequestReceipt request)
        {
            var receipt = await _receiptRepository.GetReceiptById(receiptId);

            if (receipt == null)
            {
                throw new exception("Receipt doesn't exist");
            }

            receipt.ReceiptDate = request.ReceiptDate;
            receipt.Quantity = request.Quantity;
            //receipt.Amount = request.Amount;
            receipt.ReceiptStatus = request.ReceiptStatus;

            return await _receiptRepository.UpdateReceipt(receipt);
        }

        public async Task<Receipt> MarkReceiptAs(int receiptId, RequestMarkReceiptAs request)
        {
            var receipt = await _receiptRepository.GetReceiptById(receiptId);
            if (receipt == null)
            {
                throw new Exception("Receipt doesn't exist");
            }

            // Check if the receipt is not already paid
            //if (receipt.ReceiptStatus == ReceiptStatus.Paid)
            //{
                //throw new Exception("Receipt is already marked as paid");
            //}

            // Update receipt status to 
            receipt.ReceiptStatus = request.ReceiptStatus;

            return await _receiptRepository.UpdateReceipt(receipt);
        }
    }
}
