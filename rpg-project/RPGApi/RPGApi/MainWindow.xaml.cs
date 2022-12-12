using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace RPGApi
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Client client = new Client();
        public MainWindow()
        {
            InitializeComponent();
        }

        private int GetEnumValue(ComboBox box)
        {
            RARITY item = (RARITY)box.SelectedItem;
            return (int)item;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {     
            client.CreateItem(
                new Item(int.Parse(vnum.Text), item_name.Text,
                GetEnumValue(rarity_cmb),
                GetEnumValue(type_cmb),
                GetEnumValue(eq_cmb)
               , int.Parse(price.Text)
               ), res, "/item");
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            type_cmb.ItemsSource = Enum.GetValues(typeof(TYPE)).Cast<TYPE>();
            eq_cmb.ItemsSource = Enum.GetValues(typeof(EQ_TYPE)).Cast<EQ_TYPE>();
            rarity_cmb.ItemsSource = Enum.GetValues(typeof(RARITY)).Cast<RARITY>();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            client.GenerateItemProto(res);
        }

        private void Eq_cmb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var select = (EQ_TYPE)((ComboBox)sender).SelectedItem;
            if(select != 0)
            {
                vnum.Text = ((int)select * 1000).ToString();
            }
        }

        //private void Button_Click_2(object sender, RoutedEventArgs e)
        //{
        //    MessageBox.Show("Potions:0, Swords:1000, Helmet:2000," +
        //        "Armor:3000, Shield:4000",
        //        "List of VNUMs", MessageBoxButton.OK, MessageBoxImage.Information);
        //}
    }

    public enum TYPE
    {
        MATERIAL = 0,
        POTION = 1,
        EQUIPMENT = 2,
    }

    public enum EQ_TYPE {
        NONE= 0,
        SWORD = 1,
        HELMET = 2,
        ARMOR = 3,
        SHIELD = 4,
        ACCESSORIES= 5,
        GLOVES = 6,
        LEGS = 7,
        BOOTS = 8,
    }

    public enum RARITY
    {
        COMMON = 0,
        UNCOMMON = 1,
        RARE = 2,
        EPIC = 3,
        LEGENDARY = 4
    }

}
