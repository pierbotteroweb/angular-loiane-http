const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')



// EM UM DEPLOY, SE TEMOS UMA APLICAÇÃO PEQUENA,
// PODEMOS TER JUNTOS O BACK END E O FRONT END
// O QUE SERIA UM (MONOLOTO)

// E SE FOR USADO UM PACOTE COM ANGULAR
// COM DOCKER E O SERVIDOR nginx, ESTE
// SERVIDOR NGINX TAMBÉM PODE SER USADO PARA
// PROXY DO SERVIÇO

// ENTÃO A PROPOSTA DA AULA É FAZER UM PROXY 
// PARA A API SEM PRECISAR HABILITAR O CORS

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// O * OFERECE ACESSO IRRESTRITO A NOSSA API
// NÃO RECOMENDADO PARA AMBIENTES DE PRODUÇÃO

// const corsOptions = {
//     origin: '*',
//     optionsSccessStatus: 200
// }

// app.use(cors(corsOptions))

const multipartMiddleware = multipart({ uploadDir: './uploads' })


app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files)
    res.json({message: files})
})


app.get('/downloadExcel', (req, res) => {
    res.download('./uploads/report.xlsx')    
})

// PARA DOWNLOAD PODEMOS USAR UM RECURSO DO
// PACOTE EXPRESS DISPONÍVEL NO RESPONSE DA NOSSA CHAMADA
// res.download('url)
app.get('/downloadPDF', (req, res) => {
    res.download('./uploads/report.pdf')    
})

app.use((err, req, res, next)=>{
    res.json({error: err.message})

})


app.listen(8000, ()=>{
    console.log('Servidor porta 8000')
})