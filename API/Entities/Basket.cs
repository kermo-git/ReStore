using System.Collections.Generic;
using System.Linq;

namespace API.Entities {
    public class Basket {
        public int Id { get; set; }
        public string BuyerId { get; set; }
		public List<BasketItem> Items { get; set; } = new();
		public string PaymentIntentId { get; set; }
		public string ClientSecret { get; set; }
		
		public void AddItem(Product product, int quantity) {
			if (Items.TrueForAll(item => item.ProductId != product.Id)) {
				Items.Add(new BasketItem{Product = product, Quantity = quantity});
			} 
			else {
				var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
				if (item != null) item.Quantity += quantity;
			}
		}

		public void RemoveItem(int productId, int quantity) {
			var item = Items.FirstOrDefault(item => item.ProductId == productId);
			if (item != null) {
				item.Quantity -= quantity;
				if (item.Quantity <= 0) Items.Remove(item);
			}
		}
    }
}