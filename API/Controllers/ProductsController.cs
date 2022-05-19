using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class ProductsController: BaseApiController {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts(ProductParams args) {
			var query = _context.Products
				.Sort(args.OrderBy)
				.Search(args.SearchTerm)
				.Filter(args.Brands, args.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(query, args.PageNumber, args.PageSize);
			Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}