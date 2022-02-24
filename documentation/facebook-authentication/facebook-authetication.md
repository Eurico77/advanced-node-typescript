## Autenticação com Facebook

> ## Dados:
* Token de acesso

> ## Fluxo primario:
1. Obter dados (nome, email, Facebook-id) da API do Facebook
2. Consultar se existe um usuario com o email recebido acima
3. Criar uma conta para o usuario com os dados recebidos do facebook
4. Criar um token de acesso, a partir do ID do usuario, com expiração de 30 minutor
5. Retornar o token de acesso gerado

>## Fluxo alternativo: Usuario ja existe
3. Atualizar os dados do usuario com os dados recebidos do facebook (nome, email, Facebook ID - só atualiar o nome caso a conta do usuario não possua nome )

>## Fluxo de exceção: Token invalido ou expirado
1. Retornar um erro de autenticação
