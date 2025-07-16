# Projeto Steam Simplificado 🎮

Este projeto é uma recriação simplificada da plataforma Steam, desenvolvida como projeto final da disciplina de Desenvolvimento Web. O objetivo é simular uma loja de jogos digitais, permitindo aos usuários navegar, visualizar detalhes de jogos, gerenciar uma lista de desejos, adicionar itens ao carrinho e simular compras. O sistema é dividido em um frontend construído com React e um backend robusto em Spring Boot, interagindo através de uma API RESTful.

## ✨ Funcionalidades Principais

* **Autenticação e Autorização de Usuários:** Sistema de cadastro e login de usuários, com suporte a diferentes perfis (administrador e cliente).
* **Catálogo de Jogos Abrangente:**
    * Listagem geral de jogos disponíveis.
    * Listagem paginada de jogos para melhor desempenho.
    * Visualização detalhada de cada jogo, incluindo informações como desenvolvedora, publicadora, classificação etária, idiomas, requisitos de sistema, compatibilidade, conquistas e galerias de imagens/vídeos.
* **Navegação por Categorias:** Explore jogos filtrados por diversas categorias.
* **Carrinho de Compras:** Adicione e gerencie jogos no carrinho, com cálculo do valor total.
* **Lista de Desejos (Wishlist):** Gerencie jogos que você deseja adquirir no futuro.
* **Páginas Informativas:** Seções sobre a plataforma e em desenvolvimento.

## 🛠️ Tecnologias Utilizadas

### Frontend (React)

O frontend é uma Single-Page Application (SPA) desenvolvida com:

* **React** (v19.1.0): Biblioteca JavaScript para construção de interfaces de usuário.
* **React Router** (v7.6.2): Para roteamento de páginas na aplicação.
* **Zustand** (v5.0.6): Gerenciamento de estado leve e escalável.
* **React Hook Form** (v7.60.0): Simplifica a criação de formulários e validações.
* **Axios** (v1.10.0): Cliente HTTP para realizar requisições à API do backend.
* **Vite** (v6.3.5): Ferramenta de build rápida para desenvolvimento frontend.
* **TypeScript** (~5.8.3): Superset de JavaScript que adiciona tipagem estática.
* **Bootstrap** (v5.3.7): Framework de CSS para design responsivo.
* **React Intersection Observer** (v9.16.0): Facilita o lazy loading e detecção de elementos na viewport.
* **Zod** (v4.0.5): Biblioteca de validação de esquemas de dados.

### Backend (Spring Boot)

O backend é uma API RESTful desenvolvida com:

* **Spring Boot** (v3.4.4): Framework para construção de aplicações Java robustas.
* **Spring Web:** Para criação de APIs RESTful.
* **Spring Data JPA:** Para interação com o banco de dados.
* **Lombok** (v1.18.38): Reduz boilerplate code em classes Java.
* **PostgreSQL** (Driver v42.7.3): Banco de dados relacional para persistência de dados.
* **Java 21:** Linguagem de programação utilizada.
* **Maven:** Ferramenta de automação de build para projetos Java.
* **Hibernate ORM** (v6.5.3.Final): Implementação de JPA.
* **Spring Security Crypto:** Para criptografia de senhas.
* **JJWT (Java JWT)** (v0.12.5): Biblioteca para trabalhar com JSON Web Tokens (JWT) para autenticação.

## 🚀 Como Rodar o Projeto

O projeto é dividido em duas partes independentes: `Backend` (API em Java) e `Frontend` (aplicação React).

### ✅ Pré-requisitos

* **Backend**
    * Java Development Kit (JDK) 21 ou superior
    * Apache Maven
    * Docker Desktop (para rodar o banco de dados PostgreSQL)
* **Frontend**
    * Node.js (recomendado: v22.14 ou superior)
    * npm (gerenciador de pacotes do Node.js)

### 🔧 Instruções de Execução

#### 1. Configurar e Iniciar o Banco de Dados (PostgreSQL com Docker)

Navegue até a pasta `Backend` e use o Docker Compose para iniciar o serviço de banco de dados:

```bash
cd Backend
docker-compose up -d postgres
````

O banco de dados será iniciado na porta padrão `5432`. As credenciais são configuradas no arquivo `Backend/src/main/resources/application.properties` e são:

  * **Database:** `desweb_09_11`
  * **Username:** `root`
  * **Password:** `password`

#### 2\. Iniciar o Backend (Spring Boot)

Após iniciar o banco de dados, na mesma pasta `Backend`:

```bash
mvn install # Instala as dependências do projeto
mvn spring-boot:run # Inicia o servidor Spring Boot
```

O backend será iniciado na porta `8080` (configurado em `application.properties`).

#### 3\. Iniciar o Frontend (React)

Abra um novo terminal e navegue até a pasta `Frontend`:

```bash
cd Frontend
npm install # Instala as dependências do frontend
npm run dev # Inicia o servidor de desenvolvimento do React
```

O frontend será iniciado em `http://localhost:5173` por padrão.

**Observação sobre a API URL:** O frontend está configurado para se comunicar com o backend em `http://localhost:8080` por padrão (definido em `Frontend/src/env/index.ts`). Se o seu backend estiver rodando em uma porta diferente, você precisará criar um arquivo `.env` na raiz da pasta `Frontend` com a seguinte linha:

```
VITE_API_URL=http://localhost:SUA_PORTA_DO_BACKEND
```

Substitua `SUA_PORTA_DO_BACKEND` pela porta correta.

### 🐛 Solução de Problemas Comuns

  * **`Address already in use`:** Se você vir esta mensagem ao iniciar o backend ou frontend, significa que a porta necessária já está em uso. Você pode:
      * Mudar a porta no `application.properties` (para o backend) ou `vite.config.ts` (para o frontend).
      * Encerrar o processo que está usando a porta.
  * **`Connection refused` (para o banco de dados):** Certifique-se de que o contêiner Docker do PostgreSQL está rodando corretamente (`docker-compose ps`).
  * **Erros de compilação do TypeScript no frontend:** Certifique-se de que todas as dependências foram instaladas (`npm install`).

## 🖼️ Screenshots
### Imagem da Home Page
<img width="1360" height="768" marginBottom="12px" alt="Captura de Tela (128)" src="https://github.com/user-attachments/assets/78e64028-be9f-4a94-b7f2-f7d74d35b8b2" />

### Imagem da página do jogo
<img width="1360" height="768" marginBottom="12px" alt="Captura de Tela (130)" src="https://github.com/user-attachments/assets/3327b8e7-a496-42f4-b389-a3fb3ae6268d" />

### Realizando compra
https://github.com/user-attachments/assets/a191b55f-e1de-4ad5-a695-70f87378ef89


### Exibindo categorias
https://github.com/user-attachments/assets/bfe98f20-7180-4568-91ac-4917d06cd03e



## 👥 Membros do Grupo

  * Ayrton Surica
  * Carlos Alberto

## 📄 Licença

Este projeto está licenciado sob a licença [MIT License](https://opensource.org/licenses/MIT).

-----
