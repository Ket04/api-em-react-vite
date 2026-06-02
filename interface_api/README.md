# InvenTech – Frontend SPA de Gerenciamento de Inventário

Interface React para consumo da API REST do professor, desenvolvida com **React + Vite + Tailwind CSS**.

## ✅ Funcionalidades implementadas

- **Login** com validação visual e mensagem de erro em caso de falha
- **Dashboard** com listagem responsiva de produtos (cards)
- **Filtro** por categoria e busca por nome
- **Cadastro** de produtos com `<select>` carregado em tempo real da API
- **Exclusão** de produtos com modal de confirmação (integração com `DELETE`)
- **Stats** de totais no topo do painel
- **Token JWT** armazenado no `localStorage` e enviado em todo request
- Redirecionamento automático para login em caso de 401

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- API Spring Boot rodando em `http://localhost:8081`

### Instalação

```bash
npm install
```

### Configuração (opcional)

Crie um arquivo `.env` na raiz do projeto se a API estiver em outra porta:

```env
VITE_API_URL=http://localhost:8081
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
npm run build
npm run preview
```

---

## 🔧 CORS – Configuração no Backend (Spring Boot)

Adicione esta classe no projeto Spring Boot para liberar o acesso do frontend:

```java
package br.com.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

---

## 📁 Estrutura do projeto

```
src/
├── api/
│   └── axios.js          # Instância axios com interceptors JWT
├── components/
│   ├── Navbar.jsx         # Barra de navegação com logout
│   ├── ProductCard.jsx    # Card de produto individual
│   ├── ProductForm.jsx    # Formulário de cadastro
│   └── ProtectedRoute.jsx # Rota protegida por autenticação
├── context/
│   └── AuthContext.jsx    # Contexto global de autenticação
├── pages/
│   ├── Login.jsx          # Tela de login
│   └── Dashboard.jsx      # Painel principal
└── main.jsx
```

## 🔐 Credenciais de teste

```
E-mail: admin@fatec.sp.gov.br
Senha:  admin123
```
