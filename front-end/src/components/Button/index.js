import React from 'react';

import cs from 'classnames';

export default function CustomButton(props) {
	const { children, buttonStyle, onClick } = props;
	return (
		<button
			onClick={onClick}
			type="button"
			className={
				cs(
					'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
				) +
				' ' +
				buttonStyle
			}
		>
			{children || 'default'}
		</button>
	);
}
