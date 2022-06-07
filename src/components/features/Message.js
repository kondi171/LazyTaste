import { useEffect, useContext, useState } from "react";
import '../../assets/scss/common_styles/message.scss';
import { AppContext } from "../AppContext";
const Message = () => {
  const { messageContent, messageType, isModalOpen, setMessageContent, messageVisible, setMessageVisible } = useContext(AppContext);



  useEffect(() => {
    const message = document.querySelector('.message');
    if (!messageContent) {
      message.style.display = 'none';
      setMessageContent('');
      setMessageVisible(false);
    } else {
      message.style.display = 'block';
      if (messageType === 'error') {
        message.classList.remove('message--success');
        message.classList.add('message--error');
      }
      else if (messageType === 'success') {
        message.classList.add('message--success');
        message.classList.remove('message--error');
      }
      else {
        message.classList.remove('message--success');
        message.classList.remove('message--error');
      }
      if (!messageVisible) {
        message.style.display = 'none';
        message.classList.remove('message--success');
        message.classList.remove('message--error');
      }
    }
  }, [messageContent, messageType, isModalOpen, setMessageContent, messageVisible, setMessageVisible]);

  return (
    <div className="message">
      {messageType === 'info' && <i className="fa fa-info-circle" aria-hidden="true"></i>}
      {messageType === 'error' && <i className="fa fa-exclamation-circle" aria-hidden="true"></i>}
      {messageType === 'success' && <i className="fa fa-check-circle" aria-hidden="true"></i>}
      <span>{messageContent}</span>
    </div>
  );
}
export default Message;