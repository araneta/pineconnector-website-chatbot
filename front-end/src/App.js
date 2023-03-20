import { useRef, useState } from 'react';
import Axios from 'axios';

// import { FaFly } from 'react-icons/fa';

import ChatComponent from './components/chat';

import './assets/scss/app.scss';

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
	const messageBoxRef = useRef();
	const textareaRef = useRef();
	const bodyRef = useRef();

	const onChangeMessage = (e) => {
		const meassageValue = e.target.value;
		set_chatting_data(meassageValue);
		changeInputHeight(meassageValue);
	};

	const changeInputHeight = (meassageValue) => {
		// eslint-disable-next-line
		const lineCount = (meassageValue.match(new RegExp('\n', 'g')) || []).length;
		const height = 24 * (lineCount + 1);
		textareaRef.current.style.height = height + 'px';
		messageBoxRef.current.style.height = height + 16 + 'px';
		bodyRef.current.style.paddingBottom = height + 30 + 'px';
	};

	const onMessageKeyDown = (e) => {
		if (e.shiftKey === false && e.which === 13) {
			e.stopPropagation();
			e.preventDefault();
			if (e.target.value === '') return false;
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
		changeInputHeight('');
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
		<>
			<div
				ref={bodyRef}
				className="w-full min-h-screen bg-[#343541] scrollbar-thumb-slate-500/50 scrollbar-track-slate-500/[0.16] scrollbar scrollbar-w-[8px] scrollbar-thumb-rounded scrollbar-track-rounded"
			>
				<ChatComponent
					humanChat={false}
					chatContent={'How are you? What can I help you? Please ask me.'}
				/>
				{messageData}
				{loading ? (
					<ChatComponent humanChat={false} chatContent={'Typing...'} />
				) : null}
			</div>
			<div
				ref={messageBoxRef}
				className="fixed px-3 py-2 bottom-3 md:w-[700px] w-[calc(100%-6rem)] md:left-[calc(50%-350px)] left-[3rem] dark dark:bg-gray-700 rounded-lg h-[40px] max-h-[216px]"
			>
				<textarea
					ref={textareaRef}
					// className="flex items-center h-10 w-full rounded px-3 text-sm resize-none max:h-[300px] py-3 bg-transparent"
					className="max-h-[200px] m-0 w-full resize-none border-0 bg-transparent pr-6 focus:outline-0 focus:ring-0 focus-visible:ring-0 dark:bg-transparent text-white scrollbar-thumb-slate-500/50 scrollbar-track-slate-500/[0.16] scrollbar scrollbar-w-[8px] scrollbar-thumb-rounded scrollbar-track-rounded"
					style={{ height: '24px' }}
					placeholder="Type your message…"
					onChange={onChangeMessage}
					onKeyDownCapture={onMessageKeyDown}
					value={chatting_data}
				/>
				<button
					onClick={sendMessageSubmit}
					className="absolute flex items-center justify-center p-1 rounded-md text-gray-500 bottom-2 right-6 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
				>
					<span className="p-1">
						<svg
							className="w-[14px] transform rotate-45 mr-[-5px] mt-[-5px]"
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
		</>
	);
}

export default App;
