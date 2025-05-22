using System.ComponentModel.DataAnnotations.Schema;

namespace SLMP.API.Models.Domain
{
    [Table("ShoppingList")]
    public class ShoppingItem
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public int Quantity { get; set; }

        public int UserId { get; set; } // Foreign key
    }
}
