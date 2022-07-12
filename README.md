# Projeto EnaFood

Este projeto consiste de um codigo back-end escrito em NodeJs com persistencia de dados feita com MonogDB. O objetivo é criar chamadas de API para simular o funcionamento de um aplicativo de entregas como o Ifood, tendo como principais pontos:<br>
• Obter os produtos que estão disponíveis para compra<br> 
• Manipular os produtos na sacola (inserir, escolher quantidades, remover...)<br><br>

<h2>Chamadas de API</h2>

<h3>/produtos/novoProduto  -  POST</h3>
Esta chamada é utilizada para criar um novo produto no BD, aceita como entrada um Json e retorna cod. 200 em caso de sucesso, caso contrario o erro sera retornado.<br>

```
{
  "nome": "fanta",
  "tipo": "Bebida",
  "valor": 50.00,
  "loja": "62cc635ab3f7de195f196f4a"
}
```
Esse é um exemplo de input de dado, sendo "loja" o ID da loja vendendo o produto. Por padrão todos os itens inseridos começam como habilitados, podendo ser desabilitado pelo restaurante.


<h3>/produtos/pesquisaProduto  -  GET</h3>
Esta chamada é utilizada para procurar produtos no BD, aceita como entrada uma query podendo conter os dados:
<br>"tipo" -> Tipo de produto 
<br>"disponivel" -> caso o produto esteja ativo ou não <br>
"loja" -> ID da loja<br>
Os filtros podem ser utilizados em conjunto ou podem não ser usados, retornando todos os itens do BD. Exmplo de retorno:<br>

```
[
	{
		"_id": "62cc638f12cba6a51cac6283",
		"nome": "Coca-cola",
		"tipo": "Bebida",
		"valor": 50,
		"loja": "62cc635ab3f7de195f196f4a",
		"disponivel": true,
		"__v": 0
	},
	{
		"_id": "62cd7d0f5e8c0c45a62e6cc9",
		"nome": "fanta",
		"tipo": "Bebida",
		"valor": 50,
		"loja": "62cc635ab3f7de195f196f4a",
		"disponivel": true,
		"__v": 0
	}
]
```

<h3>/itens/addIten  -  POST</h3>
Esta chamada é utilizada para adicionar itens no carrinho, aceita como entrada um Json, exemplo:

```
{
	"carrinho":"62cd7cba5e8c0c45a62e6cb6",
	"iten":"62cc630412cba6a51cac6279",
	"user":"62cc74398e7944fde62eea14",
	"qtn":2
}
```
Sendo "carrinho" o ID do carrinho a ser adicionado, "iten" o ID do iten, "user" o usuario a quem pertence o carrinho e "qtn" a quantidade de itens. Caso não seja passado um ID de carrinho, um novo sera criado e o produto sera inserido nele. A cada inserção de iten o carrinho é atualizado com o novo valor total e quantidade de itens. Essa chamada retorna um carrinho:

```
{
	"_id": "62cd7cba5e8c0c45a62e6cb6",
	"user": "62cc74398e7944fde62eea14",
	"data_criacao": "2022-07-12T13:52:57.681Z",
	"qtn_itens": 4,
	"valor_total": 62.24,
	"pedido_finalizado": false,
	"__v": 0
}
```

<h3>/itens/deleteIten  -  POST</h3>
Utilizada para deletar um iten do carrinho. Basta passar o ID do iten via query com o parametro "id".

<h3>/itens/modifyIten  -  POST</h3>
Utilizada para modificar um iten do carrinho. No momento a unica alteração possivel é na quantidade de itens. Para isso basta passar via query o "id" e a nova "qtn"<br>Ex:
<code>/itens/modifyIten?id=62cd795cd32295d2615bbba7&qtn=1</code>

<h3>/carrinhos/getCarrinho  -  GET</h3>
Chamada utilizada para obter um carrinho e seus itens, basta passar o "id" do carrinho via query. Ex de retorno:<br>

```
{
	"carrinho": {
		"_id": "62cd77149e93fdcd2e033918",
		"user": "62cc74398e7944fde62eea14",
		"data_criacao": "2022-07-12T13:28:50.833Z",
		"qtn_itens": 18,
		"valor_total": 280.08,
		"pedido_finalizado": false,
		"__v": 0
	},
	"itens": [
		{
			"_id": "62cd775bb69d4e808ce84759",
			"carrinho": "62cd77149e93fdcd2e033918",
			"data_adicao": "2022-07-12T13:29:17.882Z",
			"qtn": 2,
			"iten": "62cc630412cba6a51cac6279",
			"__v": 0
		},
		{
			"_id": "62cd794abb483e6383783feb",
			"carrinho": "62cd77149e93fdcd2e033918",
			"data_adicao": "2022-07-12T13:37:28.270Z",
			"qtn": 2,
			"iten": "62cc630412cba6a51cac6279",
			"__v": 0
		}
	]
}
```

<h3>/carrinho/deleteCarrinho  -  POST</h3>
Utilizada para deletar um carrinho e todos os itens atrelados a ele. Basta passar o ID do carrinho via query com o parametro "id".

<h2>Motivação</h2>
Os modelos e codigos foram estruturados visando um projeto que seja facilmente escalavel para comportar todas as fases previstas para a empresa, deixando os itens pequenos, bem definidos e mais faceis de realizar pesquisas.
