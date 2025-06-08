using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public IConfiguration _iconfig;
        public PaymentController(IConfiguration config) { 
        _iconfig = config;
        }

        [HttpPost("createOrder")]
        public IActionResult CreateOrder([FromBody] PaymentRequest obj)
        {
            RazorpayClient client = new RazorpayClient(
                _iconfig["Razorpay:key"],
                _iconfig["Razorpay:secretKey"]
                );
             Dictionary<string, object> options = new Dictionary<string, object>
            {
                {"amount",obj.Amount* 100 },
                {"currency","INR" },
                {"receipt", "order_rcptid_11" }
            };
            Razorpay.Api.Order order = client.Order.Create(options);
            return Ok(new
            {
                orderId = order["id"].ToString(),
                amount = order["amount"],
                currency = order["currency"]
            });
        }
        [HttpPost("verify-payment")]
        public IActionResult VerifyPayment([FromBody] RazorpayPaymentResponse obj)
        {
            RazorpayClient client = new RazorpayClient(
               _iconfig["Razorpay:key"],
               _iconfig["Razorpay:secretKey"]
               );
            Dictionary<string, string> options = new Dictionary<string, string>();
                options.Add("razorpay_order_id",obj.razorpay_order_id);
                options.Add("razorpay_payment_id", obj.razorpay_payment_id);
                options.Add("razorpay_signature", obj.razorpay_signature);
            Utils.verifyPaymentSignature(options);
            return Ok(new { message = "Payment verified successfully" });
            }

        public class PaymentRequest
        {
            public int Amount { get; set; }
        }

    public class RazorpayPaymentResponse
        {
            public string razorpay_order_id { get; set; }
            public string razorpay_payment_id { get; set; }
            public string razorpay_signature { get; set; }
        }
    }
}
