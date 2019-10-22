export default {
  apiUrl: 'https://invidious.snopyta.org/api/v1/',
  authUrl: 'http://localhost:1842/api/',
  // authUrl: 'https://auth.viewtube.eu/api/',
  ownApiUrl: 'http://localhost:1842/api/',
  // ownApiUrl: 'https://auth.viewtube.eu/api/',
  description: 'An alternative YouTube frontend using the invidio.us API.',
  language: 'en-US',
  cleanRedirectUrl: function (string) {
    let urlParams = new URLSearchParams(string.split('?')[1])
    return urlParams.get('q')
  },
  getTimestampFromSeconds: seconds => {
    let ms = seconds * 1000
    let date = new Date(ms)
    let timestampHours = toDoubleDigit(date.getHours() - 1)
    let timestampMinutes = toDoubleDigit(date.getMinutes())
    let timestampSeconds = toDoubleDigit(date.getSeconds())
    if (date.getHours() < 1) {
      return `${timestampHours}:${timestampMinutes}:${timestampSeconds}`
    } else {
      return `${timestampMinutes}:${timestampSeconds}`
    }

    function toDoubleDigit(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
  },
  getPageWidth: function () {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    )
  },

  getPageHeight: function () {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    )
  }
}
