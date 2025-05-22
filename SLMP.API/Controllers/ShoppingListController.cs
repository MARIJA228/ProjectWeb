using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMP.API.Data;
using SLMP.API.Models.Domain;

namespace SLMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly UserDbContext dbContext;

        public ShoppingListController(UserDbContext context)
        {
            dbContext = context;
        }

        [HttpGet("UserItems/{userId}")] // shopping list is connected to the user, every user has its own list
        public IActionResult GetUserItems(int userId)
        {
            var items = dbContext.ShoppingItems.Where(i => i.UserId == userId).ToList();
            return Ok(items);
        }

        [HttpPost("AddItem")] // method for adding an item
        public IActionResult AddItem([FromBody] ShoppingItem item)
        {
            dbContext.ShoppingItems.Add(item);
            dbContext.SaveChanges();
            return Ok(item); // return with Id
        }

        [HttpDelete("DeleteItem/{id}")] //deleting an item
        public IActionResult DeleteItem(int id)
        {
            var item = dbContext.ShoppingItems.Find(id);
            if (item == null) return NotFound();

            dbContext.ShoppingItems.Remove(item);
            dbContext.SaveChanges();
            return NoContent();
        }
    }
}
