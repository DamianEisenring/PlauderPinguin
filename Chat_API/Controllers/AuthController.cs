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
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Chat_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;
        private User user;
        private UserChat userChat;

        public AuthController(IConfiguration configuration, IUserRepository userRepository, ApplicationDbContext dbContext, IUserService userService)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _dbContext = dbContext;
            user = new User();
            userChat = new UserChat();
            _userService = userService;
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

            _dbContext.Users.Add(newUser); // Add the new user to the Users DbSet
            _dbContext.SaveChanges(); // Save changes to the database

            return Ok(newUser);
        }


        [HttpPost("login")]
        public ActionResult<User> Login(UserDto request)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == request.Username);

            if (user == null)
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
        public ActionResult<UserChat> SendMessage([FromBody] UserChat request)
        {
            var sender = _dbContext.Users.FirstOrDefault(u => u.Username == request.Sender);
            var receiver = _dbContext.Users.FirstOrDefault(u => u.Username == request.Receiver);

            if (sender == null || receiver == null)
            {
                return BadRequest("Invalid sender or receiver.");
            }

            var message = new Message
            {
                Sender = sender.Username,
                Receiver = receiver.Username,
                Content = request.Message,
                SentAt = DateTime.UtcNow
            };

            _dbContext.Messages.Add(message);
            _dbContext.SaveChanges();

            return Ok("Message sent successfully");
        }


[HttpGet("getMessages")]
public ActionResult<IEnumerable<UserChat>> GetMessages([FromQuery] string username, [FromQuery] string recipient)
{
    var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);

    if (user == null)
    {
        return BadRequest("Invalid user.");
    }

    if (string.IsNullOrEmpty(recipient))
    {
        // If no recipient is specified, return all messages for the user
        var messages = _dbContext.Messages
            .Where(m => m.Sender == user.Username || m.Receiver == user.Username)
            .OrderBy(m => m.SentAt)
            .ToList();

        var userChats = messages.Select(m => new UserChat
        {
            Sender = m.Sender,
            Receiver = m.Receiver,
            Message = m.Content
        }).ToList();

        return Ok(userChats);
    }
    else
    {
        // If a recipient is specified, return messages between the user and the recipient
        var messages = _dbContext.Messages
            .Where(m => (m.Sender == user.Username && m.Receiver == recipient) || (m.Sender == recipient && m.Receiver == user.Username))
            .OrderBy(m => m.SentAt)
            .ToList();

        var userChats = messages.Select(m => new UserChat
        {
            Sender = m.Sender,
            Receiver = m.Receiver,
            Message = m.Content
        }).ToList();

        return Ok(userChats);
    }
}


        [HttpGet("search")]
        public IActionResult SearchUsers([FromQuery] string search)
        {
            try
            {
                // Call a method in your service to search for users based on the provided search string
                var searchResults = _userService.SearchUsers(search);

                return Ok(searchResults);
            }
            catch (Exception ex)
            {
                // Log the error or handle it appropriately
                return StatusCode(500, "Internal Server Error");
            }
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
