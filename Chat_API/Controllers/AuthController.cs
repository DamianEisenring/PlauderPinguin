using Chat_API.Models;
using Chat_API.Interfaces;
using Chat_API.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Chat_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        private User user;
        private UserChat userChat;


        public AuthController(IConfiguration configuration, IUserRepository userRepository, ApplicationDbContext dbContext)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _dbContext = dbContext;
            user = new User();
            userChat = new UserChat();
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash
            };

            _userRepository.AddUser(newUser);

            return Ok(newUser);
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto request)
        {
            if (user.Username != request.Username)
            {
                return BadRequest("Benutzer nicht gefunden.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Falsches Passwort.");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [HttpPost("sendMessage")]
        public ActionResult<UserChat> SendMessage([FromQuery] string receivingUser, [FromQuery] string username, [FromBody] UserChat request)
        {
            var sender = _userRepository.GetUserByUsername(username);
            var receiver = _userRepository.GetUserByUsername(receivingUser);

            if (sender == null || receiver == null)
            {
                return BadRequest("Invalid sender or receiver.");
            }

            var message = new Message
            {
                Sender = sender.Username,
                Receiver = receiver.Username,
                Content = request.Message,
                SentAt = DateTime.UtcNow // You may adjust this based on your needs
            };

            _dbContext.Messages.Add(message);
            _dbContext.SaveChanges();

            return Ok("Message sent successfully");
        }


        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
