  function appendMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'd-flex flex-row justify-content-' + (isUser ? 'end' : 'start') + ' mb-2';
    msgDiv.innerHTML = `
      <div class="p-2 ${isUser ? 'bg-body-tertiary' : 'bg-info text-white'} rounded" style="max-width: 80%;">
        <p class="mb-0 small">${text}</p>
      </div>
    `;
    document.getElementById('chat-messages').appendChild(msgDiv);
    scrollToBottom();
  }

  function appendImage(imgUrl) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'd-flex flex-row justify-content-start mb-2';
    msgDiv.innerHTML = `
      <div class="p-2 bg-info-subtle rounded">
        <img src="${imgUrl}" class="img-fluid rounded" style="max-width: 100%; height: auto;">
      </div>
    `;
    document.getElementById('chat-messages').appendChild(msgDiv);
    scrollToBottom();
  }

  function appendSuggestions(suggestions) {
    const wrap = document.createElement('div');
    wrap.className = 'd-flex flex-wrap gap-2 justify-content-start mb-2';
    wrap.innerHTML = `<div class="p-2"><strong>Did you mean:</strong></div>`;

    suggestions.forEach(suggestion => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-secondary btn-sm';
      btn.textContent = suggestion;
      btn.onclick = () => {
        document.getElementById('message').value = suggestion;
        sendMessage(); // auto-send
      };
      wrap.appendChild(btn);
    });

    document.getElementById('chat-messages').appendChild(wrap);
    scrollToBottom();
  }

  function scrollToBottom() {
    const chat = document.getElementById('chat-messages');
    chat.scrollTop = chat.scrollHeight;
  }

  function sendMessage() {
    const input = document.getElementById('message');
    const text = input.value.trim();
    if (text === '') return;

    appendMessage(text, true);
    input.value = '';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'd-flex flex-row justify-content-start mb-2 typing-placeholder';
    typingDiv.innerHTML = `
      <div class="p-2 bg-secondary-subtle rounded" style="max-width: 80%;">
        <p class="mb-0 small"><em>Typing...</em></p>
      </div>
    `;
    document.getElementById('chat-messages').appendChild(typingDiv);
    scrollToBottom();

    setTimeout(() => {
      fetch('chat_reply.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'message=' + encodeURIComponent(text)
      })
      .then(res => res.json())
      .then(data => {
        typingDiv.remove();

        if (data.text) {
          appendMessage(data.text, false);
        }

        if (data.image) {
          appendImage(data.image);
        }

        if (data.suggestions) {
          appendSuggestions(data.suggestions);
        }
      });
    }, 1500);
  }

  // Show chat when toggle button is clicked
  document.getElementById('chat-toggle').addEventListener('click', function () {
    document.getElementById('chatbot-container').style.display = 'block';
    this.style.display = 'none';
  });

  // Hide chat when close button inside chat is clicked
  function closeChat() {
    document.getElementById('chatbot-container').style.display = 'none';
    document.getElementById('chat-toggle').style.display = 'inline-block';
  }


