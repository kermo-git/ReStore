using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;

namespace API.Controllers {
    public class ProductsController: BaseApiController {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams args) {
			var query = _context.Products
				.Sort(args.OrderBy)
				.Search(args.SearchTerm)
				.Filter(args.Brands, args.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(query, args.PageNumber, args.PageSize);
			Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

		[HttpGet("filters")]
		public async Task<IActionResult> GetFilters() {
			var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
			var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
			return Ok(new {brands, types});
		}
    }
}