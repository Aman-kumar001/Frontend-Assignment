import { useState } from 'react';
import style from '../style/body.module.css';
import Left from './Left';
import Right from './Right';
const Body = () => {
	const [data, setData] = useState([]);
	const [formName, setFormName] = useState('');

	return (
		<div className={style.container}>
			<Left data={data} setData={setData} setFormName={setFormName} />
			<Right
				data={data}
				setData={setData}
				setFormName={setFormName}
				formName={formName}
			/>
		</div>
	);
};

export default Body;
