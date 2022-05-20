using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class AccountController: BaseApiController {
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager) {
            this._userManager = userManager;
		}

		[HttpPost("login")]
		public async Task<ActionResult<User>> Login(LoginDTO loginDTO) {
			var user = await _userManager.FindByNameAsync(loginDTO.UserName);

			if (user == null) return Unauthorized();

			bool correctPassword = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

			if (!correctPassword) return Unauthorized();

			return user;
		}

		[HttpPost("register")]
		public async Task<ActionResult> Register(RegisterDTO registerDTO) {
			var user = new User{ UserName = registerDTO.UserName, Email = registerDTO.Email };
			var result = await _userManager.CreateAsync(user, registerDTO.Password);

			if (!result.Succeeded) {
				foreach (var error in result.Errors) {
					ModelState.AddModelError(error.Code, error.Description);
				}
				return ValidationProblem();
			}
			await _userManager.AddToRoleAsync(user, "Member");
			return StatusCode(201);
		}
    }
}