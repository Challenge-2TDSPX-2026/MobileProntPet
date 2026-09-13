# 🐾 ProntPet

## 👨‍👩‍👧‍👦 Integrantes do Grupo

* **Guilherme Santos Fonseca** – RM: 564232
* **Gustavo Araujo da Silva** – RM: 566526
* **Anthony de Souza Henriques** – RM: 566188

---

## 🔗 Repositório do Projeto

GitHub:

https://github.com/2TDSPX/challenge12-prontpet.git

---

## 🔗 Vídeo Demonstrativo

YouTube:

https://youtu.be/ke2h1pFvFmM

---

# 📌 Visão Geral do Projeto

O **ProntPet** é um aplicativo mobile desenvolvido em **React Native com Expo e TypeScript**, voltado para o gerenciamento da saúde e do acompanhamento veterinário de animais de estimação.

A aplicação tem como objetivo aproximar **tutores e veterinários**, permitindo o gerenciamento de pets, consultas e informações relacionadas ao atendimento veterinário de forma simples e organizada.

O aplicativo possui dois principais fluxos:

* 👤 **Tutor**
* 👨‍⚕️ **Veterinário**

O tutor consegue gerenciar seus pets, consultar informações de saúde, agendar consultas e acompanhar o histórico médico.

O veterinário possui uma dashboard própria para visualizar consultas, tutores, pets e informações dos atendimentos.

---

# 🎯 Objetivo

O ProntPet busca centralizar informações importantes relacionadas à saúde dos animais em uma aplicação mobile.

Através do aplicativo, o usuário pode:

* cadastrar e visualizar pets;
* consultar informações do animal;
* acompanhar consultas;
* realizar agendamentos;
* cancelar consultas futuras;
* visualizar histórico médico;
* consultar sintomas;
* visualizar diagnósticos;
* consultar observações veterinárias;
* acompanhar informações de vacinação;
* acessar informações de clínicas;
* permitir que veterinários acompanhem seus atendimentos.

---

# 🚀 Tecnologias Utilizadas

## 📱 Desenvolvimento Mobile

* React Native
* Expo
* TypeScript

## 🧭 Navegação

* React Navigation
* Native Stack Navigator
* Navegação através de parâmetros entre telas

## 🔄 Gerenciamento de Dados

* TanStack Query
* React Query
* Hooks personalizados
* Query Cache
* Invalidação de queries

## 💾 Armazenamento Local

* AsyncStorage

Utilizado principalmente para armazenamento do token de autenticação do usuário.

## 🎨 Interface

* React Native StyleSheet
* Flexbox
* SafeAreaView
* React Native Vector Icons
* Ionicons
* MaterialCommunityIcons

## 📅 Componentes Nativos

* `@react-native-community/datetimepicker`

Utilizado para seleção de:

* datas;
* horários;
* agendamento de consultas.

---

# ⚙️ Arquitetura da Aplicação Mobile

O aplicativo é organizado utilizando uma separação entre:

```text
Telas
  ↓
Hooks
  ↓
Services
  ↓
API REST
```

### Screens

Responsáveis pela interface e interação com o usuário.

### Hooks

Responsáveis pelo gerenciamento das requisições utilizando TanStack Query.

### Services

Responsáveis pela comunicação com os endpoints da API.

### API

Centraliza as requisições HTTP e o envio do token JWT.

---

# 🔐 Autenticação

O aplicativo possui autenticação para tutores e veterinários.

O fluxo de autenticação utiliza **JWT (JSON Web Token)**.

Após o login:

```text
Login
  ↓
API
  ↓
JWT
  ↓
AsyncStorage
```

O token é armazenado localmente utilizando `AsyncStorage`.

Nas requisições autenticadas, o aplicativo adiciona automaticamente:

```text
Authorization: Bearer <token>
```

Isso permite que a API identifique o usuário responsável pela requisição.

---

# 👤 Fluxo do Tutor

O tutor possui acesso às funcionalidades relacionadas aos seus próprios pets.

## 🐾 Gerenciamento de Pets

O tutor pode:

* cadastrar um pet;
* visualizar seus pets;
* acessar o perfil do pet;
* consultar informações do animal;
* visualizar idade;
* visualizar espécie;
* visualizar raça;
* visualizar sexo;
* visualizar peso;
* visualizar data de nascimento.

As informações são carregadas através da API.

A interface também utiliza a espécie do pet para definir um avatar:

```text
Cachorro → 🐶
Gato     → 🐱
Outros   → 🐾
```

---

# 🏠 Tela Inicial do Pet

A `TutorHomeScreen` apresenta as principais informações do pet selecionado.

