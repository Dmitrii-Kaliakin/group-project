import "./styles.css";
import { Container, Grid } from "@mui/material";
import { postData } from "../../posts";
import { Post } from "../post";

export const PostList = () => {
  const getPostElements = () => {
    if (!postData?.length) {
      return [];
    }

    return postData.map((post, index) => {
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

  return (
    <Container
      className={"post-list__container"}
      maxWidth={"lg"}
      sx={{ display: "grid" }}
    >
      <Grid container spacing={2}>
        {getPostElements()}
      </Grid>
      ;
    </Container>
  );
};
