import "./styles.css";
import { Container, Grid } from "@mui/material";
import { Post } from "../post";
import { useMemo } from "react";

export const PostList = ({ messages, onPostLike, 
  currentUser  }) => {

  const getPostElements = () => {
    if (!messages?.length) {
      return [];
    }

    return messages.map((item) => {
      return (
        <Grid  item key={item._id} xs={12} md={6} lg={4}>
          <Post
            post={item}
            {...item}
            onPostLike={onPostLike} 
            currentUser={currentUser}
          />
        </Grid>
      );
    });
  };

  const postElements = useMemo(() => getPostElements(), [messages]);

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