A tela apresenta:

* avatar do animal;
* nome;
* raça;
* idade;
* peso atual;
* indicador de saúde;
* acesso para marcar consulta;
* acesso ao histórico médico.

Exemplo de navegação:

```text
MyPetsScreen
      ↓
TutorHomeScreen
      ↓
Pet selecionado
```

---

# 📅 Agendamento de Consultas

O tutor pode acessar a tela de agendamento através do perfil do pet.

```text
TutorHomeScreen
      ↓
AppointmentFormScreen
```

Para realizar o agendamento, o usuário seleciona:

* 🐾 Pet;
* 🏥 Clínica;
* 📅 Data;
* 🕐 Horário.

A tela também apresenta um resumo antes da confirmação.

Exemplo:

```text
Resumo

Pet: Thor
Clínica: Clínica ProntPet
Data: 15/09/2026
Horário: 14:30
```

O horário é selecionado utilizando o `DateTimePicker`.

A data enviada para a API segue o formato:

```text
YYYY-MM-DDTHH:mm:ss
```

Exemplo:

```text
2026-09-15T14:30:00
```

---

# 🏥 Clínicas

Durante o agendamento, o tutor consegue visualizar as clínicas disponíveis.

São apresentadas informações como:

* nome da clínica;
* endereço;
* horário de abertura;
* horário de fechamento.

Exemplo:

```text
Clínica ProntPet
Rua Exemplo, 100
08:00 às 18:00
```

---

# 🩺 Histórico Médico

Cada pet possui um histórico de consultas.

A tela:

```text
MedicalHistoryScreen
```

organiza as consultas em duas categorias.

### 📅 Próximas Consultas

Exibe consultas que ainda irão acontecer.

### 📋 Histórico de Consultas

Exibe consultas que já aconteceram.

A separação é feita utilizando a data atual.

As consultas são apresentadas com:

* data;
* horário;
* nome do pet;
* informações da consulta.

Exemplo:

```text
Consulta veterinária
15/09/2026 às 14:30 • Thor
```

---

# ❌ Cancelamento de Consultas

O tutor pode cancelar uma consulta futura.

Antes do cancelamento, o aplicativo solicita confirmação:

```text
Cancelar consulta

Tem certeza que deseja cancelar esta consulta?
```

Caso a operação seja confirmada, a aplicação envia a requisição para a API.

Após o cancelamento, o TanStack Query atualiza os dados da tela.

A aplicação também trata erros específicos.

### Consulta já realizada

```text
Essa consulta já aconteceu e não pode ser cancelada.
```

### Acesso negado

```text
Você não pode cancelar essa consulta.
```

---

# 📋 Detalhes da Consulta

Ao selecionar uma consulta no histórico, o usuário é direcionado para:

```text
AppointmentDetailsScreen
```

A tela apresenta:

* data;
* horário;
* sintomas;
* diagnóstico;
* observações.

A data é apresentada no formato brasileiro:

```text
15/09/2026 às 14:30
```

## Sintomas

Quando não existem sintomas registrados:

```text
Nenhum sintoma informado.
```

## Diagnóstico

Quando o veterinário ainda não registrou o diagnóstico:

```text
Aguarda o diagnóstico do Doutor.
```

## Observações

Quando ainda não existem observações:

```text
Aguarda as observações do Doutor.
```

# 👨‍⚕️ Fluxo do Veterinário

O aplicativo possui um fluxo específico para o veterinário.

O veterinário possui acesso a uma dashboard própria para gerenciamento dos atendimentos da clínica.

---

## 🔐 Login do Veterinário

O fluxo inicia através da tela:

```text
VetLogin
```

Após realizar o login:

```text
VetLogin
    ↓
Autenticação
    ↓
JWT
    ↓
VetDashboardScreen
```

O token é armazenado no `AsyncStorage` e utilizado nas requisições autenticadas.

---

# 🏥 Dashboard Veterinária

Após o login, o veterinário é direcionado para:

```text
VetDashboardScreen
```

A dashboard apresenta:

* nome da clínica;
* próximas consultas;
* consultas anteriores;
* acesso aos tutores;
* acesso aos pets;
* informações dos atendimentos;
* opção de sair da conta.

As consultas da clínica são carregadas através da API utilizando TanStack Query.

---

# 📅 Consultas da Clínica

A dashboard apresenta as consultas relacionadas à clínica do veterinário.

As consultas são organizadas entre:

```text
Próximas Consultas
        ↓
Consultas já realizadas
```

Cada consulta apresenta informações como:

* pet;
* data;
* horário;
* clínica.

O veterinário pode selecionar uma consulta para visualizar seus detalhes.


