//CORE modules
//NOTE: we use "require" to import certain package
const readline = require ('readline')
const fs = require('fs')
const url =  require('url')
const events =  require('events')

//CUSTOM MODULES
const replaceHtml = require('./Modules/replaceHtml')
const user = require('./Modules/user')

const html = fs.readFileSync('./Template/index.html', 'utf-8')
const http = require('http');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8' ) )
let productLisyHtml = fs.readFileSync('./Template/products-list.html', 'utf-8')
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8')

//create a server:
const server = http.createServer()
server.on('request',(request, response) => {
    
    // let x = url.parse(request.url, true) 
    // console.log(x) // NOTE: pathname property store the source name' value
    let {query , pathname: path} = url.parse(request.url, true) //? url.parse? true? what is this: "pathname : path" ?
    // let path = request.url;
    //response.end(path)
    if(path === '/' || path.toLocaleLowerCase() === '/home' ){
        response.writeHead(200,{
            'Content-Type' : 'text/html', //?
            'my-header' : 'Hello,world' //it is a customer header //what is that?
        })
        response.end(html.replace('{{%CONTENT%}}','you are in home page'))
    } else if (path.toLocaleLowerCase() === '/about' ){
        response.writeHead(200,{
            'Content-Type' : 'text/html', //?
            'my-header' : 'Hello,world' //it is a customer header //what is that?
        })
        response.end(html.replace('{{%CONTENT%}}','you are in about page'))
    } else if (path.toLocaleLowerCase() === '/contact' ){
        response.writeHead(200,{
            'Content-Type' : 'text/html', //?
            'my-header' : 'Hello,world' //it is a customer header //what is that?
        })
        response.end(html.replace('{{%CONTENT%}}','you are in contact page'))
    } else if (path.toLocaleLowerCase() === '/products' ){
        if(!query.id) {
            let productHtmlArray = products.map((prod)=>{
                return replaceHtml(productLisyHtml,prod)
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}',productHtmlArray.join(','))
         response.writeHead(200,{
            'Content-Type' : 'text/html'
        });
        response.end(productResponseHtml)
        } else {
            let prod = products[query.id]
            let productDetailResponceHtml = replaceHtml(productDetailHtml,prod)
            response.end(html.replace('{{%CONTENT%}}',productDetailResponceHtml))
        }

        //console.log(productHtmlArray);
        // fs.readFile('./Data/products.json', 'utf-8' , (error, data) => {
        //     let products = JSON.parse(data) // 
        //     response.end(data)
        // });
        
    }
     else {
        response.writeHead(404, {
            'Content-Type' : 'text/html', //?
            'my-header' : 'Hello,world' //it is a customer header //what is that?
        })
        response.end(html.replace('{{%CONTENT%}}','Error 404: page not found'))
    }
    
    // response.end(html)
    // console.log("a new request received")
    // // console.log(response)
});

//stert the server
server.listen(8000, '127.0.0.1',() => {
    console.log(`listening on port number  8000`);
})

let myEmitter = new events.EventEmitter()

//NOTE: you have to setup the event listner before emit any event t-m.s-
myEmitter.on('userCreate',(id,name)=>{
    // console.log('User created');
    console.log(`User ${name} with ${id} is created`);
})

//NOTE: you can make multiple listner , then all those listners will excuted one after the other
myEmitter.on('userCreate',()=>{
    //console.log('User added to database');
    console.log('User ${name} with ${id} added to database');
})

//it is a custom emitted event -m.s
myEmitter.emit('userCreate',101,'Samaa')

