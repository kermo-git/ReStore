using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers {

    public class PagedList<T>: List<T> {
        public PagedList(List<T> items, int totalCount, int pageNumber, int pageSize) {
			MetaData = new MetaData {
				CurrentPage = pageNumber,
				TotalPages = (int) Math.Ceiling(totalCount / (double) pageSize),
				PageSize = pageSize,
				TotalCount = totalCount
			};
			AddRange(items);
		}

		public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize) {
			int totalCount = await query.CountAsync();
			var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
			return new PagedList<T>(items, totalCount, pageNumber, pageSize);
		}

		public MetaData MetaData { get; }
    }
}