import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { FormInput } from "../form-components/input";
import { Form } from "../form-components/form";
import { useContext, useState } from "react";
import s from "./styles.module.css";
import { useDebounce } from "../../hooks/decompouse";
import { FormFooter } from "../form-components/footer";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../contexts/post-context";

export const EditPost = ({ onSubmit, onClose }) => {
  const { id } = useParams();

  const { posts } = useContext(PostsContext);
  const post = posts.find((post) => post._id === id);

  const [img, setImg] = useState(post.image);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const debouncedImg = useDebounce(img, 1000);

  const imgRegister = register("image", {
    onChange: (e) => {
      setImg(e.target.value || post.image);
    },
  });
  const titleRegister = register("title");
  const tagsRegister = register("tags", {
    setValueAs: (value) => value.split(",").map((v) => v.trim()),
  });

  register("id", {
    value: id,
  });

  const onCancel = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      return;
    }

    onClose();
  };

  return (
    <Form title="Редактировать пост" handleFormSubmit={handleSubmit(onSubmit)}>
      <img className={s.picture} src={debouncedImg} alt={""} />
      <FormInput
        id="image"
        type="url"
        defaultValue={post.image}
        {...imgRegister}
      />
      <FormInput
        id="title"
        type="text"
        defaultValue={post.title}
        {...titleRegister}
      />
      <FormInput
        typeTag="textarea"
        id="postText"
        defaultValue={post.text}
        {...register("text")}
      />
      <FormInput id="tags" defaultValue={post.tags} {...tagsRegister} />
      <FormFooter>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCancel}
          onKeyPress={(e) => e.preventDefault()}
        >
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Изменить
        </Button>
      </FormFooter>
    </Form>
  );
};
