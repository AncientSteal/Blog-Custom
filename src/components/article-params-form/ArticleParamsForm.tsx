import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import { useState, FormEvent } from 'react';
import { Spacing } from '../spacing/Spacing';
import { ArticleStateType } from 'src/constants/articleProps';
import { fontColors, fontFamilyOptions, fontSizeOptions, OptionType, backgroundColors, contentWidthArr, defaultArticleState } from 'src/constants/articleProps'

export type ArticleParamsFormProps = { //создали тип для пропсов
	setAppState: (value: ArticleStateType) => void;
}
// функциональный компонент для парметров формы
export const ArticleParamsForm = (props: ArticleParamsFormProps) => {

    const { setAppState } = props; // Деструктуризация пропсов чтобы не писать props.setAppState
	const [isOpened, setIsOpened] = useState<boolean>(false); // Состояние кнопки боковой панели
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState); // Состояние формы, её полей

    // метод для смены значений полей формы
	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({...currentFormState, [fieldName]: value,
			}));
		};
	};

	// метод для сброса формы
	const resetChange = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState); // сбрасываем состояние формы
		setAppState(defaultArticleState); // сбрасываем состояние приложения
	}

	// применение изменений формы
	const submitChange = (event: FormEvent<HTMLFormElement>)  => {
		event.preventDefault();
		setAppState(formState); // обновим состояние приложения
	}

	return (
		<>
			<ArrowButton 
			isOpen={isOpened} 
			onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)} // при клике состояние кнопки меняется
			/>

			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form 
				// при отправке и сбросе вызваем соответствующие функции
				onSubmit={submitChange}
				onReset={resetChange}  

				// при изменениии в полях вызываем handleChange, добавили spacing между полями
				className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>Задайте параметры</Text>
					<Spacing size={50}/>

					<Select 
					title='Шрифт' 
					selected={formState.fontFamilyOption} 
					options={fontFamilyOptions} 
					onChange={handleChange('fontFamilyOption')}>
					</Select>
					<Spacing size={50}/>

					<RadioGroup
					title='Размер шрифта'
					options={fontSizeOptions}
					name='fontSizeOption'
					selected={formState.fontSizeOption}
					onChange={handleChange('fontSizeOption')}>
					</RadioGroup>
					<Spacing size={50}/>

					<Select
					title='Цвет шрифта'
					selected={formState.fontColor}
					options={fontColors}
					onChange={handleChange('fontColor')}>
					</Select>
					<Spacing size={50}/>

					<Separator></Separator>
					<Spacing size={50}/>

					<Select
					title='Цвет фона'
					selected={formState.backgroundColor}
					options={backgroundColors}
					onChange={handleChange('backgroundColor')}>
					</Select>
					<Spacing size={50}/>

					<Select
					title='Ширина контента'
					selected={formState.contentWidth}
					options={contentWidthArr}
					onChange={handleChange('contentWidth')}>
					</Select>
					<Spacing size={50}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
