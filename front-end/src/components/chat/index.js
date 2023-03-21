import BotIcon from '../../assets/image/bot.png';
import PersonIcon from '../../assets/image/person.png';

function ChatComponent(props) {
	const { humanChat, chatContent } = props;
	return (
		<>
			{humanChat ? (
				<div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
					<div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
						<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
							<img
								src={PersonIcon}
								alt="person"
								className="w-[80%] m-[10%]"
							></img>
						</div>
						<div>
							<div className="p-3 rounded-r-lg rounded-bl-lg">
								<div className="text-sm">
									{chatContent.split('\n').map((line, index) => {
										return <div key={index}>{line}</div>;
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
					<div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
						<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
							<img src={BotIcon} alt="bot"></img>
						</div>
						<div>
							<div className="p-3 rounded-r-lg rounded-bl-lg">
								<div
									className="text-sm"
									dangerouslySetInnerHTML={{ __html: chatContent }}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ChatComponent;
