<template>
  <div color="white">残り枚数 {{ remainingNumber }}</div>
  <div class="grid-wrapper">
    <div class="grid-container">
      <button class="grid-item button1" @click="handleClick()">一時停止</button>
      <button class="grid-item button2" @click="toggleIcon">
        <div class="icon-container">
          <img
            :src="isSpeakerOn ? speakerOnIcon : speakerOffIcon"
            alt="Speaker Icon"
            class="icon"
            ref="speakerIcon"
          />
          <div class="slider-container">
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value="50"
              class="volume-slider"
              :style="{ background: sliderBackground }"
              @input="handleChangeVolume($event)"
              @mousedown="isDragging = true"
              @mouseup="isDragging = false"
              @mouseleave="isDragging = false"
              @click.stop
            />
            <div v-if="isDragging" class="tooltip" :style="{ left: tooltipPosition + 'px' }">
              {{ volume }}
            </div>
          </div>
        </div>
      </button>

      <button class="grid-item button3" @click="handleClickStartGame">読み上げを始める</button>
      <button class="grid-item button4" @click="handleClickNext">次の句</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import speakerOnIcon from '@/assets/speaker.svg'
import speakerOffIcon from '@/assets/speaker_off.svg'
import { playAudioWithSlider, setVolume, startNewGame, getNext } from '@/components/GridButton'

export default {
  setup() {
    const isSpeakerOn = ref(true)
    const isDragging = ref(false)
    const sliderHeight = ref('50px')
    const volume = ref(sliderHeight.value.replace('px', ''))
    const sliderBackground = ref('')
    const tooltipPosition = ref(0)
    const remainingNumber = ref(100)

    const toggleIcon = () => {
      isSpeakerOn.value = !isSpeakerOn.value
      setVolumeOrMute()
    }

    const handleClick = () => {
      handlePlayAudio()
    }

    async function handlePlayAudio() {
      try {
        await playAudioWithSlider()
      } catch (error) {
        console.error('Error during audio playback:', error)
      }
    }

    const handleChangeVolume = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target) {
        volume.value = String(target.value)
        updateSliderBackground(volume.value)

        // スライダー内での相対位置を計算
        const sliderWidth = target.offsetWidth
        const thumbPosition = sliderWidth * (Number(volume.value) / 100)
        tooltipPosition.value = thumbPosition
        setVolumeOrMute()
      }
    }

    const updateSliderBackground = (value: string) => {
      sliderBackground.value = `linear-gradient(to right, #a2d2df ${value}%, #ffffff ${value}%)`
    }

    const handleClickStartGame = () => {
      remainingNumber.value = 99
      startNewGame()
    }

    async function handleClickNext() {
      remainingNumber.value -= 1
      await getNext()
      await playAudioWithSlider()
    }

    const setVolumeOrMute = () => {
      if (isSpeakerOn.value) {
        setVolume(volume.value)
      } else {
        setVolume('0')
      }
    }

    onMounted(() => {
      const iconElement = document.querySelector('.icon') as HTMLElement
      updateSliderBackground(volume.value)
      if (iconElement) {
        sliderHeight.value = `${iconElement.offsetHeight * 2}px`
      }
    })

    return {
      handleClick,
      toggleIcon,
      handlePlayAudio,
      handleChangeVolume,
      handleClickStartGame,
      handleClickNext,
      isSpeakerOn,
      isDragging,
      volume,
      tooltipPosition,
      sliderBackground,
      speakerOnIcon,
      speakerOffIcon,
      sliderHeight,
      remainingNumber,
    }
  },
}
</script>

<style scoped>
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
    'button1 button1 button2 button2'
    'button1 button1 button4 button4'
    'button3 button3 button4 button4';
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.button1 {
  grid-area: button1;
  background-color: #e4c087;
}

.button2 {
  grid-area: button2;
  background-color: #f6efbd;
}

.button3 {
  grid-area: button3;
  background-color: #bc7c7c;
}

.button4 {
  grid-area: button4;
  background-color: #a2d2df;
}

.icon-container {
  display: flex;
  flex-direction: column; /* 子要素を縦に並べる */
  align-items: center;
  justify-content: center;
}

.icon {
  max-height: 40%; /* アイコンを40%に縮小 */
  width: auto;
  margin-bottom: 8px; /* スライダーとの間隔を調整 */
}

.volume-slider {
  appearance: none;
  width: 100px;
  height: 12px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 40px; /* スライダーの下に配置 */
  background-color: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
  pointer-events: none; /* マウスイベントを無効化 */
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background-color: #e4c087;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background-color: #e4c087;
  border-radius: 50%;
  cursor: pointer;
}

.icon {
  max-height: 60%;
  width: auto;
  margin-left: 16px;
}
</style>
