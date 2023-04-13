import React from 'react';

export default function MessageInput(props) {
	const {
		messageBoxRef,
		textareaRef,
		onChangeMessage,
		onMessageKeyDown,
		chatting_data,
		sendMessageSubmit,
	} = props;
	return (
		<div className="fixed flex justify-center bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient py-2">
			<div
				ref={messageBoxRef}
				className="px-3 py-2 md:w-[700px] w-[calc(100%-6rem)] md:left-[calc(50%-350px)] left-[3rem] bg-gray-300 dark dark:bg-gray-700 rounded-lg min-h-[40px] max-h-[216px] h-[40px]"
			>
				<div className="relative">
					<textarea
						ref={textareaRef}
						// className="flex items-center h-10 w-full rounded px-3 text-sm resize-none max:h-[300px] py-3 bg-transparent"
						className="max-h-[200px] min-h-[24px] h-[24px] m-0 w-full resize-none border-0 bg-transparent pr-6 focus:outline-0 focus:ring-0 focus-visible:ring-0 dark:bg-transparent dark:text-white scrollbar-thumb-slate-500/50 scrollbar-track-slate-500/[0.16] scrollbar scrollbar-w-[8px] scrollbar-thumb-rounded scrollbar-track-rounded"
						placeholder="Type your message…"
						onChange={onChangeMessage}
						onKeyDownCapture={onMessageKeyDown}
						value={chatting_data}
					/>
					<button
						onClick={sendMessageSubmit}
						className="absolute flex items-center justify-center p-1 rounded-md text-gray-500 bottom-1 right-0 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
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
			</div>
		</div>
	);
}
