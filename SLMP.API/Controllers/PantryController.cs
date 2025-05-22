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
    public class PantryController : ControllerBase
    {
        private readonly UserDbContext dbContext;

        public PantryController(UserDbContext context)
        {
            dbContext = context;
        }

        [HttpPost("AddItem")] // ading an item to our panty with the previously defined req. 
        public async Task<IActionResult> AddItem([FromBody] PantryItemDto itemDto)
        {
            var item = new PantryItem
            {
                Name = itemDto.Name,
                Quantity = itemDto.Quantity,
                ExpiryDate = itemDto.ExpiryDate,
                UserId = itemDto.UserId
            };

            dbContext.PantryItems.Add(item);
            await dbContext.SaveChangesAsync();
            return Ok(item);
        }

        [HttpGet("UserItems/{userId}")] 
        public async Task<IActionResult> GetItems(int userId)
        {
            try
            {
                var items = await dbContext.PantryItems
                    .Where(p => p.UserId == userId)
                    .ToListAsync();

                // ensuring empty list doesn't cause issues so it does not load at all
                if (items == null || items.Count == 0)
                {
                    return Ok(new List<PantryItem>()); // Return empty list in that case
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteItem/{id}")] //deleting the item
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await dbContext.PantryItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            dbContext.PantryItems.Remove(item);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Item deleted successfully." });
        }
    }
}
