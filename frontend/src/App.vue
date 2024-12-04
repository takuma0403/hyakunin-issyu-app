<template>
  <div>
    <h1>百人一首ランダム読み上げ</h1>
    <div v-if="poemText">{{ poemText }}</div>
    <button @click="startReading" v-if="!instanceId">開始</button>
    <button @click="getNextPoem" v-else>次へ</button>
    <audio ref="audioPlayer" :src="audioUrl" controls v-if="audioUrl"></audio>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const instanceId = ref<number | null>(null);
    const poemText = ref<string | null>(null);
    const audioUrl = ref<string | null>(null);
    const audioPlayer = ref<HTMLAudioElement | null>(null);

    const startReading = async () => {
      try {
        const response = await axios.post('/start');
        instanceId.value = response.data.instance_id;
      } catch (error) {
        console.error('Failed to start reading:', error);
      }
    };

    const getNextPoem = async () => {
      if (!instanceId.value) return;

      try {
        const response = await axios.get(`/next/${instanceId.value}`);
        if (response.data.message) {
          alert(response.data.message); // "No more poems"
          return;
        }
        poemText.value = response.data.poem_text;
        audioUrl.value = response.data.audio_url;

        // 自動再生
        if (audioPlayer.value) {
          audioPlayer.value.load();
          audioPlayer.value.play();
        }
      } catch (error) {
        console.error('Failed to get next poem:', error);
      }
    };

    return {
      instanceId,
      poemText,
      audioUrl,
      audioPlayer,
      startReading,
      getNextPoem,
    };
  },
};
</script>

<style>
h1 {
  text-align: center;
}
button {
  margin: 10px;
}
audio {
  display: block;
  margin: 20px auto;
}
</style>
