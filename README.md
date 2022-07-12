# Projeto EnaFood

Este projeto consiste de um codigo back-end escrito em NodeJs com persistencia de dados feita com MonogDB. O objetivo é criar chamadas de API para simular o funcionamento de um aplicativo de entregas como o Ifood, tendo como principais pontos:<br>
• Obter os produtos que estão disponíveis para compra<br> 
• Manipular os produtos na sacola (inserir, escolher quantidades, remover...)<br><br>

<h2>Chamadas de API</h2>

<h3>/produtos/novoProduto</h3>
Esta chamada é utilizada para criar um novo produto no BD, aceita como entrada um Json e retorna cod. 200 em caso de sucesso, caso contrario o erro sera retornado.<br>
```
{
   "nome": "fanta",
   "tipo": "Bebida",
   "valor": 50,
   "loja": "62cc635ab3f7de195f196f4a"
}
```
