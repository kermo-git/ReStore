using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.DTOs;
using API.Entities;

namespace API.Controllers {
    public class BasketController: BaseApiController {
		private readonly StoreContext _context;

		public BasketController(StoreContext context) {
			this._context = context;
		}

		[HttpGet(Name = "Getbasket")]
		public async Task<ActionResult<BasketDTO>> GetBasket() {
			var basket = await RetrieveBasket();
			if (basket == null) return NotFound();
			return MapBasketToDTO(basket);
		}

		[HttpPost]
		public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity) {
			var basket = await RetrieveBasket();
			if (basket == null) basket = CreateBasket();

			var product = await _context.Products.FindAsync(productId);
			if (product == null) return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});

			basket.AddItem(product, quantity);
			
			bool result = await _context.SaveChangesAsync() > 0;
			if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));
			return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
		}

		[HttpDelete]
		public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) {
			var basket = await RetrieveBasket();
			if (basket == null) return NotFound();

			basket.RemoveItem(productId, quantity);

			bool result = await _context.SaveChangesAsync() > 0;
			if (result) return Ok();
			return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});		
		}

		private async Task<Basket> RetrieveBasket() {
			return await _context.Baskets
				.Include(i => i.Items)
				.ThenInclude(p => p.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["BuyerId"]);
		}	

		private Basket CreateBasket() {
			var buyerId = Guid.NewGuid().ToString();
			var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
			Response.Cookies.Append("buyerId", buyerId, cookieOptions);
			var basket = new Basket{BuyerId = buyerId};
			_context.Baskets.Add(basket);
			return basket;
		}	

		private BasketDTO MapBasketToDTO(Basket basket) {
			return new BasketDTO{
				Id = basket.Id,
				BuyerId = basket.BuyerId,
				Items = basket.Items.Select(item => new BasketItemDTO{
					ProductId = item.ProductId,
					Name = item.Product.Name,
					Price = item.Product.Price,
					PictureURL = item.Product.PictureURL,
					Brand = item.Product.Brand,
					Type = item.Product.Type,
					Quantity = item.Quantity																									
				}).ToList()
			};			
		}		
    }
}