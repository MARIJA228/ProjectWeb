namespace SLMP.API.Models.Domain
{
    public class PantryItem
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryDate { get; set; } 



        public int UserId { get; set; } // Foreign key

        //public User? User { get; set; }
    }
}
