using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class BasketController: BaseApiController {
		private readonly StoreContext _context;

		public BasketController(StoreContext context) {
			this._context = context;
		}

		[HttpGet]
		public async Task<ActionResult<Basket>> GetBasket() {
			var basket = await _context.Baskets
				.Include(i => i.Items)
				.ThenInclude(p => p.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["BuyerId"]);
			
			if (basket == null) return NotFound();

			return basket;
		}

		[HttpPost]
		public async Task<ActionResult> AddItemToBasket(int productId, int quantity) {
			// get basket (or create the basket if it doesn't exist yet)
			// get product
			// add item
			// save changes
			return StatusCode(201);
		}

		[HttpDelete]
		public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) {
			// get basket
			// remove item or reduce quantity
			// save changes
			return Ok();
		}
    }
}