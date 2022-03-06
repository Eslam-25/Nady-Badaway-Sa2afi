using Newtonsoft.Json;

namespace MazamerBadaway.Core.Utilities
{
    public class QueryParams
    {
        static readonly int DEFAULT_PAGE_SIZE = 10;
        static readonly int FIRST_PAGE_NUMBER = 1;
        static readonly string DEFAULT_DIRECTION = "asc";

        public QueryParams()
        {
            this.PageSize = DEFAULT_PAGE_SIZE;
            this.PageNumber = FIRST_PAGE_NUMBER;
            this.Direction = DEFAULT_DIRECTION;
            this.Query = null;
        }

        public QueryParams(int pageSize, int pageNumber)
        {
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;
            this.Query = null;

        }
        
        [JsonProperty("size")]
        public int PageSize { get; set; }

        [JsonProperty("page")]
        public int PageNumber { get; set; }


        [JsonProperty("sortBy")]
        public string SortBy { get; set; }

        [JsonProperty("direction")]
        public string Direction { get; set; }

        [JsonProperty("query")]
        public string Query { get; set; }
    }
}
