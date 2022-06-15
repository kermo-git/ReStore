using System.Linq;

using API.DTOs;
using API.Entities;

namespace API.Extensions {
    public static class BasketExtensions {
        public static BasketDTO MapBasketToDTO(this Basket basket) {
			return new BasketDTO{
				Id = basket.Id,
				BuyerId = basket.BuyerId,
				PaymentIntentId = basket.PaymentIntentId,
				ClientSecret = basket.ClientSecret,				
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