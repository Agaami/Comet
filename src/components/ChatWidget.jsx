import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const { globalChat, sendChatMessage, getUserById } = useData();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [globalChat, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(user.id, input);
    setInput('');
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window glass-card">
          <div className="chat-header">
            <span>Global Team Chat</span>
            <button 
              className="secondary" 
              style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem', marginBottom:0}}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="chat-body">
            {globalChat.map((msg) => {
              const isMine = msg.userId === user.id;
              const sender = getUserById(msg.userId);
              return (
                <div key={msg.id} className={`chat-message ${isMine ? 'mine' : 'others'}`}>
                  {!isMine && <div style={{fontSize:'0.7rem', opacity:0.7, marginBottom:'2px'}}>{sender?.name || 'Unknown'}</div>}
                  {msg.message}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="chat-input-area">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '💬' : '💬'}
      </button>
    </div>
  );
}

export default ChatWidget;