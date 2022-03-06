namespace MazamerBadaway.Core.Entities
{
    public class ReaderDegree : BaseEntity
    {
        public int ReaderId { get; set; }
        public int RulerId { get; set; }

        public double Degree { get; set; }
    }
}
