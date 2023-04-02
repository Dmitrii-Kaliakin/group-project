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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import "./styles.css";

const MAX_POST_TEXT_LENGTH = 130;

dayjs.locale("ru");
dayjs.extend(relativeTime);
export const Post = ({ text, author, img, tags, createPostTime, likes }) => {
  const avatar = <Avatar src={author?.avatar} alt={""}/>;
  const actionIcon = <IconButton aria-label={"settings"}></IconButton>;

  return (
    <Card sx={{ minWidth: 250, height: "100%" }}>
      <CardHeader
        avatar={avatar}
        action={actionIcon}
        title={author?.name}
        subheader={author?.about}
      />
      <CardMedia component={"img"} height={"194"} image={img} alt={"img"}/>
      <CardContent style={{ height: "60px" }}>
        <Typography variant={"body2"} color={"text.secondary"}>
          {text?.length > MAX_POST_TEXT_LENGTH ? text.substring(0, MAX_POST_TEXT_LENGTH) + "..." : text}
        </Typography>
      </CardContent>
      <Stack sx={{ padding: "10px" }} direction="row" spacing={1}>
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
          <FavoriteIcon/>
        </IconButton>
        <span className={"likes-number"}>{likes?.length}</span>
        <IconButton aria-label="share">
          <ShareIcon/>
        </IconButton>
        <div style={{ position: "absolute", right: "20px" }}>
          <span></span>
          пост создан:
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
