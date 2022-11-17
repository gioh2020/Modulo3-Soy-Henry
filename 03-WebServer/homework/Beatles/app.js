var http = require('http');
var fs   = require('fs');
const { url } = require('inspector');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http
.createServer((req, res) => {
if(req.url === "/"){
  const indx = fs.readFileSync("./index.html", "utf-8");
  res.writeHead((200),{"content-type":"text/html"})
  res.end(JSON.stringify(indx))
}
const urlname= req.url.split("/")
if(urlname.length < 3){
  const beatleName = urlname.pop().replace("%20", " ") 
  const beatle = beatles.filter(elemnt => elemnt.name === beatleName)[0];
  console.log(beatle)
  let template = fs.readFileSync("./beatle.html", "utf-8");
  
  template = template.replace("{name}", beatle.name);
  template = template.replace("{birthdate}", beatle.birthdate);
  template = template.replace("{profilePic}", beatle.profilePic);
  console.log(template)
  res.writeHead((200),{"content-type": "text/html"})
  return res.end(JSON.stringify(template))


}

  if(req.url === "/api"){
 
  res.writeHead((200),{"content-type":"aplication/jason"})
  return res.end(JSON.stringify(beatles)
  )};

  const name = req.url.split("/").pop().replace("%20", " ");
  console.log(name)
  

  

  if(req.url.includes("/api")&& name){
    const beatle = beatles.filter(elemnt => elemnt.name === name);
    console.log(beatle)
    if(!beatle.length){ return res.writeHead((404)).end('not found 404')}

    res.writeHead((200),{"content-type":"aplication/jason"})
    return res.end(JSON.stringify(beatle))
  }
  

}).listen(3000, "localhost")

