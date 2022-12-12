using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPGApi
{
    public class Item
    {
        public long vnum { get; set; }
        public string item_name { get; set; }
        public int rarity { get; set; }
        public int type { get; set; }
        public int subtype { get; set; }
        public int price { get; set; }

        public Item(long vnum, string item_name, int rarity, int type, int subtype, int price)
        {
            this.vnum = vnum;
            this.item_name = item_name;
            this.rarity = rarity;
            this.type = type;
            this.subtype = subtype;
            this.price = price;
        }
    }
}
