using Microsoft.EntityFrameworkCore;
using System;

namespace EcommerceApis.Modal
{
    public class dbcontaxt:DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public dbcontaxt(DbContextOptions<dbcontaxt> options, IServiceProvider serviceProvider)
         : base(options)
        {
            _httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
        }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
    }
}
