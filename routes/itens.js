var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Carrinho = require("./carrinhos");


// CONECTION
mongoose.connect("mongodb://localhost:27017/Enacom")

// SCHEMA DE PRODUTO
var itenSchema = new mongoose.Schema({
    carrinho: mongoose.Schema.Types.ObjectId,
    data_adicao: {type:mongoose.Schema.Types.Date, default:Date.now()},
    qtn: mongoose.Schema.Types.Number,
    iten:mongoose.Schema.Types.ObjectId
})
var itenModel = mongoose.model("iten",itenSchema)


/* ROUTES */
router.post('/deleteIten', async function(request,response){
    await itenModel.deleteOne({_id:request.query.id})
    response.send(200)
});

router.post('/addIten', async function(request,response){
    var dados = request.body

    if(!dados.user || !dados.qtn || !dados.iten){ // verifica se falta algum dado
        response.send(400, {"ERROR":"Faltam dados!"})
        return
    }

    if(!dados.carrinho){ // caso não seja passado um carrinho, um novo é gerado para o usuario
        dados.carrinho = await Carrinho.novoCarrinho(dados.user)
    }
    
    var itemToAdd = new itenModel({
        carrinho:dados.carrinho,
        qtn:dados.qtn,
        iten:dados.iten
    })
    await itemToAdd.save()

    var itens_do_carrinho = await itenModel.find({'carrinho':dados.carrinho}) // pega os itens do carrinho para dar update nele
    var carrinhoAtualizado = await Carrinho.updateCarrinho(dados.carrinho,itens_do_carrinho)

    response.send(200,carrinhoAtualizado) // caso seja um novo carrinho manda o ID dele
});

router.post('/modifyIten', async function(request,response){
    await itenModel.updateOne({_id:request.query.id}, {$set:{qtn:request.query.qtn, data_adicao:Date.now()}})
    response.send(200)
});

module.exports = router;
module.exports.model = itenModel;
