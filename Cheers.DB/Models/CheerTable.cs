using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cheers.DB.Models
{
    public class CheerTable
    {
        [Key]
        public int CheerID { get; set; }
        public string CheerText { get; set; }
        [ForeignKey("FromUser")]
        public string CheerFrom { get; set; }
        [ForeignKey("ToUser")]
        public string CheerTo { get; set; }
        public string CheerTime { get; set; }

        public virtual User FromUser { get; set; }
        public virtual User ToUser { get; set; }
    }
}
