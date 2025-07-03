# PromoDomo 

PromoDomo é uma plataforma colaborativa de promoções, desenvolvida com o objetivo de ajudar pessoas a economizar e, ao mesmo tempo, servir como vitrine para aplicação prática dos meus conhecimentos em desenvolvimento web. A ideia surgiu a partir de um problema real do dia a dia: a dificuldade em encontrar boas promoções reunidas em um só lugar, validadas pela própria comunidade.

- 🔗 Acesse-o: [Promodomo](https://promodomo.vercel.app/)

##  Funcionalidades

-  Cadastro e login de usuários
-  Cadastro de promoções com informações como título, descrição, valor e local
-  Visualização de promoções em lista e mapa (Google Maps)
-  Sistema colaborativo: qualquer usuário autenticado pode adicionar promoções
-  Interface responsiva e moderna com Tailwind CSS

## Funcionalidades Futuras

- Filtro de busca por categoria e localização
- Sistema de curtidas e comentários
- Área de gerenciamento para usuários e administradores

##  Tecnologias Utilizadas

### Front-end

- **React 19**
- **React Router DOM v7** – Navegação entre páginas
- **Tailwind CSS** – Estilização moderna e responsiva
- **React Number Format** – Máscaras para valores monetários
- **@react-google-maps/api** – Integração com Google Maps
- **jwt-decode** – Decodificação de tokens JWT
- **Hospedagem:** (Vercel)

### Back-end
- **Node.js + Express**
- **Banco de Dados:** (PostgreSQL, PrismaORM)
- **Hospedagem:** (Render)
- 🔗 Mais detalhes no repositório do back-end: [PromoDomo API](https://github.com/VtssBR/PromoApi)

### Estrutura do Projeto  

A estrutura do projeto segue um modelo **componentizado** e organizado em pastas para facilitar a manutenção e a escalabilidade:
```
/src
  /components      # Componentes reutilizáveis para a interface
  /contexts        # Gerenciamento de estados globais usando Context API
  /pages           # Páginas principais e layouts
  /routes          # Configuração de rotas da aplicação
  /services        # Chamadas e respostas dos endpoints da API
```

###  Exemplo de Configuração de Rotas  
As rotas são configuradas da seguinte maneira no arquivo de rotas:
```javascript
path: "/",
    element: <RootLayout />,
    children: [
        { index: true, element: <ListProducts /> },
        { path: "terms", element: <Terms/> },
        { path: "register", element: <RegisterUser /> },
        { path: "login", element: <LoginUser /> },
        { path: "products/:id", element: <ShowProduct /> },
        { path: "products/new", element: <CreateProduct /> },
        { path: "products/:id/update", element: <UpdateProduct /> }
    ]
```

---