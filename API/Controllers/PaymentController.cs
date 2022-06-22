using System.IO;
using Stripe;
namespace API.Controllers
{
	public class PaymentController: BaseApiController {
        private readonly PaymentService _paymentService;
        private readonly IConfiguration _config;

		public PaymentController(PaymentService paymentService, StoreContext context, IConfiguration config): base(context) {
            this._paymentService = paymentService;
            this._config = config;			
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

		[HttpPost("webhook")]
		public async Task<ActionResult> StripeWebhook() {
			var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

			var stripeEvent = EventUtility.ConstructEvent(
				json, 
				Request.Headers["Stripe-Signature"],
				_config["StripeSettings:WhSecret"]
			);
			var charge = (Charge) stripeEvent.Data.Object;

			if (charge.Status == "succeeded") {
				var order = await _context.Orders.FirstOrDefaultAsync(
					x => x.PaymentIntentId == charge.PaymentIntentId
				);				
				order.OrderStatus = OrderStatus.PaymentReceived;
				await _context.SaveChangesAsync();
			}
			return new EmptyResult();
		}
	}
}