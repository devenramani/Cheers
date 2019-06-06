using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cheers.DB.Models
{
    public class CheerTable
    {
        [Key]
        public int CheerID { get; set; }
        public string CheerText { get; set; }
        public int CheerFromID { get; set; }
        public int CheerToID { get; set; }
        public string CheerTime { get; set; }
    }
}
