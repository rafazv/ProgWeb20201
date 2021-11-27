# MINHA LOJA

Minha loja é um web app desenvolvido em React Js e Node com Express que simula o comportamento de um e-commerce.

Nele você pode:

- Cadastrar clientes;
- Clientes podem comprar produtos;
- Cadastrar novos colaboradores;
- Colaboradores podem cadastrar/editar/remover e adicionar imagens aos produtos;

## Para usar a aplicação:

### BACK-END:

Entre em `ProgWeb20201/shop` e rode o seguinte comando:

```
docker-compose up
```

Esse comando irá subir um container docker com o back-end e o banco mysql;

O back-end estará rodando na porta 3020;

### Preparando o Banco de Dados

Entre no container chamado `shop_mysqldb_1`:

```
docker exec -it shop_mysqldb_1 bash
```

Em seguida rode:

```
mysql -h localhost -u root -p
```

Obs.: Senha: root

Após isso crie um database chamado `store`;
### Rodando migrações e seeders

Entre no container chamado `shop_web_1`:

```
docker exec -it shop_web_1 npx sequelize db:migrate
docker exec -it shop_web_1 npx sequelize db:seed:all
```

O primeiro comando rodará as migrações e o segundo as sementes.

Obs.: Será criado um primeiro usuário empregado;


E-mail: admin@email.com

Senha: 123456

### FRONT-END:

Entre em `ProgWeb20201/front` e rode o seguinte comando:

```
npm install
npm start
```

O primeiro comando instalará todas as dependências necessárias para rodar o front-end e o segundo comando iniciará a aplicação React.

O front-end estará rodando na porta 3021;