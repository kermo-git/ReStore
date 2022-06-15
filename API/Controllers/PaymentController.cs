using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;

namespace API.Controllers {
	public class PaymentController: BaseApiController {
        private readonly PaymentService _paymentService;

		public PaymentController(PaymentService paymentService,StoreContext context): base(context) {
            this._paymentService = paymentService;
		}

		[Authorize]
		[HttpPost]
		public async Task<ActionResult<BasketDTO>> CreateOrUpdatePaymentIntent() {
			var basket = await RetrieveBasket(User.Identity.Name);
			if (basket == null) return NotFound();

			var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);
			if (intent == null) return BadRequest(new ProblemDetails{Title = "Problem creating payment intent."});

			basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
			basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;
			
			_context.Update(basket);
			var result = await _context.SaveChangesAsync();

			if (result > 0) {
				return basket.MapBasketToDTO();
			} else {
				return BadRequest(new ProblemDetails{Title = "Problem updating basket with payment intent."});				
			}
		}
	}
}