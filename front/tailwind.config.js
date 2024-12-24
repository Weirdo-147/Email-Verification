/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'ARGODEON': "url('./components/img/ARGODEON.jpeg')",
        'download': "url('./components/img/download.jpeg')",
        'signupbg2': "url('./components/img/Times ago에 있는 Orca Dreamer님의 핀 _ 아름다운 월페이퍼, 귀여운 바탕화면 벽지, 미적 월페이퍼.jpeg')",
        'signupbg1': "url('./components/img/Pin by Trứng Ung on ✿ Ⓑⓔⓐⓤⓣⓘⓕⓤⓛ ✿ _ Scenery wallpaper, Anime scenery wallpaper, Anime scenery.jpeg')",
        'signupbg': "url('./components/img/download (12).jpeg')",
        'loginbg' : "url('./components/img/download15.jpeg')",
      },
      fontFamily: {
        custom: ['Dancing Script'],
        custom1:['Ephesis','Canveat'],
      },
      videoBackground: {
        'cherry-blossom': "url('./components/img/cherry blossom. [lofi jazzhop chill mix] (online-video-cutter.com).mp4')",
      },
      flex: {
        '3':'3 3 0%',
        '2': '2 2 0%',
        '1':'1 1 0%',
      },
      height: {
        'messages': 'calc(100vh - 6rem)', // Add this line
      },
    },
  },
  plugins: [
    
  ],
}

