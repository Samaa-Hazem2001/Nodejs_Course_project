// //CORE modules
// //NOTE: we use "require" to import certain package
const readline = require ('readline')
const fs = require('fs')
const url =  require('url')
const events =  require('events')
const http = require('http');

// //CUSTOM MODULES
// const replaceHtml = require('./Modules/replaceHtml')
// const user = require('./Modules/user')

const html = fs.readFileSync('./Template/index.html', 'utf-8')

// let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8' ) )
// let productLisyHtml = fs.readFileSync('./Template/products-list.html', 'utf-8')
// let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8')

// //create a server:
const server = http.createServer()
// server.on('request',(request, response) => {
    
//     // let x = url.parse(request.url, true) 
//     // console.log(x) // NOTE: pathname property store the source name' value
//     let {query , pathname: path} = url.parse(request.url, true) //? url.parse? true? what is this: "pathname : path" ?
//     // let path = request.url;
//     //response.end(path)
//     if(path === '/' || path.toLocaleLowerCase() === '/home' ){
//         response.writeHead(200,{
//             'Content-Type' : 'text/html', //?
//             'my-header' : 'Hello,world' //it is a customer header //what is that?
//         })
//         response.end(html.replace('{{%CONTENT%}}','you are in home page'))
//     } else if (path.toLocaleLowerCase() === '/about' ){
//         response.writeHead(200,{
//             'Content-Type' : 'text/html', //?
//             'my-header' : 'Hello,world' //it is a customer header //what is that?
//         })
//         response.end(html.replace('{{%CONTENT%}}','you are in about page'))
//     } else if (path.toLocaleLowerCase() === '/contact' ){
//         response.writeHead(200,{
//             'Content-Type' : 'text/html', //?
//             'my-header' : 'Hello,world' //it is a customer header //what is that?
//         })
//         response.end(html.replace('{{%CONTENT%}}','you are in contact page'))
//     } else if (path.toLocaleLowerCase() === '/products' ){
//         if(!query.id) {
//             let productHtmlArray = products.map((prod)=>{
//                 return replaceHtml(productLisyHtml,prod)
//             })
//             let productResponseHtml = html.replace('{{%CONTENT%}}',productHtmlArray.join(','))
//          response.writeHead(200,{
//             'Content-Type' : 'text/html'
//         });
//         response.end(productResponseHtml)
//         } else {
//             let prod = products[query.id]
//             let productDetailResponceHtml = replaceHtml(productDetailHtml,prod)
//             response.end(html.replace('{{%CONTENT%}}',productDetailResponceHtml))
//         }

//         //console.log(productHtmlArray);
//         // fs.readFile('./Data/products.json', 'utf-8' , (error, data) => {
//         //     let products = JSON.parse(data) // 
//         //     response.end(data)
//         // });
        
//     }
//      else {
//         response.writeHead(404, {
//             'Content-Type' : 'text/html', //?
//             'my-header' : 'Hello,world' //it is a customer header //what is that?
//         })
//         response.end(html.replace('{{%CONTENT%}}','Error 404: page not found'))
//     }
    
//     // response.end(html)
//     // console.log("a new request received")
//     // // console.log(response)
// });

//stert the server
server.listen(8000, '127.0.0.1',() => {
    console.log(`listening on port number  8000`);
})

// // let myEmitter = new events.EventEmitter()
// let myEmitter = new user()

// //NOTE: you have to setup the event listner before emit any event t-m.s-
// myEmitter.on('userCreate',(id,name)=>{
//     // console.log('User created');
//     console.log(`User ${name} with ${id} is created`);
// })

// //NOTE: you can make multiple listner , then all those listners will excuted one after the other
// myEmitter.on('userCreate',()=>{
//     //console.log('User added to database');
//     console.log(`User ${name} with ${id} added to database`);
// })

// //it is a custom emitted event -m.s
// myEmitter.emit('userCreate',101,'Samaa')

//sol_1
// server.on('request',(req, res) =>{
//     fs.readFile('./Files/large-file.txt',(err,data)=>{
//         if(err) {
//             res.end('something wrong')
//             return
//         }
//         res.end(data)
//     })
   
// })

//sol_2: NOTE:
//only store chunk by chunk in the memory , not all the data
//and send the chunk once readed to the responce
// server.on('request', (req, res) =>{
//     let rs = fs.createReadStream('./Files/large-file.txt');

//     rs.on('data', (chunk) => {
//         res.write(chunk)
//         // res.end() //NOTE
//     })

//     rs.on('error', (error) => {
//         res.end(error.message);
//     })

//     rs.on('end', () => {
//         res.end();
//     })   
// })

// sol_3: NOTE:
// "backpressure" when the reading and writing speeds are not equal
// server.on('request', (req, res) => {
//     let rs = fs.createReadStream('./Files/large-file.txt');
//     rs.pipe(res); 
//     //NOTE: we can not use "pipe" by something else than the readable stream , as this:
//     //redableSource.pipe(writableDest)
//     //writableDest can be .... 
// })

//NOTE: to install "Express" -last version- : write in the terminal "npm install express"

//NOTE: install development dependencies: to inform that this dependency in development dependencies
// we have to write "--save-dev" after the intallation command

//NOTE: nodemon usage is ..

//NOTE: to install package globally: "npm install -g" +package name+ (if it is dev dependency) "--save-dev"

//NOTE: to use "nodemon" : write in the terminal : nodemon +file_name.js 

// console.log('program started')

// //NOTE:this is stored in 1st phase in event loop
// setTimeout(() =>{
//     console.log('timer callback excuted')
// }, 0) // 0? then why it is not excuted before "console.log('program complete')"

// //NOTE:this is stored in 2nd phase in event loop
// fs.readFile('./Files/input.txt', () => {
//     console.log('file read complete')
// })


// //NOTE:this is stored in 3rd phase in event loop
// setImmediate(()=> {
//     console.log('setImmediate callback excuted')   
// })

// console.log('program complete')

//**********************************
console.log('program started')

fs.readFile('./Files/input.txt', () => {
    console.log('file read complete')

    setTimeout(() =>{
        console.log('timer callback excuted')
    }, 0) 

    setImmediate(()=> {
        console.log('setImmediate callback excuted')   
    })

    //NOTE: this callback will be exctuted before setTimeout's and setImmediate's callback functions
    //the explanation in this video: 
    // https://www.youtube.com/watch?v=5F4iO-W0ZbY&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=28&pp=iAQB

    process.nextTick(() => {
        console.log('process.nextTick callback executed')
    })
})

console.log('program complete')

