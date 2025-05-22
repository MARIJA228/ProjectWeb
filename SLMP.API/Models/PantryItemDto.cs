namespace SLMP.API.Models
{
    public class PantryItemDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int UserId { get; set; }
    }
}

//data needed for the itmen the user is putting in the pantry is Name, how many, when the item is going to exipre and who added it