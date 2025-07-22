<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <p>Набор фотографий из одного потерянного фотоальбома...</p>
    <router-link :to="{ name: 'photoalbum' }">Фотоальбом</router-link> |
    <router-link :to="{ name: 'about' }">О чём это?</router-link> |
    <router-link :to="{ name: 'contact' }">Контакты</router-link>
  </div>
</template>
