using System;
using X.PagedList;

namespace MazamerBadaway.Core.Utilities
{
    public sealed class PagedListResult<T> where T : class
    {
        public PagedListResult(IPagedList<T> pagedList)
        {
            if (pagedList == null)
            {
                throw new NullReferenceException("Paged List can not be null");
            }

            content = pagedList;
            totalPages = pagedList.PageCount;
            totalElements = pagedList.TotalItemCount;
            number = pagedList.PageNumber;
            size = pagedList.PageSize;
            numberOfElements = pagedList.Count;
            hasPreviousPage = pagedList.HasPreviousPage;
            hasNextPage = pagedList.HasNextPage;
        }
        public IPagedList<T> content { get; private set; }
        public int totalElements { get; private set; }
        public int totalPages { get; private set; }
        public int size { get; private set; }
        public int number { get; private set; }
        public int numberOfElements { get; private set; }
        public bool hasPreviousPage { get; private set; }
        public bool hasNextPage { get; private set; }
    }
}
