import React, { useState } from 'react';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Drawn(props) {
	const { direction, bgClickable } = props;
	const [visible, setVisible] = useState(false);
	const VissibleToggle = () => {
		setVisible(!visible);
	};
	return (
		<div className="">
			<div
				className={cs(
					'fixed top-0 left-0 w-screen h-screen bg-[#00000066] transition-all duration-500 z-[1000]',
					{
						hidden: !visible,
					}
				)}
				onClick={bgClickable ? VissibleToggle : null}
			></div>
			<div
				className={cs(
					'h-full absolute max-w-[600px] w-[calc(100%-50px)] right-0 top-0 bg-white p-5 transition-all duration-500 z-[1001]',
					{ 'left-0': direction === 'left' },
					{
						'sm:left-[calc(-600px)] left-[calc(-100%+50px)]':
							!visible && direction === 'left',
					},
					{
						'sm:right-[calc(-600px)] right-[calc(-100%+50px)]':
							!visible && direction !== 'left',
					}
				)}
			>
				{props.children}
				<div
					className={cs(
						'absolute dark:bg-white bg-gray-800 w-[25px] h-[50px] top-[100px] flex items-center justify-center',
						{
							'right-[-25px] rounded-tr-[50px] rounded-br-[50px]':
								direction === 'left',
						},
						{
							'left-[-25px] rounded-tl-[50px] rounded-bl-[50px]':
								direction !== 'left',
						}
					)}
					onClick={VissibleToggle}
				>
					<FontAwesomeIcon
						icon={
							direction === 'left'
								? 'fa-solid fa-angle-right'
								: 'fa-solid fa-angle-left'
						}
						beat
						size="2xl"
						className={cs(
							'text-white dark:text-gray-800',
							{ 'ml-[-3px]': direction === 'left' },
							{ 'mr-[-3px]': direction !== 'left' }
						)}
					/>
				</div>
			</div>
		</div>
	);
}
