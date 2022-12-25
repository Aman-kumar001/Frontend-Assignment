import { NativeSelect } from '@mui/material';
import { useEffect, useState } from 'react';
import style from '../style/body.module.css';

const ItemRender = ({ data, showExtraFields, radioField, setRadioField }) => {
	const [list, setList] = useState([]);
	const [defaltListvalue, setDefaltListvalue] = useState('');

	const AddRadioField = (radio_label, value) => {
		var radio_id = radio_label.replace(' ', '.').toLowerCase();
		var temp = { ...radioField };
		temp[radio_id] = value;
		setRadioField(temp);
		console.log(radioField, temp, 'radio');
	};

	useEffect(() => {
		var temp = [];
		if (data.uiType === 'Select') {
			setDefaltListvalue(data?.options?.defaultValue);
			data?.validate?.options?.map((item) => {
				let listItem = {
					value: `${item.label}`,
					label: `${item.value}`,
				};
				temp.push(listItem);
			});
			// console.log(radioField, 'radio');
			setList(temp);
		}
		if (data.uiType == 'Radio') {
			{
				console.log(radioField);
				AddRadioField(data.label, data?.validate?.defaultValue);
			}
		}
	}, []);

	return (
		<div
			style={
				data.uiType == 'Group'
					? {
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
					  }
					: { width: '100%' }
			}
		>
			{data.uiType === 'Input' &&
				(data.validate.required || showExtraFields) && (
					<>
						<label htmlFor={data.jsonKey}>
							{data.label.replace('_', ' ')}
							<span style={{ color: '#f87d7c' }}>
								{data.validate?.required == true ? '*' : ''}
							</span>
						</label>
						<input
							style={{ padding: '0.2rem', fontSize: '1rem' }}
							type='text'
							name={data.jsonKey}
							id={data.jsonKey}
						/>
					</>
				)}
			{data.uiType === 'Select' &&
				(data.validate.required || showExtraFields) && (
					<div className={style.subBlock} style={{ width: '100%' }}>
						<label htmlFor={data.jsonKey}>
							{data.label.replace('_', ' ')}
							<span style={{ color: '#f87d7c' }}>
								{data.validate?.required == true ? '*' : ''}
							</span>
						</label>
						<div style={{ width: '60%' }}>
							<NativeSelect
								defaultValue={defaltListvalue}
								style={{
									backgroundColor: '#edf4fe',
									padding: '0 0.3rem',
									width: '100%',
								}}
							>
								{list.map((item) => {
									return (
										<option key={item.value} value={item.value}>
											{item.label.replace('_', ' ')}
										</option>
									);
								})}
							</NativeSelect>
						</div>
					</div>
				)}
			{data.uiType === 'Group' &&
				(data.validate.required || showExtraFields) && (
					<div style={{ display: 'block' }}>
						<p style={{ margin: 0 }}>
							{data.label.replace('_', ' ')}
							<span style={{ color: '#f87d7c' }}>
								{data.validate?.required == true ? '*' : ''}
							</span>
						</p>
						<hr
							style={{ border: '1px solid #80808060', marginBottom: '1rem' }}
						/>
					</div>
				)}
			{data.uiType === 'Group' &&
				data?.subParameters?.map((item) => {
					return (
						<div key={item.jsonKey} className={style.subBlock}>
							{/* {console.log(data, 'group')} */}
							<ItemRender
								data={item}
								radioField={radioField}
								setRadioField={setRadioField}
							/>
						</div>
					);
				})}
			{data.uiType === 'Switch' &&
				(data.validate.required || showExtraFields) && (
					<div className={style.switch}>
						<input type='checkbox' name={data.jsonKey} id={data.jsonKey} />
						<label htmlFor={data.jsonKey}>
							{data.label.replace('_', ' ')}
							<span style={{ color: '#f87d7c' }}>
								{data.validate?.required == true ? '*' : ''}
							</span>
						</label>
					</div>
				)}
			{data.uiType === 'Radio' &&
				(data.validate.required || showExtraFields) && (
					<div className={style.subBlock}>
						{data?.validate?.options?.map((item) => {
							return (
								<>
									<input
										type='radio'
										defaultChecked={
											data?.validate?.defaultValue == item.value ? true : false
										}
										name={data.jsonKey}
										onChange={(e) => {
											AddRadioField(data.label, item.value);
										}}
										id={`${item.value}`}
									/>
									<label
										className={style.radioLabel}
										style={{ flex: 1 }}
										htmlFor={`${item.value}`}
									>
										{item.label}
									</label>
								</>
							);
						})}
					</div>
				)}
			{data.uiType == 'Ignore' &&
				(data.validate.required || showExtraFields) &&
				radioField[data?.conditions[0].jsonKey] ==
					data?.conditions[0]?.value && (
					<div className={style.subBlock}>
						{console.log}
						{data?.subParameters?.map((item, index) => {
							return (
								<div>
									<ItemRender data={item} />
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
};

export default ItemRender;
