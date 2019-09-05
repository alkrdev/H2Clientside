using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Activities.Expressions;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication.ServiceReference1;

namespace WebApplication
{
    public partial class WebForm : System.Web.UI.Page
    {
        public static List<BookingItem> BookingItems;
        public static int bookingNumber;
        public static int numberOfSeats;
        public static List<Sample> samples = new List<Sample>();
        public static double columns;

        protected void Page_Load(object sender, EventArgs e)
        {
            string json = "";

            using (WebClient wc = new WebClient())
            {
                json = wc.DownloadString("http://restpublic.junoeuro.dk//service1.svc//getListOfPersons//");
            };

            List<Person> pList = JsonConvert.DeserializeObject<List<Person>>(json);

            GridView1.DataSource = pList;
            GridView1.DataBind();

            ListBox1.DataSource = pList;
            ListBox1.DataBind();

            numberOfSeats = 24;
            bookingNumber = 12091;
            columns = Math.Ceiling(numberOfSeats / 4f);

            SetBookingNumber();
            SetBookingItemsExt();
            CreateGrid();
            CloseSeats();

            //pList.ForEach(x =>
            //{
            //    Button b = new Button();
            //    b.Text = x.Name;
            //    //b.Click += new EventHandler(Button_Click);
            //    b.CommandArgument = "http://" + x.Url;
            //    b.Attributes.Add("class", "buttonClass");
            //    PlaceHolder1.Controls.Add(b);
            //});


        }

        protected void Button_Click(object sender, EventArgs e)
        {
            Page.ClientScript.RegisterStartupScript(
                GetType(), "OpenWindow", "window.open('" + (sender as Button).CommandArgument + "','_newtab');", true);
        }

        [WebMethod]
        public static string GetData()
        {
            string json = "";
            using (WebClient wc = new WebClient())
            {
                json = wc.DownloadString("http://restpublic.junoeuro.dk//service1.svc//getListOfPersons");
            }
            return json;
        }

        public void CreateGrid()
        {
            for (int i = 0; i < numberOfSeats; i++)
            {
                samples.Add(new Sample { url = "Images/SeatOpen.png", id = i });
            }

            DataList1.RepeatColumns = (int)columns;
            DataList1.DataSource = samples;
            DataList1.DataBind();
        }

        public void CloseSeats()
        { 
            BookingItems.ForEach(x =>
            {
                if (x.State == 1)
                {
                    samples[BookingItems.FindIndex(a => a == x)].url = "Images/SeatClose.png";
                }
            });
            DataList1.DataSource = samples;
            DataList1.DataBind();
        }

        public void SetBookingNumber()
        {
            using (Service1Client sc = new Service1Client())
            {
                bool success = sc.CreateBookingNumber(bookingNumber, numberOfSeats);
            }
        }

        public void SetBookingItemsExt()
        {
            using (Service1Client sc = new Service1Client())
            {
                BookingItems = sc.GetBookingItems(bookingNumber).ToList();
            }
        }
        [WebMethod]
        public static void SetSeatState(string state, string id)
        {

            BookingItems[int.Parse(id)].State = int.Parse(state);
            SendArray();
            
        }

        public static void SendArray ()
        {
            using (Service1Client sc = new Service1Client())
            {
                sc.SetBookingItems(bookingNumber, BookingItems.ToArray());
            }
        }
    }

    internal class Person
    {
        public bool Active { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public override string ToString()
        {
            return $"Active: {Active} // " + $"Age: {Age} // " + $"Name: {Name} // " + $"Description: {Description} // " + $"Url: {Url}";
        }
    }

    public class Sample
    {
        public string url { get; set; }
        public int id { get; set; }
    }
}