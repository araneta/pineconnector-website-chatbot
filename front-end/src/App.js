import { useState } from 'react';
import Axios from 'axios';

// import { FaFly } from 'react-icons/fa';

import ChatComponent from './components/chat';
import BotIcon from './assets/image/bot.png';
// import LogoIcon from './assets/image/logo.png';
// import HelloIcon from './assets/image/hello.png';

import './App.css';

function SendMessage(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const response = await Axios.post(API_URL, data);
			resolve(response.data.answer);
		} catch (error) {
			reject(error);
		}
	});
}

function App() {
	const [chatting_data, set_chatting_data] = useState('');
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);

	const onChangeMessage = (e) => {
		set_chatting_data(e.target.value);
	};

	const onMessageKeyUp = (e) => {
		if (e.which === 13) {
			e.preventDefault();
			sendMessageSubmit();
		}
	};

	const sendMessageSubmit = () => {
		setLoading(true);

		let messageHistory = [
			...messages,
			{
				chatContent: chatting_data,
				humanChat: true,
			},
		];
		messageHistory = messageHistory.slice(-5);
		setMessages(messageHistory);

		SendMessage({
			chathistory: messageHistory,
		})
			.then((res) => {
				// receiveMessage(res);
				setMessages([
					...messageHistory,
					{
						chatContent: res,
						humanChat: false,
					},
				]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});

		set_chatting_data('');
	};

	let messageData = messages.map((message, index) => {
		return <ChatComponent {...message} key={index} />;
	});

	// const receiveMessage = (botMessage) => {
	// 	const messageHistory = [
	// 		...messages,
	// 		{
	// 			chatContent: botMessage,
	// 			humanChat: false,
	// 		},
	// 	];
	// 	console.log('messages', messages);
	// 	console.log('messageHistory', messageHistory);
	// 	setMessages(messageHistory);
	// };

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10 relative">
			<div className="md:flex md:flex-col flex-grow w-full md:max-w-[40%] bg-white shadow-xl rounded-lg overflow-hidden">
				{/* <div className="flex justify-center border-b-2 py-2">
					<img className="h-[50px]" src={LogoIcon} alt="logo"></img>
					<img className="h-[50px]" src={HelloIcon} alt="hello"></img>
				</div> */}
				<div className="flex flex-col flex-grow p-4 overflow-auto md:h-0 h-[calc(100vh-14rem)]">
					<ChatComponent
						humanChat={false}
						chatContent={
							<>
								{/* <div>
									<img src={HelloEmoticon} alt="hello"></img>
								</div> */}
								<span className="text-sm leading-none">
									How are you? What can I help you? Please ask me.
								</span>
							</>
						}
					/>
					{messageData}
					{loading ? (
						<div className="flex w-full mt-2 space-x-3 max-w-xs">
							<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
								<img src={BotIcon} alt="bot"></img>
							</div>
							<div>
								<span className="text-sm text-gray-500 leading-none">
									typing...
								</span>
							</div>
						</div>
					) : null}
				</div>
				<div className="bg-gray-300 p-4 flex">
					<input
						className="flex items-center h-10 w-full rounded px-3 text-sm"
						type="text"
						placeholder="Type your message…"
						onChange={onChangeMessage}
						onKeyUp={onMessageKeyUp}
						value={chatting_data}
					/>
					<button
						onClick={sendMessageSubmit}
						className="flex ml-1 h-10 items-center space-x-3 font-semibold bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 text-gray-100 rounded ring-2 ring-blue-200 px-6 py-2 hover:bg-white  hover:text-white hover:ring-slate-300"
					>
						<span className="text-white">send</span>
						<span>
							<svg
								className="w-4 h-4 transform rotate-45 -mt-px"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								></path>
							</svg>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
