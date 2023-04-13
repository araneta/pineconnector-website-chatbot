import React from 'react';

export default function CustomInput(props) {
	const { id, name, type, placeholder, label, value, onChange, className } =
		props;

	return (
		<div className={className}>
			<label htmlFor={id} className="font-bold text-gray-700">
				{label || 'Custom Input'}
			</label>
			<input
				id={id}
				name={name || 'custom-input'}
				type={type || 'text'}
				required
				className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder={placeholder || 'Custom Input'}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
