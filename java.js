const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Broadcast received messages to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const ws = new WebSocket('ws://localhost:8080'); // آدرس سرور WebSocket

// برقراری اتصال به WebSocket
ws.addEventListener('open', function open() {
  console.log('Connected to the WebSocket server');
});

// دریافت پیام‌های جدید
ws.addEventListener('message', function incoming(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message.data; // نمایش پیام در تگ div با کلاس message
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  const username = messageInput.getAttribute('data-username');

  if (message !== '' && username) {
    const fullMessage = username + ': ' + message;
    ws.send(fullMessage); // ارسال پیام به سرور WebSocket
    messageInput.value = '';
  }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// این بخش از کد مشابه قسمت اول اسکریپت شماست که نام کاربری را دریافت و به ویژگی data-username اضافه می‌کند
document.getElementById('username-button').addEventListener('click', function () {
  const usernameInput = document.getElementById('username-input');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  const username = usernameInput.value.trim();
  if (username !== '') {
    // Enable message input and send button
    messageInput.removeAttribute('disabled');
    sendButton.removeAttribute('disabled');

    // Hide username input and button
    usernameInput.style.display = 'none';
    this.style.display = 'none';

    // Save username in a data attribute
    messageInput.setAttribute('data-username', username);
    messageInput.focus();
  }
});


