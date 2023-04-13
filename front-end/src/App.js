import { useRef, useState } from 'react';
import Axios from 'axios';

// import { FaFly } from 'react-icons/fa';

import ChatComponent from './components/chat';
import MessageInput from './components/messageInput';

// import Drawn from './components/Drawn';
// import QuestionAnswer from './contents/QuestionAnswer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

function SendMessage(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const response = await Axios.post(API_URL + '/chat', data);
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
		changeInputHeight();
	};

	const changeInputHeight = (textareaHeight) => {
		const height = textareaHeight || textareaRef.current.scrollHeight;
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
		changeInputHeight(24);
	};

	let messageData = messages.map((message, index) => {
		return <ChatComponent {...message} key={index} />;
	});

	return (
		<div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
			<div ref={bodyRef} className="w-full min-h-screen dark:bg-gray-800">
				<ChatComponent
					humanChat={false}
					chatContent={'How are you? What can I help you? Please ask me.'}
				/>
				{messageData}
				{loading ? (
					<ChatComponent humanChat={false} chatContent={'Typing...'} />
				) : null}
			</div>
			<MessageInput
				messageBoxRef={messageBoxRef}
				textareaRef={textareaRef}
				onChangeMessage={onChangeMessage}
				onMessageKeyDown={onMessageKeyDown}
				chatting_data={chatting_data}
				sendMessageSubmit={sendMessageSubmit}
			/>
			{/* <Drawn direction="" bgClickable>
				<div className="h-full overflow-y-auto scrollbar-thumb-slate-500/50 scrollbar-track-slate-500/[0.16] scrollbar scrollbar-w-[8px] scrollbar-thumb-rounded scrollbar-track-rounded">
					<QuestionAnswer />
				</div>
			</Drawn> */}
		</div>
	);
}

export default App;
