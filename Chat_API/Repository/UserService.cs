using Chat_API.Interfaces;
using Chat_API.Models;

namespace Chat_API.Repository
{
    public class UserService : IUserService
    {
        private readonly ISearchRepository _userRepository;

        public UserService(ISearchRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<User> SearchUsers(string search)
        {
            // Implement the logic to search for users in your repository
            return _userRepository.SearchUsers(search);
        }
    }
}
