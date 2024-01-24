using Chat_API.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.X509.SigI;

namespace Chat_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : Controller
    {
        public static Contact contact = new Contact();

        [HttpGet("getContact")]
        public IActionResult GetContact()
        {
            return Ok(contact);
        }

        [HttpPost("createContact")]
        public IActionResult CreateContact([FromBody] Contact newContact)
        {
            if (newContact == null)
            {
                return BadRequest("Invalid contact data");
            }

            newContact.ContactId = contact.ContactId + 1;
            contact = newContact;
            return Ok(newContact);
        }
    }
}
