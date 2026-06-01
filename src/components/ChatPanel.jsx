/* eslint-disable no-loop-func */

import {
  useState,
  useRef,
  useEffect
} from "react";

import Message from "./Message";
import "./ChatPanel.css";

function ChatPanel() {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages]);

  const handleSend = async () => {

    if (
      !question.trim() ||
      loading
    ) {
      return;
    }

    try {

      setLoading(true);

setMessages(prev => [

  ...prev,

  {
    role: "user",
    text: question
  },

  {
    role: "assistant",
    text: "",
    sources: []
  }

]);

setQuestion("");

const response =
  await fetch(
     `${process.env.REACT_APP_API_URL}/compare-chat`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        question
      })
    }
  );

const reader =
  response.body.getReader();

const decoder =
  new TextDecoder();

  let assistantText = "";

while (true) {

  const {
    done,
    value
  } = await reader.read();

  if (done) {
    break;
  }

  const chunk =
    decoder.decode(value);

  const lines =
    chunk
      .split("\n")
      .filter(
        line =>
          line.startsWith(
            "data:"
          )
      );

  for (const line of lines) {

    const data =
      JSON.parse(
        line.replace(
          "data:",
          ""
        )
      );

   

    if (data.text) {

  for (const char of data.text) {

  assistantText += char;

  const currentText =
    assistantText;

  setMessages(
    prev => {

      const updated =
        [...prev];

      updated[
        updated.length - 1
      ] = {

        ...updated[
          updated.length - 1
        ],

        text:
          currentText

      };

      return updated;

    }
  );

  await new Promise(
    resolve =>
      setTimeout(
        resolve,
        10
      )
  );

}

}

    if (data.done) {

      setMessages(
        prev => {

          const updated =
            [...prev];

          updated[
            updated.length - 1
          ] = {

            ...updated[
              updated.length - 1
            ],

            sources:
              data.sources

          };

          return updated;

        }
      );

    }

  }

}

  

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="chat-panel">

      <h2 className="chat-title">
        RAG Chat
      </h2>

      <div className="messages">

        {
          messages.map(
            (msg, index) => (

              <Message
                key={index}
                msg={msg}
              />

            )
          )
        }

        {
          loading && (

            <div className="bot-message">
              🤖 Thinking...
            </div>

          )
        }

        <div
          ref={messagesEndRef}
        />

      </div>

      <div className="chat-input-row">

        <input
          className="video-input chat-input"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter" &&
              !loading
            ) {
              handleSend();
            }

          }}
        />

        <button
          className="analyze-btn"
          onClick={handleSend}
        >

          {
            loading
              ? "🤖 Thinking..."
              : "Send"
          }

        </button>

      </div>

    </div>

  );

}

export default ChatPanel;