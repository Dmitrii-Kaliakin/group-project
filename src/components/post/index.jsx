import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dayjs from "dayjs";
import "./styles.css";

const MAX_POST_TEXT_LENGTH = 130;

export const Post = ({ text, author, img, tags, createPostTime, likes }) => {
  const avatar = <Avatar src={author?.avatar} alt={""} />;
  const actionIcon = <IconButton aria-label={"settings"}></IconButton>;

  return (
    <Card sx={{ minWidth: 250, height: "100%" }}>
      <CardHeader
        avatar={avatar}
        action={actionIcon}
        title={author?.name}
        subheader={author?.about}
      />
      <CardMedia component={"img"} height={"194"} image={img} alt={"img"} />
      <CardContent style={{ height: "60px" }}>
        <Typography variant={"body2"} color={"text.secondary"}>
          {text?.length > MAX_POST_TEXT_LENGTH
            ? text.substring(0, MAX_POST_TEXT_LENGTH) + "..."
            : text}
        </Typography>
      </CardContent>
      <Stack
        sx={{ padding: "10px", height: "32px" }}
        direction="row"
        spacing={1}
      >
        {tags?.map((tag, index) => (
          <Chip
            key={`tag_${index}`}
            label={tag}
            color={"info"}
            variant="outlined"
          />
        ))}
      </Stack>
      <CardActions style={{ position: "relative" }} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <span className={"likes-number"}>{likes?.length}</span>
        <IconButton aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
        <IconButton aria-label="comments">
          <CommentIcon />
        </IconButton>
        <div style={{ position: "absolute", right: "20px" }}>
          <span
            style={{
              fontWeight: "700",
            }}
          >
            пост создан:
          </span>

          <span
            style={{
              marginLeft: "5px",
            }}
          >
            {dayjs(createPostTime).format("DD/MM/YYYY")}
          </span>
        </div>
      </CardActions>
    </Card>
  );
};
