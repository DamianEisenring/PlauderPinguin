using Chat_API.Models;
using System.Collections.Generic;

namespace Chat_API.Interfaces
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        void AddUser(User user);
    }
}
