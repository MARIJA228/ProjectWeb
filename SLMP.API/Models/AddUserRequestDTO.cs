namespace SLMP.API.Models
{
    public class AddUserRequestDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}

//when adding a user we need username, password and the email address 