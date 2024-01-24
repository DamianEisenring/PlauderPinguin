using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Design;

namespace Chat_API.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        
        [Required]
        public string Content { get; set; }
        public DateTime SentAt { get; set; }
    }
}