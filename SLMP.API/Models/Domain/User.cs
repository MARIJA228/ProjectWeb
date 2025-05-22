using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SLMP.API.Models.Domain
{
    [Table("users")]
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; } //getters and setters for the user
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public ICollection<PantryItem> PantryItems { get; set; } //pantry items that user has
    }
}
