# 🚀 Pipeline CI/CD com GitHub Actions e Render

Este repositório implementa uma **pipeline de CI/CD (Integração Contínua e Entrega Contínua)** utilizando **GitHub Actions** e **Render**.  
O projeto faz parte do **Desafio de Infraestrutura** e utiliza uma aplicação simples em **Node.js** com **testes automatizados**.

---

## ⚙️ Visão Geral do Fluxo CI/CD

A pipeline automatiza todo o ciclo de vida do código — desde o *push* até o deploy em produção.

### 🔁 Etapas do fluxo:

1. O desenvolvedor envia um `git push` para a branch `main`.
2. O **GitHub Actions** detecta o evento e inicia o workflow definido em `.github/workflows/ci.yml`.
3. **Etapa CI (Integração Contínua):**
   - O código é clonado.
   - O ambiente Node.js é configurado.
   - As dependências são instaladas (`npm install`).
   - Os testes são executados (`npm test`).
4. **Validação:**
   - ❌ Se os testes **falharem**, a pipeline é interrompida e o deploy não ocorre.
   - ✅ Se os testes **passarem**, a pipeline avança para o deploy.
5. **Etapa CD (Deploy Contínuo):**
   - O workflow aciona o **Deploy Hook** do **Render**, que busca o código atualizado e publica a nova versão da aplicação automaticamente.

---

## 🧩 Estrutura do Workflow

O arquivo principal da automação é:

📁 **`.github/workflows/ci.yml`**

Ele contém **dois jobs**:  
1️⃣ `build_and_test` (Integração Contínua)  
2️⃣ `deploy` (Entrega Contínua)

---

### 🔹 1. Job: `build_and_test` — Testar Aplicação

Este job garante a **qualidade do código** antes de qualquer publicação.

```yaml
jobs:
  build_and_test:
    name: Testar Aplicação
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Baixar o código
        uses: actions/checkout@v4

      - name: ⚙️ Configurar Node.js v18
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: 📦 Instalar dependências
        run: npm install

      - name: 🧪 Rodar testes
        run: npm test
```

#### 🧠 Explicação:
- **`actions/checkout@v4`** → Clona o repositório.
- **`actions/setup-node@v4`** → Configura o Node.js 18 com cache.
- **`npm install`** → Instala dependências do projeto.
- **`npm test`** → Executa os testes automatizados; se falhar, o job falha e o deploy é bloqueado.

---

### 🔹 2. Job: `deploy` — Fazer Deploy no Render

Este job realiza o **deploy automático** apenas se o `build_and_test` for bem-sucedido.

```yaml
  deploy:
    name: Fazer Deploy no Render
    runs-on: ubuntu-latest
    needs: build_and_test 
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: 🚀 Acionar Deploy Hook no Render
        run: curl "${{ secrets.RENDER_DEPLOY_HOOK }}"
```

#### 🧠 Explicação:
- **`needs: build_and_test`** → Cria a dependência entre os jobs.
- **`if: ...`** → Garante que o deploy só ocorra em *push* direto na `main`.
- **`curl`** → Faz a chamada para o **Deploy Hook secreto** do Render, que dispara o deploy na nuvem.

> 🔐 A URL do Deploy Hook é armazenada com segurança em  
> `Settings → Secrets and variables → Actions → RENDER_DEPLOY_HOOK`.

---

## 🛠️ Tecnologias e Ferramentas

| Categoria | Ferramenta | Função |
|------------|-------------|--------|
| 💻 Backend | **Node.js** | Execução da aplicação |
| 🧪 Testes | **Jest / Supertest** | Testes automatizados da API |
| ⚙️ Automação | **GitHub Actions** | CI/CD e execução dos workflows |
| ☁️ Deploy | **Render** | Hospedagem e deploy automático |
| 🔗 Deploy Hook | **Render Deploy Hook** | Integração entre Actions e Render |

---

## 📁 Estrutura Simplificada do Projeto

```
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   └── app.js
├── tests/
│   └── app.test.js
├── package.json
├── README.md
```

---

## ▶️ Como Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Entrar na pasta do projeto
cd seu-repo

# Instalar dependências
npm install

# Rodar testes
npm test

# Iniciar aplicação localmente
npm start
```

---

## ✅ Benefícios da Pipeline

- 🔄 Deploy 100% automatizado após testes bem-sucedidos.  
- 🧩 Separação clara entre **CI** e **CD**.  
- 🔐 Segurança com **secrets** do GitHub.  
- ⚡ Redução de erros humanos e maior agilidade.  

---

## 🧾 Licença

Este projeto está sob a licença **MIT** — sinta-se livre para usar e modificar.

---

## 🧑‍💻 Autor

**André Araújo**  
📘 Estudante de Sistemas de Informação (UFLA)  
💼 [LinkedIn](https://www.linkedin.com/in/andr%C3%A9-araujo-667547280/) | 🧠 [GitHub](https://github.com/andrearaujov)
