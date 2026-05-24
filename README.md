# 🐾 ProntPet

## 👨‍👩‍👧‍👦 Integrantes do Grupo

- **Guilherme Santos Fonseca** – RM: 564232  
- **Gustavo Araujo da Silva** – RM: 566526  
- **Anthony de Souza Henriques** – RM: 566188  
- **Nathan Gonçalves Pereira Mendes** - RM: 564666  

---

## 🔗 Repositório do Projeto
- GitHub: 
https://github.com/2TDSPX/challenge12-prontpet.git

---

## 🔗 Link para o Vídeo demonstrativo
- Youtube: 


---

## 📌 Visão Geral do Projeto

O **ProntPet** é um aplicativo mobile desenvolvido em React Native com foco no gerenciamento da saúde de pets.

A proposta do sistema é aproximar tutores e veterinários através de uma plataforma simples e organizada para acompanhamento veterinário.

O aplicativo permite:

* cadastro de tutores;
* cadastro de pets;
* visualização do histórico médico;
* acompanhamento de consultas;
* controle de vacinas;
* acesso rápido às informações clínicas;
* organização de atendimentos veterinários.

Além disso, o sistema possui dois fluxos principais:

### 👨‍⚕️ Veterinário

O veterinário possui acesso a uma dashboard contendo:

* próximas consultas;
* últimos atendimentos;
* lista de tutores;
* lista de pets vinculados aos tutores;
* informações clínicas dos animais.

### 🐶 Tutor

O tutor pode:

* cadastrar pets;
* visualizar informações do animal;
* acessar histórico médico;
* consultar vacinas;
* acompanhar tratamentos;
* verificar consultas futuras.

---

# 🚀 Tecnologias Utilizadas

## 📱 Front-end Mobile

* React Native
* Expo
* TypeScript
* React Navigation
* React Native Safe Area Context
* React Native Vector Icons
* AsyncStorage

## 🎨 Estilização

* StyleSheet API
* Flexbox
* SafeAreaView

---

# ⚙️ Funcionalidades

## 🔐 Autenticação

* Tela de autenticação
* Cadastro de tutor
* Login

## 🐾 Gerenciamento de Pets

* Cadastro de pets
* Informações básicas:

  * nome
  * espécie
  * raça
  * temperatura
  * sexo
  * peso
  * data de nascimento
  * idade
* armazenamento local utilizando AsyncStorage

## 🩺 Histórico Médico

* visualização de consultas futuras;
* visualização de consultas passadas;
* sintomas;
* diagnósticos;
* observações clínicas.

## 💉 Vacinação

* acompanhamento de vacinas;
* alertas de vacinas atrasadas;
* histórico vacinal.

## 👨‍⚕️ Dashboard Veterinária

* consultas agendadas;
* últimos atendimentos;
* acesso rápido para tutores e pets;
* visualização de prontuários.

## 📂 Navegação entre Telas

* navegação com React Navigation;
* envio de parâmetros entre telas;
* acesso dinâmico aos dados do pet e consultas.

---

# 🔄 Fluxo de Navegação

## 👤 Fluxo do Tutor

```text
AuthScreen
   ↓
TutorRegistration
   ↓
LoginScreen
   ↓
PetFormScreen
   ↓
MyPetsScreen
   ↓
TutorHomeScreen
   ↓
MedicalHistoryScreen
   ↓
AppointmentDetailsScreen
```

---

## 👨‍⚕️ Fluxo do Veterinário

```text
VetDashboardScreen
   ↓
TutorListScreen
   ↓
TutorPetsScreen
   ↓
TutorHomeScreen
   ↓
AppointmentDetailsScreen
```

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GDVnG_N-)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23919818&assignment_repo_type=AssignmentRepo)
