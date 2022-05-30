using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using API.DTOs;
using API.Entities;
using API.Services;

namespace API.Controllers {
    public class AccountController: BaseApiController {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService) {
            this._userManager = userManager;
            this._tokenService = tokenService;			
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO) {
			var user = await _userManager.FindByNameAsync(loginDTO.UserName);

			if (user == null) return Unauthorized();

			bool correctPassword = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

			if (!correctPassword) return Unauthorized();

			return new UserDTO {
				Email = user.Email,
				Token = await _tokenService.GenerateToken(user)
			};
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

		[Authorize]
		[HttpGet("currentUser")]
		public async Task<ActionResult<UserDTO>> GetCurrentUser() {
			var user = await _userManager.FindByNameAsync(User.Identity.Name);

			return new UserDTO {
				Email = user.Email,
				Token = await _tokenService.GenerateToken(user)
			};
		}
    }
}