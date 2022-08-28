// this code will be executed after page load
;(function () {
  const videoContainer = document.querySelector('#playerWrap')
  let video
  let isReady = false

  function showSpeedToast() {
    const toast = document.createElement('div')
    toast.classList.add('ybl-speed-toast')

    console.log(video.playbackRate)

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
      console.log('playing...')
      console.log(video.playbackRate)
      const subtitleBtn = document.querySelector(
        '.bpx-player-ctrl-subtitle .bpx-common-svg-icon'
      )
      console.log(subtitleBtn)
      document.addEventListener('keypress', (e) => {
        console.log(e)
        if (e.keyCode === 67) {
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
