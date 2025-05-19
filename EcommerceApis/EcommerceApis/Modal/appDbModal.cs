using System.ComponentModel.DataAnnotations;

namespace EcommerceApis.Modal
{
    public class Users
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public bool IsActive { get; set; }
        public string Passwordhash { get; set; }
        public string PasswordSalt { get; set; }

    }
    public class Products
    {
        [Key]
        public int ID { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public string ProductsImages { get; set; }
    }

    public class Orders
    {
        [Key]
        public int ID { get; set; }
        public int? UserID { get; set; }
        public string? ShippingAddress { get; set; }
        public string? OrderStatus { get; set; }
        public decimal? OrderAmount { get; set; }
    }

    public class OrderDetail
    {
        [Key]
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public int? Quantity { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
