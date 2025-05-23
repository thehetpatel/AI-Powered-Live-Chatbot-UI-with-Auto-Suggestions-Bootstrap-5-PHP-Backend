<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Template Chat System</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Chat Toggle Button -->
<button id="chat-toggle" class="btn btn-success rounded-circle" 
        style="position: fixed; bottom: 20px; right: 20px; z-index: 999;">
  💬
</button>

<!-- Chatbot Section (Initially Hidden & Fixed to Bottom Right) -->
<section id="chatbot-container" class="chat-button">
  <div class="container py-0">
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <div class="card d-flex flex-column" id="chat1">
          <div class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
            <p class="mb-0 fw-bold">Live Chat | Company Name</p>
            <button onclick="closeChat()" class="btn btn-sm btn-light text-dark">x</button>
          </div>

          <div class="card-body d-flex flex-column" style="height: 400px; overflow-y: auto;" id="chat-messages"></div>

          <div class="card-footer bg-light">
            <div class="form-outline">
              <textarea class="form-control bg-body-tertiary" id="message" rows="2" placeholder="Type your message"></textarea>
              <button class="btn btn-primary mt-2 w-100" onclick="sendMessage()">Send</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>




<script src="script.js"></script>

</body>
</html>
