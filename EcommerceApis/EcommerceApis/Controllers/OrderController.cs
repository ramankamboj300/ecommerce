using EcommerceApis.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static EcommerceApis.BO.CommonBO;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly dbcontaxt _dbcontaxt;
        public OrderController(dbcontaxt dbcontaxt)
        {
            _dbcontaxt = dbcontaxt;
        }
        [HttpPost("/api/PlaceOrder")]

        public apiResponse PlaceOrder(OrderBO obj)
        {
            try
            {
                var user = _dbcontaxt.Users.FirstOrDefault(x => x.Email == obj.Email);
                var userid = 0;
                if(user == null)
                {
                    Users usr = new Users();
                    usr.Name = obj.Name;
                    usr.Email = obj.Email;
                    usr.Mobile = obj.Mobile;
                    usr.PasswordSalt = obj.Password;
                    usr.Passwordhash = obj.Password;
                    usr.IsActive = true;
                    _dbcontaxt.Users.Add(usr);
                    _dbcontaxt.SaveChanges();
                    userid = usr.ID;
                }
                else { userid = user.ID; };

                Orders ord = new Orders();
                ord.OrderStatus = "Pending";
                ord.ShippingAddress = obj.ShippingAddress;
                ord.UserID = userid;
                ord.OrderAmount = obj.OrderAmount;
                _dbcontaxt.Orders.Add(ord);
                _dbcontaxt.SaveChanges();
                foreach (var item in obj.Products)
                {
                    OrderDetail ordDetail = new OrderDetail();
                    ordDetail.ProductID = item.ID;
                    ordDetail.Quantity = 1;
                    ordDetail.TotalPrice = item.Price;
                    ordDetail.OrderID = ord.ID;
                    ordDetail.CreatedAt = DateTime.Now;
                    _dbcontaxt.OrderDetail.Add(ordDetail);
                    _dbcontaxt.SaveChanges();
                }
                return new apiResponse { message = "Ordered Successfully", result = ord.ID};

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("/api/ChangeOrderStatusByAdmin")]
        public apiResponse ChangeOrderStatusByAdmin(int id,string status)
        {
            try
            {
                var data = _dbcontaxt.Orders.Where(x => x.ID == id).FirstOrDefault();
                if (data != null)
                {
                    data.OrderStatus = status;
                    _dbcontaxt.SaveChanges();
                }
                else
                {
                    return new apiResponse { message = "Not Found"};

                }
                return new apiResponse { message = "Ok", result = data };
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("/api/getOrdersByUserID")]
        public apiResponse getOrdersByUserID(int id)
        {
            try
            {
                var orderDetails = (from a in _dbcontaxt.Orders
                                    join user in _dbcontaxt.Users on a.UserID equals user.ID
                                    where a.UserID == id || id==0
                                    select new
                                    {
                                        user.Name,
                                        a.OrderStatus,
                                        a.ID,
                                        ProductsDetail = (from prod in _dbcontaxt.Products
                                                          join b in _dbcontaxt.OrderDetail on a.ID equals b.OrderID
                                                          where prod.ID ==b.ProductID select new {
                                            prod.ProductName,
                                            b.TotalPrice,b.CreatedAt,b.Quantity
                                        }).ToList(),
                                    }).ToList();
                return new apiResponse { message = "Ok", result = orderDetails };
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet("/api/getCustomers")]
        public apiResponse getCustomers()
        {
            try
            {
                var customers = _dbcontaxt.Users.Where(x => x.ID > 1).ToList();
                return new apiResponse { message = "Ok", result = customers };

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("/api/getDashboardCount")]
        public apiResponse getDashboardCount()
        {
            try
            {
                var dashboardData = new
                {
                    orderCount = _dbcontaxt.Orders.Where(x => x.OrderStatus != "Cancalled").Count(),
                    customersCount = _dbcontaxt.Users.Where(x => x.IsActive == true && x.ID > 1).Count(),
                    productsCount = _dbcontaxt.Products.Count(),
                    totalSale = _dbcontaxt.Orders.Where(x => x.OrderStatus != "Cancalled").Sum(x => x.OrderAmount)

                };

                return new apiResponse { message = "Ok", result = dashboardData };

            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet("/api/getSalesRevenue")]
        public apiResponse getSalesRevenue()
        {
            try
            {
                DateTime today = DateTime.Today;
                DateTime sevenDaysAgo = today.AddDays(-7);

                var d = (from b in _dbcontaxt.OrderDetail
                         where b.CreatedAt >= sevenDaysAgo
                         join a in _dbcontaxt.Orders on b.OrderID equals a.ID
                         where a.OrderStatus != "Cancelled"
                         group new { a.OrderAmount, b.CreatedAt } by b.CreatedAt.Date into groupedData
                         select new
                         {
                             Date = groupedData.Key,
                             TotalSales = groupedData.Sum(x => x.OrderAmount)
                         }).ToList();

                var allDates = Enumerable.Range(0, 7)
                                         .Select(i => today.AddDays(-i).Date)
                                         .ToList();

                var labels = new List<string>();
                var salesData = new List<decimal>();

                foreach (var date in allDates)
                {
                    var salesForDate = d.FirstOrDefault(x => x.Date == date)?.TotalSales ?? 0;
                    labels.Add(date.ToString("dd-MMM"));
                    salesData.Add(salesForDate);
                }

                return new apiResponse
                {
                    message = "Ok",
                    result = new
                    {
                        labels = labels,
                        salesData = salesData
                    }
                };
            }
            catch (Exception ex)
            {
                return new apiResponse { message = "Error: " + ex.Message };
            }
        }

    }
}
