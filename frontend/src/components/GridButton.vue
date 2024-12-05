<template>
    <div class="grid-wrapper">
      <div class="grid-container">
        <button class="grid-item button1" @click="handleClick('button1')"></button>
        <button class="grid-item button2" @click="handleClick('button2')"></button>
        <button class="grid-item button3" @click="handleClick('button3')"></button>
        <button class="grid-item button4" @click="handleClick('button4')"></button>
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
    width: 100vh;
    background-color: black;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .grid-container {
    display: grid;
    grid-template-areas:
      "button1 button1 button2 button2"
      "button1 button1 button4 button4"
      "button3 button3 button4 button4";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
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
    border-radius: 16px;
    cursor: pointer;
  }
  
  .button1 {
    grid-area: button1;
    background-color: #E4C087;
  }
  
  .button2 {
    grid-area: button2;
    background-color: #F6EFBD;
  }
  
  .button3 {
    grid-area: button3;
    background-color: #BC7C7C;
  }
  
  .button4 {
    grid-area: button4;
    background-color: #A2D2DF;
  }
  </style>
  