// limit double click
// document.documentElement.addEventListener(
//   'touchstart',
//   function (event) {
//     if (event.touches.length > 1) {
//       event.preventDefault()
//     }
//   },
//   false
// )

// let lastTouchEnd = 0
// document.documentElement.addEventListener(
//   'touchend',
//   function (event) {
//     const now = Date.now()
//     if (now - lastTouchEnd <= 300) {
//       event.preventDefault()
//     }
//     lastTouchEnd = now
//   },
//   false
// )

// document.addEventListener('gesturestart', function (event) {
//   event.preventDefault()
// })

let lastTouchEnd = 0
document.addEventListener(
  'touchstart',
  event => {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  },
  { passive: false }
)

document.addEventListener(
  'touchend',
  event => {
    const now = Date.now()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  { passive: false }
)

document.addEventListener(
  'gesturestart',
  event => {
    event.preventDefault()
  },
  { passive: false }
)
