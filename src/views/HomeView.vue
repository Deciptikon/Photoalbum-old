<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <p>
      Это главная страница семейного фотоальбома... ну или почти фотоальбома. По сути это просто
      фотографии старых фотографий, здесь нет новых фотографий...
    </p>
    <router-link :to="{ name: 'photoalbum' }">Фотоальбом</router-link> |
    <router-link :to="{ name: 'about' }">О нас</router-link> |
    <router-link :to="{ name: 'contact' }">Контакты</router-link>
  </div>
</template>
