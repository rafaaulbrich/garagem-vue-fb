<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link to="/acessorios">Acessórios</router-link> |
    <router-link to="/cores">Cores</router-link> |
    <router-link to="/marcas">Marcas</router-link> |
    <router-link to="/veiculos">Veículos</router-link>
  </header>
  <main>
    <RouterView />
  </main>
</template>

