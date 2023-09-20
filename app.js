//CORE modules
//NOTE: we use "require" to import certain package
const readline = require ('readline')
const fs = require('fs')
const url =  require('url')
// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout
// })

// rl.question("enter your name " , (name) => {
//     console.log("hello");
//     console.log(name);
//     rl.close();
// } )

// rl.on('close', () => {
//     console.log("we are closing");
//     process.exit(0) //?
// })

// ***********************************
//  const fs = require('fs')
// const textIn = fs.readFileSync('./Files/input.txt', 'utf-8') //?: what is utf-8 ?
// console.log(textIn)

// let content = 'data read from input.txt: ${textIn} '
// fs.writeFileSync('./Files/output.txt', content)

// ***********************************

// fs.readFile('./Files/start.txt', 'utf-8',(error1 , data1) => {
//     // if(!error1){}
//     console.log(data1)
//     // fs.readFile('./Files/${data1)}.txt','utf-8')
// }) 
// console.log("Reading file ....")

// ***********************************

const html = fs.readFileSync('./Template/index.html', 'utf-8')
const http = require('http');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8' ) )
let productLisyHtml = fs.readFileSync('./Template/products-list.html', 'utf-8')
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8')

function replaceHtml(template,product) {
    let output = template.replace('{{%IMAGE%}}',product.productImage)
    output = output.replace('{{%NAME%}}',product.name)
    output = output.replace('{{%MODELNAME%}}',product.modeName)
    output = output.replace('{{%MODELNO%}}',product.modelNumber)
    output = output.replace('{{%SIZE%}}',product.size)
    output = output.replace('{{%CAMERA%}}',product.camera)
    output = output.replace('{{%PRICE%}}',product.price)
    output = output.replace('{{%COLOR%}}',product.color)
    output = output.replace('{{%ID%}}',product.id)
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output; //?
}
//create a server:
const server = http.createServer((request, response) => {
    
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