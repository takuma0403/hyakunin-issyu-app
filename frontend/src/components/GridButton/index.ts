import axios from 'axios'

export const apiUrl = `http://localhost:8000`

let gameId: number | null = null

export async function startNewGame() {
  try {
    const requestUrl = `${apiUrl}/start`
    const response = await axios.post(requestUrl)
    gameId = response.data.instance_id
  } catch (error) {
    throw error
  }
  getNext()
}

export async function getNext() {
  try {
    const requestUrl = `${apiUrl}/next/${gameId}`
    const response = await axios.get(requestUrl)
    const nextPoemId = response.data.poem_id
    console.log(nextPoemId)
  } catch (error) {
    throw error
  }
}

export async function fetchMp3File(number: string): Promise<Blob> {
  try {
    const requestUrl = `${apiUrl}/audio/${number}`

    const response = await axios.get(requestUrl, {
      responseType: 'blob',
    })

    return response.data
  } catch (error) {
    console.error('Error fetching MP3 file:', error)
    throw error
  }
}
let audioInstance: HTMLAudioElement | null = null

export function setVolume(value: string): void {
  const volume = parseFloat(value) / 100
  if (audioInstance) {
    audioInstance.volume = volume
  }
}

export async function playAudioWithSlider(number: string): Promise<void> {
  try {
    if (audioInstance) {
      audioInstance.pause()
      audioInstance.currentTime = 0
      audioInstance = null
    }

    const audioBlob = await fetchMp3File(number)
    const audioUrl = URL.createObjectURL(audioBlob)

    audioInstance = new Audio(audioUrl)
    audioInstance.volume = 0.5
    await audioInstance.play()

    audioInstance.onended = () => {
      URL.revokeObjectURL(audioUrl)
      audioInstance = null
    }

    audioInstance.onerror = () => {
      URL.revokeObjectURL(audioUrl)
      audioInstance = null
    }
  } catch (error) {
    console.error('Error during audio playback:', error)
  }
}

export function stopAudio(): void {
  if (audioInstance) {
    audioInstance.pause()
    audioInstance.currentTime = 0
    audioInstance = null
  }
}
