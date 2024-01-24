using Microsoft.EntityFrameworkCore.Design;

namespace Chat_API.Models
{
    public class UserChat
    {
        public string Sender { get; set; } = string.Empty;
        public string Receiver { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
