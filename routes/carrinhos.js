var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const produtoModel = require('./produtos').model;
const itenModel = require('./itens').model

// CONECTION
mongoose.connect("mongodb://localhost:27017/Enacom")

// SCHEMA DE PRODUTO
var carrinhoSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    data_criacao: {type:mongoose.Schema.Types.Date, default:Date.now()},
    qtn_itens: mongoose.Schema.Types.Number,
    valor_total:mongoose.Schema.Types.Number,
    pedido_finalizado : Boolean
})
var carrinhoModel = mongoose.model("carrinho",carrinhoSchema)


/* ROUTES */
router.post('/deleteCarrinho', async function(request,response){
    await carrinhoModel.deleteOne({_id:request.query.id})
    await itenModel.deleteMany({carrinho:request.query.id})
    response.send(200)
});

router.get('/getCarrinho', async function(request,response){
    var query = request.query // valores passados pelo front
    var result = await carrinhoModel.findById(query.id)
    var itens_do_carrinho = await itenModel.find({carrinho:query.id})
    var retorno = {carrinho:result, itens:itens_do_carrinho};
    response.send(200,retorno)
})

async function novoCarrinho(user){
    var novoCarrinho = new carrinhoModel({
        user: mongoose.Types.ObjectId(user),
        qtn_itens : 0,
        valor_total: 0.0,
        pedido_finalizado: false
    })
    var result = await novoCarrinho.save()
    return result._id;
}

async function updateCarrinho(carrinho,itens){
    var qtn_de_itens = 0;
    var valor_total = 0.0;
    //console.log(itens)
    for(const iten of itens){
        qtn_de_itens = qtn_de_itens + iten.qtn;
        var produto = await produtoModel.findById(iten.iten)
        var preco_un = produto.valor;
        valor_total = valor_total + (iten.qtn * preco_un)
    };
    await carrinhoModel.updateOne({_id:carrinho}, {$set:{qtn_itens:qtn_de_itens, valor_total:valor_total}})
    var carrinhoAtualizado = await carrinhoModel.findById(carrinho)
    return carrinhoAtualizado;
}

module.exports = router;
exports.novoCarrinho = novoCarrinho;
exports.updateCarrinho = updateCarrinho;