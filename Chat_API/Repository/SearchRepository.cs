using Chat_API.Interfaces;
using Chat_API.Models;

namespace Chat_API.Repository
{
    public class SearchRepository : ISearchRepository
    {
         private readonly ApplicationDbContext _dbContext;
        public SearchRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> SearchUsers(string search)
        {
            // Implement the logic to search for users in your database
            return _dbContext.Users
                .Where(user => user.Username.Contains(search))
                .ToList();
        }
    }
}
