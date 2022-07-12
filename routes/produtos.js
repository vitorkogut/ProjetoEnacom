var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

// CONECTION
mongoose.connect("mongodb://localhost:27017/Enacom")

// SCHEMA DE PRODUTO
var produtoSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    valor: mongoose.Schema.Types.Number,
    loja: mongoose.Schema.Types.ObjectId,
    disponivel : Boolean
})
var produtoModel = mongoose.model("produto",produtoSchema)


/* ROUTES */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/novoProduto', async function(request,response){
    var dados = request.body
    try{
        if(!dados.nome || !dados.tipo || !dados.valor || !dados.loja){ // verifica se falta algum dado
            response.send(400, {"ERROR":"Faltam dados!"})
            return
        }
        var novoProduto = new produtoModel({ // nova instancia de produto
            nome: dados.nome,
            tipo: dados.tipo,
            valor: dados.valor,
            loja: mongoose.Types.ObjectId(dados.loja),
            disponivel : true
        })
        await novoProduto.save();
        response.send(200)
    }catch(e){
        console.log(e)
        response.send(400,{"ERROR":e})
    }
});

router.get('/pesquisaProduto', async function(request,response){
    var query = request.query // valores passados pelo front
    var filtro = {} // Json utilizado para gerar o filtro
    
    if(query.disponivel){
        if(query.disponivel == 'true'){
            filtro.disponivel = true
        }else{
            filtro.disponivel = false
        }
    } 
    if(query.tipo){
        filtro.tipo = query.tipo
    }  
    if(query.loja){
        filtro.loja = query.loja
    }
    var result = await produtoModel.find(filtro)

    if(result.length > 0){
        response.send(200,result)
    }else{
        response.send(204,{Error:"Nenhum item encontrado!"})
    }
    
})

module.exports = router;
module.exports = produtoModel;