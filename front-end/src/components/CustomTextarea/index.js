import React from 'react';
import cs from 'classnames';

export default function CustomTextarea(props) {
	const {
		id,
		name,
		type,
		placeholder,
		label,
		textareaStyle,
		resize,
		className,
	} = props;

	return (
		<div className={className}>
			<label htmlFor={id} className="font-bold text-gray-700">
				{label || 'Custom Textarea'}
			</label>
			<textarea
				id={id}
				name={name || 'custom-textarea'}
				type={type || 'text'}
				required
				className={
					cs(
						'mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
						{ 'resize-none': !resize }
					) +
					' ' +
					textareaStyle
				}
				placeholder={placeholder || 'Custom Textarea'}
			/>
		</div>
	);
}
