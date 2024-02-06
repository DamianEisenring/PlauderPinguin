using Chat_API.Models;

namespace Chat_API.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> SearchUsers(string search);
    }
}
