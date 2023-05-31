import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { FormInput } from '../form-components/input';
import { Form } from '../form-components/form';
import { useContext, useState } from 'react';
import s from './styles.module.css';
import { useDebounce } from '../../hooks/decompouse';
import { FormFooter } from '../form-components/footer';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../../contexts/post-context';

export const EditPost = ({ onSubmit, onClose }) => {

  const { id } = useParams();

  const {posts} = useContext(PostsContext);
  const post = posts.find(post => post._id === id);

  const [img, setImg] = useState(post.image);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const debouncedImg = useDebounce(img, 1000);

  const imgRegister = register('image', {
    onChange: (e) => {
      setImg(e.target.value || post.image);
    },
    required: {
      value: true,
      message: 'Обязательное поле'
    }
  });

  const titleRegister = register('title', {
    required: {
      value: true,
      message: 'Обязательное поле'
    }
  });
  
  const textRegister = register('text', {
    required: {
      value: true,
      message: 'Обязательное поле'
    }
  });

  const tagsRegister = register('tags', {
    setValueAs: value => value.split(',').map(v => v.trim())
  });
  register('id', {
    value: id
  });

  const onCancel = (e) => {
    onClose();
  };

  return <Form title="Редактировать пост" handleFormSubmit={handleSubmit(onSubmit)}>
    <img className={s.picture} src={debouncedImg} alt={''}/>
    <FormInput id="image" type="url" defaultValue={post.image} {...imgRegister}/>
    {errors?.image && <p className={s.form__error__message}>{errors?.image?.message}</p>}
    <FormInput id="title" type="text" defaultValue={post.title} {...titleRegister}/>
    {errors?.title && <p className={s.form__error__message}>{errors?.title?.message}</p>}
    <FormInput typeTag="textarea" id="postText" defaultValue={post.text} {...textRegister}/>
    {errors?.text && <p className={s.form__error__message}>{errors?.text?.message}</p>}
    <FormInput id="tags" defaultValue={post.tags} {...tagsRegister}/>
    <FormFooter>
      <Button variant="outlined"
              color="primary"
              onClick={onCancel}>
      Отмена
      </Button>
      <Button type="submit" variant="contained" color="primary">Изменить</Button>
    </FormFooter>
  </Form>;
};