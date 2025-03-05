interface MessageObj {
  chat: {
    id: number;
  };
  text?: string;
}

export function handleMessage(messageObj: MessageObj) {
  const messageText = messageObj.text || "";

  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    switch (command) {
      case "start":
        return "Hi, I'm a bot, I can help you to get started.";
    }
  } else {
    return messageText;
  }
}
