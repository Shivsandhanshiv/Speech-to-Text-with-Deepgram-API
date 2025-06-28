const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');

startBtn.onclick = async () => {
  const tokenRes = await fetch('/token');
  const { token } = await tokenRes.json();

  const socket = new WebSocket(`wss://api.deepgram.com/v1/listen?punctuate=true`, ['token', token]);

  socket.onopen = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(250);

      mediaRecorder.ondataavailable = (e) => {
        if (socket.readyState === 1) {
          socket.send(e.data);
        }
      };
    });
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const transcript = data.channel?.alternatives[0]?.transcript || '';
    if (transcript) {
      output.value += transcript + ' ';
    }
  };
};
