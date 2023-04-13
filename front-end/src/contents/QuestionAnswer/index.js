import React, { useState } from 'react';
import Axios from 'axios';

import CustomInput from '../../components/CustomInput';
import CustomTextarea from '../../components/CustomTextarea';
import CustomButton from '../../components/Button';

const SaveSampleData = async (data) => {
	const url = process.env.REACT_APP_API_URL + '/savesampledata';
	const response = await Axios.post(url, data);
	alert(response.data);
};

export default function QuestionAnswer(props) {
	const [answer, setAnswer] = useState('');
	const [question, setQuestion] = useState('');

	const onSubmit = () => {
		SaveSampleData({
			question,
			answer,
		});
	};

	const onChangeQuestion = (e) => {
		setQuestion(e.target.value);
	};

	const onChangeAnswer = (e) => {
		setAnswer(e.target.value);
	};
	return (
		<div className="">
			<CustomInput
				label="Question"
				placeholder="Input question"
				onChange={onChangeQuestion}
				value={question}
			/>
			<CustomTextarea
				label="Answer"
				placeholder="Input answer"
				className="mt-2"
				textareaStyle="min-h-[200px] max-h-[200px] scrollbar-thumb-slate-500/50 scrollbar-track-slate-500/[0.16] scrollbar scrollbar-w-[8px] scrollbar-thumb-rounded scrollbar-track-rounded"
				onChange={onChangeAnswer}
				value={answer}
			/>
			<div className="flex justify-center">
				<CustomButton
					buttonStyle="mt-5 w-[50%] max-w-[150px]"
					onClick={onSubmit}
				>
					Submit
				</CustomButton>
			</div>
		</div>
	);
}