# 🩺 Informações do Pet

O veterinário pode acessar as informações do animal através do fluxo de tutores e pets.

```text
Tutor
  ↓
Pet
  ↓
Informações do Pet
  ↓
Consultas
```

Isso permite que o veterinário tenha acesso às informações necessárias para o acompanhamento do atendimento.

---

# 📋 Histórico de Atendimento

O veterinário pode consultar as consultas relacionadas ao pet.

O histórico apresenta:

* consultas futuras;
* consultas realizadas;
* data;
* horário;
* sintomas;
* diagnóstico;
* observações.

O veterinário pode selecionar uma consulta para acessar:

```text
AppointmentDetailsScreen
```

---

# 📝 Informações Clínicas

A tela de detalhes da consulta apresenta as informações clínicas registradas no atendimento.

Entre os dados estão:

* sintomas;
* diagnóstico;
* observações;
* data;
* horário.

Essas informações permitem acompanhar a evolução do atendimento veterinário.

---

# ✏️ Atualização da Consulta

O veterinário possui permissão para atualizar informações de uma consulta.

Os dados relacionados ao atendimento podem incluir:

* sintomas;
* diagnóstico;
* observações;
* peso atualizado.

A alteração é realizada através da API e atualizada no aplicativo.

---

# ❌ Cancelamento de Consultas pelo Veterinário

O veterinário também possui acesso ao cancelamento de consultas relacionadas à sua clínica, respeitando as regras de autorização da aplicação.

O aplicativo apresenta uma confirmação antes da operação.

Após o cancelamento, o TanStack Query atualiza a lista de consultas automaticamente.

---

# 🚪 Logout

Tanto o tutor quanto o veterinário possuem opção de sair da conta.

O processo realiza:

```text
Logout
  ↓
Remoção do token
  ↓
Limpeza do cache do TanStack Query
  ↓
Tela de Login
```

Isso impede que os dados da sessão anterior permaneçam disponíveis para outro usuário.

---

# 🔄 TanStack Query

O projeto utiliza **TanStack Query** para gerenciamento das requisições e dos dados recebidos da API.

Exemplo:

```tsx
useQuery({
  queryKey: ["appointments", petId],
  queryFn: () => getAppointmentsByPet(petId),
});
```

O sistema utiliza:

* `useQuery`;
* `useMutation`;
* `useQueryClient`;
* `invalidateQueries`.

Após uma alteração, como cancelar uma consulta:

```tsx
queryClient.invalidateQueries({
  queryKey: ["appointments", petId],
});
```

Dessa forma, a tela consegue buscar novamente os dados atualizados.

---

# 🔄 Comunicação com a API

A comunicação entre o aplicativo mobile e o back-end é realizada através de requisições HTTP.

A aplicação possui uma função centralizada:

```text
apiFetch()
```

Ela é responsável por:

* realizar requisições;
* adicionar headers;
* adicionar o JWT;
* interpretar respostas;
* tratar erros HTTP.

As requisições utilizam JSON.

Exemplo:

```text
Content-Type: application/json
```

---

# 🧭 Navegação entre Telas

A navegação utiliza **React Navigation**.

Os dados necessários são enviados entre as telas através de parâmetros.

Exemplo:

```tsx
navigation.navigate("MedicalHistoryScreen", {
  petId: pet.id,
});
```

Dessa maneira, cada tela consegue carregar os dados referentes ao pet selecionado.

```

# 📱 Principais Telas

## 👤 Tutor

* `AuthScreen`
* `TutorRegistration`
* `LoginScreen`
* `MyPetsScreen`
* `TutorHomeScreen`
* `PetFormScreen`
* `AppointmentFormScreen`
* `MedicalHistoryScreen`
* `AppointmentDetailsScreen`


## 👨‍⚕️ Veterinário

* `VetLogin`
* `VetRegistration`
* `VetDashboardScreen`
* `AppointmentDetailsScreen`

# ▶️ Como Executar o Aplicativo

## 1. Clonar o projeto

```bash
git clone https://github.com/2TDSPX/challenge12-prontpet.git
```

## 2. Entrar na pasta

```bash
cd challenge12-prontpet
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Iniciar o Expo

```bash
npx expo start
```

Após iniciar, o aplicativo pode ser executado através do:

* Android Emulator;
* dispositivo físico;
* Expo Go;
* Expo Web.

---

# 🎓 Projeto Acadêmico

Projeto desenvolvido para a **FIAP**, com foco no desenvolvimento de aplicações mobile utilizando **React Native, Expo, TypeScript, React Navigation, consumo de APIs REST, autenticação e gerenciamento de dados**.


