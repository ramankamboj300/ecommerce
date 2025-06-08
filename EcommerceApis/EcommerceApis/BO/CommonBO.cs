using System.ComponentModel.DataAnnotations;

namespace EcommerceApis.BO
{
    public class CommonBO
    {
        public class apiResponse
        {
            public string message { get; set; }
            public string? token { get; set; }
            public object result { get; set; }
        }
        public class ProductsBO
        {
            public int ID { get; set; }
            public string ProductName { get; set; }
            public string Category { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
            public string CoverImage { get; set; }
            public string ProductsImages { get; set; }
        }

        public class UserBO
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string? Mobile { get; set; }
            public string Password { get; set; }

        }

        public class OrderBO
        {
            public string? Name { get; set; }
            public string? Email { get; set; }
            public string? Mobile { get; set; }
            public string? Password { get; set; }
            public string? ShippingAddress { get; set; }
            public decimal? OrderAmount { get; set; }
            public List<OrderProductBO> Products { get; set; }
            public decimal? Quantity { get; set; }
        }
        public class OrderProductBO
        {
            public int ID { get; set; }
            public decimal Price { get; set; }
        }
    }
}
