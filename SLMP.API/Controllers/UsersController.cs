using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLMP.API.Data;
using SLMP.API.Models;
using SLMP.API.Models.Domain;

namespace SLMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAngularApp")]
    public class UsersController : ControllerBase
    {
        private readonly UserDbContext dbContext;

        public UsersController(UserDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpPost("CreateNewUser")] //method for creatng new user
        public async Task<IActionResult> AddUser([FromBody] AddUserRequestDTO request)
        {
            try
            {
                var userExists = await dbContext.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);
                if (userExists != null)
                {
                    return StatusCode(500, "Username already exists"); //not allowing to users with the same username 
                } 
                 var user = new User //if everything is good create new user
                {
                    
                    UserName = request.UserName,
                    Email = request.Email,
                    Password = request.Password
                };
                

                

                await dbContext.Users.AddAsync(user);
                await dbContext.SaveChangesAsync();

                return Created("User Registered", user);
            }
            catch (Exception ex)
            {
                // in case of an error, with appropriate message
                Console.WriteLine("Exception occurred: " + ex.Message);
                return StatusCode(500, "Server error: " + ex.Message);
            }
        }


        [HttpPost("Login")] //method for log in user
        public async Task<IActionResult> Login(LoginRequestDTO request)
        {
            var user = await dbContext.Users
                .SingleOrDefaultAsync(x => x.UserName == request.UserName && x.Password == request.Password);

            if (user == null)
            {
                return StatusCode(401, "Wrong credentials"); // in case of an error 
            }

            return Ok(user); //if everything is good we log in
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await dbContext.Users.ToListAsync();
            return Ok(users);
        }

        
    }
}
   


        