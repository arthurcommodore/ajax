const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload')
        
    }, filename: function(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }

})

const upload = multer({storage}).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err) 
            return res.end('Ocorreu um erro')
        res.end('Concluído com sucesso')
    })
})


app.post('/formulario', (req, res) => {
    res.send({
        body: req.body,
        id: 1
    })
})

app.get('/parOuImpar', (req, res) => {
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

app.listen(8080, () => console.log('work'))
