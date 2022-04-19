using System.Collections.Generic;

namespace API.Entities {
    public class Basket {
        public int Id { get; set; }
        public string BuyerId { get; set; }
		public List<BasketItem> Items = new();
		
		public void AddItem(Product product, int quantity) {
			if (Items.TrueForAll(item => item.ProductId != product.Id)) {
				Items.Add(new BasketItem{Product = product, Quantity = quantity});
			} 
			else {
				var item = Items.Find(item => item.ProductId == product.Id);
				if (item != null) item.Quantity += quantity;
			}
		}

		public void RemoveItem(int productId, int quantity) {
			var item = Items.Find(item => item.ProductId == productId);
			if (item != null) {
				item.Quantity -= quantity;
				if (item.Quantity <= 0) Items.Remove(item);
			}
		}
    }
}