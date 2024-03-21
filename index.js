const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim().toLowerCase();
  // jika pesan = nothing
  if (message === "") {
    return;

    // jika pesan = developer
  } else if (message === "siapa developer anda") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage(
        "bot",
        "This Source Coded By Dfaalt \nLinkedIn : linkedin.com/in/ilham-maulana1101"
      );
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  }

    // Menambahkan kondisi untuk pertanyaan tentang Ilham atau Dfaalt
    else if (message.includes("ilham") || message.includes("dfaalt")) {
      userInput.value = "";
      appendMessage("user", message);
      setTimeout(() => {
        appendMessage("bot", "Ilham Maulana adalah Developer saya.");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }, 2000);
      return;
    }

  //   selain yang diatas
  appendMessage("user", message);
  userInput.value = "";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "85a3086852mshb1030407954386dp1ef7dajsnf5b21aab1373",
      "X-RapidAPI-Host": "chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com",
    },
    body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message}"}]}`,
  };

  fetch(
    "https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      appendMessage("bot", response.choices[0].message.content);
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        appendMessage("bot", "errror: Expired API Key!");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }
    });
}

function appendMessage(sender, message) {
  info.style.display = "none";
  buttonIcon.classList.remove("fa-solid", "fa-paper-plane");
  buttonIcon.classList.add("fas", "fa-spinner", "fa-pulse");

  const messsageElement = document.createElement("div");
  const iconElement = document.createElement("div");
  const chatElement = document.createElement("div");
  const icon = document.createElement("i");

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messsageElement.classList.add(sender);
  messsageElement.innerText = message;

  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconElement.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconElement.setAttribute("id", "bot-icon");
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messsageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}
