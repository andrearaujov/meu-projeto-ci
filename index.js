const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Pipeline CI/CD funcionando, versão2.0!' });
});

// Iniciamos o servidor apenas se não estivermos em modo de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exportamos o 'app' para que nossos testes possam importá-lo
module.exports = app;