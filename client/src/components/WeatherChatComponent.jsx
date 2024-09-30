// ChatBot Typeing
// // src/WeatherChatComponent.jsx
// import React, { useState, useRef, useEffect } from 'react';

// const WeatherChatComponent = ({ weatherData }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const chatRef = useRef(null);
//   const inputRef = useRef(null); // Ref for the input field
//   const [size, setSize] = useState({ width: 400, height: 300 });

//   const handleSendMessage = () => {
//     if (userInput.trim()) {
//       const userMessage = { text: userInput, type: 'user' };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput('');
//       setIsLoading(true);

//       const botResponse = generateBotResponse(userInput);
//       setTimeout(() => {
//         setMessages((prevMessages) => [...prevMessages, botResponse]);
//         setIsLoading(false);
//       }, 1000);
//     }
//   };

//   const generateBotResponse = (input) => {
//     const lowerInput = input.toLowerCase();
//     let response = '';

//     if (lowerInput.includes('temperature')) {
//       const temp = Math.round(weatherData.main.temp - 273.15);
//       response = { text: `The current temperature is ${temp}°C.`, type: 'bot' };
//     } else if (lowerInput.includes('condition')) {
//       response = { text: `The weather condition is ${weatherData.weather[0].description}.`, type: 'bot' };
//     } else if (lowerInput.includes('location')) {
//       response = { text: `You are in ${weatherData.name}.`, type: 'bot' };
//     } else if (lowerInput.includes('humidity')) {
//       response = { text: `The humidity level is ${weatherData.main.humidity}%.`, type: 'bot' };
//     } else if (lowerInput.includes('wind')) {
//       response = { text: `The wind speed is ${weatherData.wind.speed} m/s.`, type: 'bot' };
//     } else {
//       response = { text: "I'm sorry, I can only answer questions about the current weather.", type: 'bot' };
//     }

//     return response;
//   };

//   const handleClearChat = () => {
//     setMessages([]); // Clear all messages
//   };

//   const handleToggleChat = () => {
//     setIsVisible(!isVisible); // Toggle visibility
//   };

//   // Drag functionality
//   const handleDragStart = (e) => {
//     e.preventDefault();
//     const chatContainer = chatRef.current;
//     const startX = e.clientX;
//     const startY = e.clientY;
//     const startTop = chatContainer.getBoundingClientRect().top;
//     const startLeft = chatContainer.getBoundingClientRect().left;

//     const handleMouseMove = (e) => {
//       chatContainer.style.position = 'absolute';
//       chatContainer.style.top = `${startTop + (e.clientY - startY)}px`;
//       chatContainer.style.left = `${startLeft + (e.clientX - startX)}px`;
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       inputRef.current.focus(); // Refocus the input field after dragging
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // Resizing functionality
//   const handleResizeStart = (e) => {
//     e.preventDefault();
//     const startX = e.clientX;
//     const startY = e.clientY;
//     const startWidth = chatRef.current.offsetWidth;
//     const startHeight = chatRef.current.offsetHeight;

