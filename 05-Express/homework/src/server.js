// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());

// TODO: your code to handle requests
server.use(express.json())

let id = 1

server.post("/posts", (req, res)=>{
    const { author, title, contents} = req.body

    if(!author || !title || !contents){
      return  res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const newPost = {
        id: id++,
        author: author,
        title: title,
        contents: contents,
    }
    posts.push(newPost)
    res.status(200).json(newPost)
})
server.post("/posts/author/:author",(req, res)=>{
    const {title, contents} = req.body;
    const{author} = req.params;
    if(!author || !title || !contents){
        return  res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"})
      }

})

server.get("/posts", (req, res)=>{
    const {term} = req.query
    if (term) {
        const newArr =  posts.filter((element)=>{
             return element.title.includes(term) || element.contents.includes(term)
        });
        res.status(200).json(newArr)

    }else{
        res.status(200).json(posts)
    }

})
server.get("/posts/:author", (req, res)=>{
    const {author} = req.params;
    let  newArrAuthor = posts.filter((elemento)=>elemento.author === author )
    if(newArrAuthor.length >0 ){ res.status(200).json(newArrAuthor)
    } else{
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
        }
  
})

server.get("/posts/:author/:title", (req, res)=>{
   const {author, title} = req.params
   
   const newArrTitleAuthor = posts.filter((elemento)=>{
    return elemento.author === author &&  elemento.title === title
   })
 
   if(newArrTitleAuthor.length){
    res.status(200).json(newArrTitleAuthor)
   }else{
    return res.status(STATUS_USER_ERROR).json({
        "error": "No existe ningun post con dicho titulo y autor indicado"})
       }

})
server.put("/posts", (req, res)=>{
    const {id, title, contents} = req.body
    if(!id || !title || !contents ){ 
    return res.status(STATUS_USER_ERROR).json({
        error: "No se recibieron los parámetros necesarios para modificar el Post"})}
    const changePost = posts.find(element => element.id === parseInt(id))
    if(changePost){
        changePost.title = title
        changePost.contents = contents
        res.status(200).json(changePost)
    }else{res.status(STATUS_USER_ERROR).json({
        error: "No se encuentra el post con el id recibido"})

    }
})
server.delete("/posts", (req, res)=>{
    const {id} = req.body;
    const deletepost = posts.find(element => element.id === parseInt(id))

    if(!id || !deletepost){
        res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts = posts.filter((element) => element.id !== id)

    res.status(200).json({ success: true })

})
server.delete("/author", (req, res)=>{
    const {author} = req.body

    const newAuthor = posts.find(element => element.author === author)

    if(!author || ! newAuthor){
        res.status(STATUS_USER_ERROR).json( {"error": "No existe el autor indicado"})
    }

    const newAuthores =  posts.filter((element)=> element.author === author)
    res.status(200).json(newAuthores)


    
})

    

module.exports = { posts, server };
