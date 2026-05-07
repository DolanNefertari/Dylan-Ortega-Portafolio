# 🌳 RMA Forest - Plataforma de Denuncias

Sistema completo de contacto y gestión de denuncias con canal anónimo, panel de administración y notificaciones por correo electrónico. Desarrollado con NestJS y Angular.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-17.x-red)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## ✨ Características

- 📝 **Canal de denuncias** con opción anónima
- ✉️ **Canal de contacto** correo o whatsapp
- 🔐 **Panel de administración** con autenticación JWT
- 📧 **Notificaciones por correo** (confirmación al denunciante + alerta interna | contacto de potenciales clientes)
- 🤖 **reCAPTCHA v3** para prevenir spam
- 📱 **Diseño responsive** con Angular Material
- 🗄️ **Base de datos SQLite** (sin configuración adicional)
- ✉️ **Email de prueba con Ethereal** (sin necesidad de SMTP real)

## 📋 Requisitos previos

- Node.js (v18 o superior) - [Descargar](https://nodejs.org/)
- npm (viene con Node.js)

## 🚀 Instalación rápida

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/rma-forest.git
cd rma-forest-web
npm install

# Configurar backend
cd rma-forest-back
cp .env.example .env
npm install

# Configurar frontend (en otra terminal)
cd ../rma-forest-front
cp src/environments/environment.example.ts src/environments/environment.ts
npm install
