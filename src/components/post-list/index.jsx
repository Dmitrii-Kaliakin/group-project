import "./styles.css";
import { Container, Grid } from "@mui/material";
import { Post } from "../post";
import { useContext, useMemo } from "react";
import { PostsContext } from "../../contexts/post-context";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const PostList = () => {
  const location = useLocation();

  const { posts } = useContext(PostsContext);

  const getPostElements = () => {
    if (!posts?.length) {
      return [];
    }

    return posts.map((post) => {
      return (
        <Grid item key={post._id} xs={12} md={6} lg={4}>
          <Post
            post={post}
            />
        </Grid>
      );
    });
  };

  const postElements = useMemo(() => getPostElements(), [posts]);

  return (
    <Container
      className={"post-list__container"}
      maxWidth={"lg"}
      sx={{ display: "grid" }}
    >
      <Grid container spacing={2}>
          {postElements}
      </Grid>
    </Container>
  );
};
