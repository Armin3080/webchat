function sendMessage(message) {
  socket.send(message);
}
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

  function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    const username = messageInput.getAttribute('data-username');

    if (message !== '' && username) {
      const chatMessages = document.querySelector('.chat-messages');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.textContent = username + ': ' + message; // Show username with message
      chatMessages.appendChild(messageElement);
      messageInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  document.getElementById('send-button').addEventListener('click', sendMessage);
  document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

