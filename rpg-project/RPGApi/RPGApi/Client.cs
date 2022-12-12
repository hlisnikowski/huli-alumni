using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace RPGApi
{
    public class Client
    {
        public string domain;

        public Client(string domain = "http://localhost:8080/api/v2")
        {
            this.domain = domain;
        }

        public void CreateItem(Item item, TextBlock tt, string endpoint, string method = "post")
        {
            string url = domain + endpoint;
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage msg = null;
                // Message
                HttpRequestMessage httpRequestMessage = new HttpRequestMessage(method == "post" ? HttpMethod.Post : HttpMethod.Get, url);
                // Body
                var content = JsonConvert.SerializeObject(item);
                httpRequestMessage.Content = new StringContent(content, Encoding.UTF8, "application/json");
              
                var result = client.SendAsync(httpRequestMessage);
                result.Wait();
                msg = result.Result;
                try
                {
                    Response response = JsonConvert.DeserializeObject<Response>(msg.Content.ReadAsStringAsync().Result);
                    tt.Text = response.Message;
                }
                catch (Exception)
                {
                    tt.Text = msg.Content.ReadAsStringAsync().Result;
                }            
            }
        }

        public void GenerateItemProto(TextBlock tt)
        {
            // Create JSON data for frontend
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage msg = null;
                string url = domain + "/dump";
                HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
                var result = client.SendAsync(httpRequestMessage);
                result.Wait();
                msg = result.Result;

                try
                {
                    Response response = JsonConvert.DeserializeObject<Response>(msg.Content.ReadAsStringAsync().Result);
                    tt.Text = response.Message;
                }
                catch (Exception)
                {
                    tt.Text = msg.Content.ReadAsStringAsync().Result;
                }
            }
        }

    }

    [JsonObject]
    public class Response
    {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
