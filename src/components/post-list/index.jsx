import "./styles.css";
import { Container, Grid } from "@mui/material";
import { Post } from "../post";
import { useMemo } from "react";

export const PostList = ({ posts }) => {
  const getPostElements = () => {
    if (!posts?.length) {
      return [];
    }

    return posts.map((post) => {
      return (
        <Grid item key={post._id} xs={12} md={6} lg={4}>
          <Post
            text={post.text}
            author={post.author}
            img={post.image}
            tags={post.tags}
            createPostTime={post.created_at}
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
      ;
    </Container>
  );
};
