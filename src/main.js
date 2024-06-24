const { invoke } = window.__TAURI__.core;
import { BaseDirectory, readFile, } from '@tauri-apps/plugin-fs';

async function play() {
  const contents = await readFile('test.mp3', { baseDir: BaseDirectory.Audio });
  console.debug('read file')
  const blob = new Blob([contents], { type: 'audio/mpeg' });
  console.debug('created blob')
  const url = URL.createObjectURL(blob);
  console.debug('created url')
  const audio = new Audio(url);
  console.debug('created audio')
  // Make the audio an element on the page(with the controls)
  document.body.appendChild(audio);
  document.querySelector("audio").controls = true;
  console.debug('appended audio')
  // Play the audio
  audio.play();
  const duration = document.getElementById("duration");
  duration.max = audio.duration;
  audio.addEventListener("timeupdate", () => {
    duration.value = audio.currentTime;
  });
}


  document.querySelector("button").addEventListener("click", play);
  