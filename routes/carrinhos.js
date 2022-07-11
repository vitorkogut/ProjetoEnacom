var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

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
    response.send(200)
});

router.get('/getCarrinho', async function(request,response){
    var query = request.query // valores passados pelo front
    var filtro = {} // Json utilizado para gerar o filtro
    
   // TODO
    
})

async function newCarrinho(user){
    var novoCarrinho = new carrinhoModel({
        user: mongoose.Types.ObjectId(user),
        qtn_itens : 0,
        valor_total: 0.0,
        pedido_finalizado: false
    })
    var result = await novoCarrinho.save()
    return result._id;
}

async function updateCarrinho(carrinho){
    
}

module.exports = router;
module.exports = newCarrinho;