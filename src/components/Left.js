import { useState } from 'react';
import style from '../style/body.module.css';
const Left = ({ data, setData, setFormName }) => {
	const [input, setInput] = useState('');
	const [name, setName] = useState('');

	const convert = (e) => {
		e.preventDefault();

		const temp = JSON.parse(input);
		temp.sort((a, b) => a.sort - b.sort);
		setData(temp);
		setFormName(name);
		// console.log(data, temp, name);
	};

	return (
		<div className={style.leftCont}>
			<form action=''>
				<label htmlFor='uiName'>Enter Form Name</label>
				<br />
				<input
					onChange={(e) => setName(e.target.value)}
					type='text'
					name='uiName'
					id='uiName'
					placeholder='Form Name'
				/>
				<br style={{ marginBottom: '1rem' }} />
				<label htmlFor='inputJson'>Enter JSON format of the form below</label>
				<br />
				<textarea
					onChange={(e) => {
						setInput(e.target.value);
					}}
					name='inputJson'
					id='inputJson'
					rows='10'
					placeholder='{....}'
				></textarea>
				<button onClick={(e) => convert(e)}>Create Form</button>
			</form>
		</div>
	);
};

export default Left;