//     const handleMouseMove = (e) => {
//       const newWidth = Math.max(200, startWidth + (e.clientX - startX)); // Minimum width
//       const newHeight = Math.max(150, startHeight + (e.clientY - startY)); // Minimum height
//       setSize({ width: newWidth, height: newHeight });
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   useEffect(() => {
//     if (isVisible) {
//       inputRef.current.focus(); // Focus the input field when chat is visible
//     }
//   }, [isVisible]);

//   return (
//     isVisible && (
//       <div
//         ref={chatRef}
//         className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
//         style={{ width: size.width, height: size.height }}
//         onMouseDown={handleDragStart} // Allow dragging from anywhere in the component
//       >
//         <div className="flex justify-between items-center bg-blue-500 text-white p-3 cursor-default">
//           <h3 className="font-semibold">Weather Chat</h3>
//           <button className="text-white" onClick={handleToggleChat}>X</button>
//         </div>
//         <div className="p-3 overflow-y-auto flex-grow">
//           {messages.map((msg, index) => (
//             <div key={index} className={`my-2 p-2 rounded-lg ${msg.type === 'user' ? 'bg-green-100 self-end' : 'bg-blue-100 self-start'}`}>
//               {msg.text}
//             </div>
//           ))}
//           {isLoading && <div className="chat-bubble bot typing">...</div>}
//         </div>
//         <div className="flex p-3 border-t">
//           <input
//             ref={inputRef} // Attach the ref to the input field
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
//             placeholder="Ask me about the weather..."
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') handleSendMessage();
//             }}
//           />
//           <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600">Send</button>
//           <button onClick={handleClearChat} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600">Clear</button>
//         </div>
//         {/* Resizing handle */}
//         <div
//           className="bg-gray-400 w-3 h-3 cursor-se-resize absolute right-0 bottom-0"
//           onMouseDown={handleResizeStart} // Start resizing when the handle is clicked
//         />
//       </div>
//     )
//   );
// };

// export default WeatherChatComponent;


import React, { useState, useRef, useEffect } from 'react';

const WeatherChatComponent = ({ weatherData }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const chatRef = useRef(null);
  const messageEndRef = useRef(null);
  const [size, setSize] = useState({ width: 350, height: 400 });
  const [inputValue, setInputValue] = useState('');

  const predefinedQuestions = [
    'What is the temperature?',
    'What are the weather conditions?',
    'What is the humidity level?',
    'What is the wind speed?',
    'Where am I?',
  ];

  const handleSendMessage = (userInput) => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return; // Prevent sending empty messages

    const userMessage = { text: trimmedInput, type: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const botResponse = generateBotResponse(trimmedInput);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsLoading(false);
      speakResponse(botResponse.text);
    }, 1000);
  };

  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = '';

    if (lowerInput.includes('temperature')) {
      const temp = Math.round(weatherData.main.temp - 273.15);
      response = { text: `The current temperature is ${temp}°C.`, type: 'bot' };
    } else if (lowerInput.includes('condition')) {
      response = { text: `The weather condition is ${weatherData.weather[0].description}.`, type: 'bot' };
    } else if (lowerInput.includes('location') || lowerInput.includes('where am i')) {
      response = { text: `You are in ${weatherData.name}.`, type: 'bot' };
    } else if (lowerInput.includes('humidity')) {
      response = { text: `The humidity level is ${weatherData.main.humidity}%.`, type: 'bot' };
    } else if (lowerInput.includes('wind')) {
      response = { text: `The wind speed is ${weatherData.wind.speed} KM/H.`, type: 'bot' };
    } else {
      response = { text: "I'm sorry, I can only answer questions about the current weather.", type: 'bot' };
    }

    return response;
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleToggleChat = () => {
    setIsVisible(!isVisible);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const chatContainer = chatRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = chatContainer.getBoundingClientRect().top;
    const startLeft = chatContainer.getBoundingClientRect().left;

    const handleMouseMove = (e) => {
      chatContainer.style.position = 'absolute';
      chatContainer.style.top = `${startTop + (e.clientY - startY)}px`;
      chatContainer.style.left = `${startLeft + (e.clientX - startX)}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = chatRef.current.offsetWidth;
    const startHeight = chatRef.current.offsetHeight;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(250, startWidth + (e.clientX - startX));
      const newHeight = Math.max(200, startHeight + (e.clientY - startY));
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    isVisible && (
      <div
        ref={chatRef}
        className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
        style={{ width: size.width, height: size.height }}
        onMouseDown={handleDragStart}
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 cursor-default">
          <h3 className="font-semibold text-lg">Weather Chat</h3>
          <button className="text-white hover:text-red-300" onClick={handleToggleChat}>
            &times;
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto bg-gray-50 p-3" style={{ maxHeight: '300px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg max-w-xs ${
                msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="chat-bubble bot typing">...</div>}
          <div ref={messageEndRef} />
        </div>

        {/* Predefined Question Buttons */}
        <div className="p-3 flex flex-wrap gap-2 justify-center border-t bg-white">
          {predefinedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="bg-blue-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {question}
            </button>
          ))}
          <button
            onClick={handleClearChat}
            className="bg-red-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Clear
          </button>
        </div>

        {/* Resizing handle */}
        <div
          className="bg-gray-400 w-3 h-3 cursor-se-resize absolute right-0 bottom-0"
          onMouseDown={handleResizeStart}
        />
      </div>
    )
  );
};

export default WeatherChatComponent;
