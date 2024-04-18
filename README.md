# CoinCap Dashboard

O CoinCap Dashboard é uma aplicação web que oferece uma experiência completa para visualizar e acompanhar informações sobre criptomoedas. Esta aplicação utiliza a API CoinCap para obter dados em tempo real sobre diversas criptomoedas, permitindo aos usuários explorar detalhes como preço, valor de mercado, volume de negociação e mudanças nas últimas 24 horas.

## Demonstração

Você pode acessar uma demonstração ao vivo do JLMS Currency [aqui](https://listacripto-jlms.netlify.app/).


## Funcionalidades

- **Pesquisa de Criptomoedas**: Os usuários podem buscar criptomoedas por nome para encontrar informações específicas.
- **Visualização de Detalhes**: Cada criptomoeda exibe detalhes como preço atual, valor de mercado, volume de negociação e mudança percentual nas últimas 24 horas.
- **Lista Paginada**: As criptomoedas são exibidas em uma lista paginada, permitindo carregar mais resultados conforme necessário.
- **Responsividade**: O layout é responsivo, garantindo uma experiência de usuário consistente em diferentes dispositivos e tamanhos de tela.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **React Router**: Roteamento utilizado para navegar entre as páginas da aplicação.
- **CSS Modules**: Utilizado para estilizar componentes de forma modular e isolada.
- **CoinCap API**: Fonte de dados para informações sobre criptomoedas.

## Como Executar Localmente

Para executar o CoinCap Dashboard localmente em seu ambiente de desenvolvimento, siga estas etapas:

1. **Clone o Repositório**: 
    ```bash
    git clone https://github.com/seu-usuario/coincap-dashboard.git
    ```

2. **Instale as Dependências**:
    ```bash
    cd coincap-dashboard
    npm install
    ```

3. **Inicie o Servidor de Desenvolvimento**:
    ```bash
    npm start
    ```

4. **Acesse a Aplicação**: Abra seu navegador e vá para `http://localhost:3000`.

## Estrutura de Arquivos

A estrutura de arquivos do projeto é organizada da seguinte forma:

```
coincap-dashboard/
│
├── public/                 # Arquivos públicos (index.html, favicon)
│
├── src/                    # Código-fonte da aplicação
│   ├── components/         # Componentes React reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── styles/             # Arquivos de estilo (CSS, SCSS, etc.)
│   ├── utils/              # Funções utilitárias e helpers
│   └── App.js              # Componente principal da aplicação
│
├── README.md               # Este arquivo README
└── package.json            # Arquivo de configuração do npm
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias, correções de bugs ou novas funcionalidades. Para discussões e solicitações de recursos, abra uma issue para iniciar uma conversa.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).