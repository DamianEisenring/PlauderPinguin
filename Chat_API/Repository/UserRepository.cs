using Chat_API.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Chat_API.Models;

namespace Chat_API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private List<User> registeredUsers = new List<User>();

        public User GetUserByUsername(string username)
        {
            return registeredUsers.FirstOrDefault(u => u.Username == username);
        }

        public void AddUser(User user)
        {
            registeredUsers.Add(user);
        }
    }
}
