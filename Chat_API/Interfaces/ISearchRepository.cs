using Chat_API.Models;

namespace Chat_API.Interfaces
{
    public interface ISearchRepository
    {
        IEnumerable<User> SearchUsers(string search);
    }
}
