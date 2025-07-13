# ProjetoDevWeb

Projeto final da disciplina de Desenvolvimento Web com o professor Carlos Alberto.

Este projeto é uma recriação simplificada da plataforma Steam, desenvolvida com React no frontend e Spring Boot no backend. O sistema permite a simulação de uma loja de jogos digitais, onde os usuários podem navegar por jogos, visualizar detalhes, criar uma conta, fazer login, adicionar jogos ao carrinho ou à lista de desejos (wishlist), e realizar compras.

Cada jogo possui sua própria página dedicada com informações detalhadas, e é possível filtrar os jogos por categoria.

## 👥 Grupo

- Ayrton Surica
- Carlos Alberto

---

## ✨ Funcionalidades Implementadas

- Cadastro de usuários
- Login de usuários
- Listagem de jogos
  - Listagem geral
  - Listagem paginada
- Visualização de jogos por categoria
- Listagem de categorias (paginada e completa)
- Adição de jogos ao carrinho

---

## 🛠 Tecnologias utilizadas

### Frontend (React)

- React
- React Router
- Zustand (gerenciamento de estado)
- React Hook Form (formulários)
- Vite (empacotador)
- TypeScript

### Backend (Spring Boot)

- Spring Boot
- Spring Web
- Spring Data JPA
- Lombok
- Postgresql
- Java 21
- Maven

---

## 🎮 Como rodar o projeto

O projeto está dividido em duas pastas principais:


### ✅ Requisitos

- **Backend**
  - Java 21
  - Maven instalado

- **Frontend**
  - Node.js (recomendado: v22.14 ou superior)
  - npm

---

### 🔧 Instruções de execução

#### 📦 Backend (Spring Boot)

1. Acesse a pasta do backend:
   ```bash
   cd Backend
   
2. Instale as dependências:
   ```bash
   mvn install

3. Inicie o servidor:
   ```bash
   mvn spring-boot:run

#### Frontend (React)

1. Acesse a pasta do frontend:
   ```bash
   cd Frontend

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o frontend em modo de desenvolvimento:
   ```bash
   npm run dev

   
