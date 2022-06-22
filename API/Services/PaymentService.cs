using Stripe;

namespace API.Services {
	public class PaymentService {
        private readonly IConfiguration _config;

        public PaymentService(IConfiguration config) {
            this._config = config;
		}

		public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket) {
			StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
			
			var service = new PaymentIntentService();
			var intent = new PaymentIntent();

			var subTotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
			var deliveryFee = (subTotal > 10000) ? 0 : 500;

			if (String.IsNullOrEmpty(basket.PaymentIntentId)) {
				var options = new PaymentIntentCreateOptions {
					Amount = subTotal + deliveryFee,
					Currency = "eur",
					PaymentMethodTypes = new List<string>{"card"}
				};
				intent = await service.CreateAsync(options);
			} else {
				var options = new PaymentIntentUpdateOptions {
					Amount = subTotal + deliveryFee
				};
				await service.UpdateAsync(basket.PaymentIntentId, options);
			}
			return intent;
		}
    }
}