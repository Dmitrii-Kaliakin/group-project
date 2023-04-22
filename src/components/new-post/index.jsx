import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { FormInput } from '../form-components/input';
import { Form } from '../form-components/form';
import { useState } from 'react';
import s from './styles.module.css';
import { useDebounce } from '../../hooks/decompouse';
import { FormFooter } from '../form-components/footer';

const NO_IMAGE = 'https://b-n-c.ru/local/templates/.default/img/no-img.jpg';

export const NewPost = ({ onSubmit, onClose }) => {

  const [img, setImg] = useState(NO_IMAGE);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const debouncedImg = useDebounce(img, 1000);

  const imgRegister = register('image', {
    onChange: (e) => {
      setImg(e.target.value || NO_IMAGE);
    }
  });
  const titleRegister = register('title', {
    required: {
      value: true,
      message: 'Обязательное поле'
    }
  });
  const tagsRegister = register('tags', {
    setValueAs: value => value.split(',').map(v => v.trim())
  });

  const onCancel = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      return;
    }

    onClose();
  };

  return <Form title="Создать пост" handleFormSubmit={handleSubmit(onSubmit)}>
    <img className={s.picture} src={debouncedImg} alt={''}/>
    <FormInput id="image" type="url" placeholder="URL картинки поста" {...imgRegister}/>
    {errors?.title && <p className="form__error-message">{errors?.title?.message}</p>}
    <FormInput id="title" type="text" placeholder="Заголовок поста" {...titleRegister}/>
    <FormInput typeTag="textarea" id="postText" placeholder="Текст поста" {...register('text')}/>
    <FormInput id="tags" placeholder="Введите теги через запятую" {...tagsRegister}/>
    <FormFooter>
      <Button variant="outlined"
              color="primary"
              onClick={onCancel}
              onKeyPress={(e) => e.preventDefault()}>Отмена</Button>
      <Button type="submit" variant="contained" color="primary">Создать</Button>
    </FormFooter>
  </Form>;
};