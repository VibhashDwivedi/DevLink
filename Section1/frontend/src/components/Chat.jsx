import React from 'react'
import '../css/createpost.css'
const Chat = () => {
  return (
    <div>
        
  <div
    id="chat-wrapper"
    className="chat-wrapper shadow border-top border-left border-right chat--visible"
  >
    <div className="chat-title-bar">
      Chat{" "}
      <span className="chat-title-bar-close">
        <i className="fas fa-times-circle" />
      </span>
    </div>
    <div id="chat" className="chat-log">
      <div className="chat-self">
        <div className="chat-message">
          <div className="chat-message-inner">Hello, How are you?</div>
        </div>
        <img
          className="chat-avatar avatar-tiny"
          src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
        />
      </div>
      <div className="chat-other">
        <a href="#">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
          />
        </a>
        <div className="chat-message">
          <div className="chat-message-inner">
            <a href="#">
              <strong>barksalot:</strong>
            </a>
            I am doing well. How about you?
          </div>
        </div>
      </div>
    </div>
    {/* task in class 2 
      previously this in inside the above div so the height is adjusted according to the chat-log class css
  */}
    <form id="chatForm" className="chat-form border-top">
      <input
        type="text"
        className="chat-field"
        id="chatField"
        placeholder="Type a message…"
        autoComplete="off"
      />
    </form>
  </div>


    </div>
  )
}

export default Chat