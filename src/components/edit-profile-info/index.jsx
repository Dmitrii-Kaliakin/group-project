import { useForm } from 'react-hook-form';
import s from './styles.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { Form } from '../form-components/form';
import { FormInput } from '../form-components/input';
import { Avatar, Button } from '@mui/material';
import { FormFooter } from '../form-components/footer';

function EditProfileInfo({ onUpdateUser, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const currentUser = useContext(UserContext);
    const onCancel = () => {
        onClose();
    };

    const currentUserAvatar = <Avatar className={s.avatar_image} src={currentUser?.avatar} sx={{
        width: 200, height: 200,
    }} alt={""} />;

    const nameRegister = register('name', {
        required: {
            value: true,
            message: 'Обязательное поле'
        }
    })

    const emailRegister = register('email')

    const aboutRegister = register('about',
        {
            required: {
                value: true,
                message: 'Обязательное поле'
            }
        })


    return (

        <Form title="Профиль" handleFormSubmit={handleSubmit(onUpdateUser)}>

            <div>{currentUserAvatar}</div>

            <label htmlFor="name" className={s.label}>ФИО</label>
            <FormInput
                {...nameRegister}
                id="name"
                type="text"
                defaultValue={currentUser?.name}
            />
            {errors?.name && <p className={s.errorMessage}>{errors?.name?.message}</p>}

            <label htmlFor="email" className={s.label}>e-mail</label>
            <FormInput
                {...emailRegister}
                id="email"
                type="text"
                defaultValue={currentUser?.email}
                disabled
            />
            {errors?.email && <p className={s.errorMessage}>{errors?.email?.message}</p>}

            <label htmlFor="about" className={s.label}>about</label>
            <FormInput
                {...aboutRegister}
                id="about"
                type="text"
                defaultValue={currentUser?.about}
            />
            {errors?.about && <p className={s.errorMessage}>{errors?.about?.message}</p>}

            <FormFooter>
                <Button variant="outlined"
                    color="primary"
                    onClick={onCancel}>
                Отмена
                </Button>
                <Button type="submit" variant="contained" color="primary">Изменить</Button>
            </FormFooter>

        </Form>

    );
}

export default EditProfileInfo;