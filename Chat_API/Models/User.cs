using Microsoft.EntityFrameworkCore.Design;
using System.ComponentModel.DataAnnotations;

namespace Chat_API.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

    }
}
