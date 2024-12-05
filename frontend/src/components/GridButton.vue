<template>
    <div class="grid-wrapper">
      <div class="grid-container">
        <button class="grid-item red" @click="handleClick('Red')"></button>
        <button class="grid-item blue" @click="handleClick('Blue')"></button>
        <button class="grid-item yellow" @click="handleClick('Yellow')"></button>
        <button class="grid-item green" @click="handleClick('Green')"></button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    setup() {
      const handleClick = (color: string) => {
        alert(`${color} button clicked!`);
      };
      return { handleClick };
    },
  };
  </script>
  
  <style scoped>
  /* 元のCSSをそのままコピー */
  .grid-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .grid-container {
    display: grid;
    grid-template-areas:
      "red red blue blue"
      "red red green green"
      "yellow yellow green green";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    aspect-ratio: 4 / 3;
    width: 100%;
    height: 100%;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
    background-color: black;
  }
  
  .grid-item {
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .red {
    grid-area: red;
    background-color: red;
  }
  
  .blue {
    grid-area: blue;
    background-color: cyan;
  }
  
  .yellow {
    grid-area: yellow;
    background-color: yellow;
  }
  
  .green {
    grid-area: green;
    background-color: limegreen;
  }
  </style>
  