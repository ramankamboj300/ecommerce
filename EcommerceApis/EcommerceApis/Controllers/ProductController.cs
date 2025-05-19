using EcommerceApis.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using static EcommerceApis.BO.CommonBO;
using System.IO;
using Microsoft.OpenApi.Writers;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly dbcontaxt _dbcontaxt;
        public readonly IConfiguration _configration;
        public ProductController(dbcontaxt dbcontaxt, IConfiguration configration)
        {
            _dbcontaxt = dbcontaxt;
            _configration = configration;
        }

        [HttpPost("/api/createUser")]
        public apiResponse createUser(UserBO obj)
        {
            try
            {
                var user = _dbcontaxt.Users.Where(x => x.Email == obj.Email).FirstOrDefault();
                if (user == null)
                {
                    Users users = new Users();
                    users.Email = obj.Email;
                    users.Mobile = obj.Mobile;
                    users.Name = obj.Name;
                    users.IsActive = true;
                    users.PasswordSalt = obj.Password;
                    users.Passwordhash = obj.Password;
                    _dbcontaxt.Users.Add(users);
                    _dbcontaxt.SaveChanges();
                    return new apiResponse { message = "User Created", result = users };
                }
                else
                {
                    return new apiResponse { message = "Email already exists"};

                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("/api/Login")]
        public apiResponse Login(string email,string password)
        {
            try
            {
                var user = _dbcontaxt.Users.FirstOrDefault(x => x.Email == email);
                if(user== null)
                {
                    return new apiResponse { message = "Email Not Exists" };
                }
                else if(user.Passwordhash==password)
                {
                    var token = CreateToken(user);

                    return new apiResponse { message = "Login Success", result = user, token = token };
                }
                else
                {
                    return new apiResponse { message = "Password Wrong" };
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        private string CreateToken(Users user)
        {
            var clsims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
            };
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configration.GetValue<string>("AppSettings:Token")!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var token1 = new JwtSecurityToken(
                issuer: _configration.GetValue<string>("AppSettings:issuer"),
                audience: _configration.GetValue<string>("AppSettings:Audience"),
                claims: clsims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials:creds

                );
            return new JwtSecurityTokenHandler().WriteToken(token1);
        }

            [HttpPost("/api/AddUpdateProduct")]
        public apiResponse AddUpdateProduct(ProductsBO obj)
        {
            try
            {
                var product = _dbcontaxt.Products.Where(x=>x.ID==obj.ID).FirstOrDefault();
                if (product != null)//update case
                {
                    product.ProductName = obj.ProductName;
                    product.ProductsImages = obj.ProductsImages;
                    product.Description = obj.Description;
                    product.Category = obj.Category;
                    product.CoverImage = obj.CoverImage;
                    product.Price = obj.Price;
                    _dbcontaxt.SaveChanges();
                    return new apiResponse { message = "Updated Successfully", result = product };
                }
                else//add case
                {
                    Products pro = new Products();
                    pro.ProductsImages = obj.ProductsImages;
                    pro.ProductName = obj.ProductName;
                    pro.Category = obj.Category;
                    pro.CoverImage = obj.CoverImage;
                    pro.Description = obj.Description;
                    pro.Price = obj.Price;
                    pro.IsActive = true;
                    _dbcontaxt.Add(pro);
                    _dbcontaxt.SaveChanges();
                    return new apiResponse { message = "Added Successfully", result = pro };
                }
            }
            catch (Exception)
            {

                throw;
            }   
        }
        [HttpGet("/api/GetProductByID")]
        public apiResponse GetProductByID(int id)
        {
            try
            {
                var product = _dbcontaxt.Products.FirstOrDefault(x => x.ID == id);
                if(product == null)
                {
                    return new apiResponse { message = "Not Found" };
                }
                else
                {
                    return new apiResponse { message = "Ok", result = product };
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet("/api/GetAllProducts")]
        public apiResponse GetAllProducts()
        {
            try
            {
                var product = _dbcontaxt.Products.ToList();
                if (product == null)
                {
                    return new apiResponse { message = "Not Found" };
                }
                else
                {
                    return new apiResponse { message = "Ok", result = product };
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("/api/UploadFiles")]
        public async Task<apiResponse> UploadFiles(List<IFormFile> files)
        {
            try
            {
                var UploadPath = Path.Combine(Directory.GetCurrentDirectory(), "UploadFiles");
                if (!Directory.Exists(UploadPath))
                {
                    Directory.CreateDirectory(UploadPath);
                }
                var uploadedFiles = new List<string>();
                foreach (var file in files)
                {
                    var filename = DateTime.Now.Ticks.ToString() + file.FileName;
                    var filePath = Path.Combine(UploadPath, filename);

                    await using var stram = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stram);
                    uploadedFiles.Add(filename);
                }
                return new apiResponse { message = "Ok", result=uploadedFiles };

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("/api/DeleteProductByID")]
        public apiResponse DeleteProductByID(int id)
        {
            try
            {
                var product = _dbcontaxt.Products.FirstOrDefault(x => x.ID == id);
                if (product == null)
                {
                    return new apiResponse { message = "Not Found" };
                }
                else
                {
                    _dbcontaxt.Products.Remove(product);
                    _dbcontaxt.SaveChanges();
                    return new apiResponse { message = "Product Deleted", result = product };
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
