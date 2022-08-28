// ==UserScript==
// @name         You bilibili
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/justforuse/chrome-extension-you-bilibili
// @version      0.2
// @description  Provide useful keyboard shortcuts for bilibili, for now is speed and subtitle control, like Youtube does.
// @author       Allen(https://github.com/justforuse)
// @include      http*://*bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// ==/UserScript==

;(function () {
  const videoContainer = document.querySelector('#playerWrap .bpx-player-container')
  let video
  let isReady = false

  function loadCSS() {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'https://raw.githack.com/justforuse/chrome-extension-you-bilibili/master/after.css'
    const head = document.querySelector('head')
    head.appendChild(link, null)
  }

  loadCSS()

  function showSpeedToast() {
    const toast = document.createElement('div')
    toast.classList.add('ybl-speed-toast')

    toast.innerText = video.playbackRate + 'x'
    videoContainer.appendChild(toast)

    setTimeout(() => {
      videoContainer.removeChild(toast)
    }, 500)
  }

  function addKeyboardListener() {
    video = document.querySelector('video')
    if (!video) {
      video = document.querySelector('bwp-video')
    }
    console.dir(video)
    video.addEventListener('playing', () => {
      if (isReady) {
        return
      }
      isReady = true
      const subtitleBtn = document.querySelector(
        '.bpx-player-ctrl-subtitle .bpx-common-svg-icon'
      )
      console.log(subtitleBtn)
      document.addEventListener('keypress', (e) => {
        console.log(e)
        if (e.keyCode === 99) {
          subtitleBtn.click()
        } else if (e.keyCode === 62 && e.shiftKey) {
          video.playbackRate += 0.25
          showSpeedToast()
        } else if (e.keyCode === 60 && e.shiftKey) {
          if (video.playbackRate < 0.5) {
            return
          }
          video.playbackRate -= 0.25
          showSpeedToast()
        } else if (e.keyCode === 63 && e.shiftKey) {
          video.playbackRate = 1
          showSpeedToast()
        }
      })
    })
    clearInterval(_interval)
  }

  let _interval = setInterval(function () {
    if (
      document.querySelector('.bili-comment') ||
      document.querySelector('.bb-comment')
    ) {
      addKeyboardListener()
    }
  }, 100)
})()
