import { Button } from '@mui/material';
import { useState } from 'react';
import style from '../style/body.module.css';
import ItemRender from './ItemRender';

const Right = ({ data, setData, setFormName, formName }) => {
	const [showExtraFields, setShowExtraFields] = useState(false);
	const [radioField, setRadioField] = useState({});
	return (
		<div className={style.rightCont}>
			<p className={style.rightHeading}>{formName}</p>
			<hr />
			<form action=''>
				{data.map((element, sort) => {
					return (
						<div
							className={
								element.validate.required || showExtraFields
									? style.rightBlock
									: ''
							}
							key={element.jsonKey}
						>
							{(element.validate.required || showExtraFields) && (
								<ItemRender
									data={element}
									showExtraFields={showExtraFields}
									radioField={radioField}
									setRadioField={setRadioField}
								/>
							)}
						</div>
					);
				})}

				{data.length > 0 && (
					<div className={style.buttons}>
						<div>
							<label htmlFor='extraField'>
								{showExtraFields ? 'Hide ' : 'Show '}Extra Fields
							</label>
							<input
								type='checkbox'
								name='extraField'
								id='extraField'
								onChange={(e) => {
									setShowExtraFields(e.target.checked);
								}}
							/>
						</div>
						<div>
							<Button variant='outlined'>Close</Button>
							<Button variant='contained'>Submit</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default Right;

// inside of box #fbfdff
// font #1d1f21
// selected #968ae4
// required red color #f87d7c
// selected option bc #e0ecfd
// border #f0f7ff
// inside of button #edf4fe
