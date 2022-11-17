var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http
.createServer((req, res) => {
  let name = req.url.slice(1)
  console.log(name)
  const files = fs.readdirSync('./images');


  for(const file of files){
    if(file.includes(name)){
        res.writeHead(200,{"content-type": "image/jgp"})
        const imagen = fs.readFileSync(`./images/${name}_doge.jpg`)
        return res.end(imagen)
    }
  }

  return res.writeHead((404)).end('not found 404')

  



}).listen(3001, "localhost")