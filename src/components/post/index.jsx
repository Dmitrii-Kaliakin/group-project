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
import ShareIcon from "@mui/icons-material/Share";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import "./styles.css";
import { ReactComponent as LikeIcon } from "../../images/save.svg";
import cn from "classnames";

const MAX_POST_TEXT_LENGTH = 100;

dayjs.locale("ru");
dayjs.extend(relativeTime);
export const Post = ({ post, onPostLike, currentUser, createPostTime }) => {

  const { name, author, title, text, tags, image, likes } = post || {};

  const avatar = <Avatar src={author?.avatar} alt={""} />;
  const actionIcon = <IconButton aria-label={"settings"}></IconButton>;
  const isLiked = post.likes?.some(i => i === currentUser?._id);

  function handleClickButtonLike() {
    onPostLike(post);
  }

  return (
    <Card sx={{ minWidth: 250, height: "100%" }}>
      <CardHeader
        avatar={avatar}
        action={actionIcon}
        title={author?.name}
        subheader={author?.about}
      />
      <CardMedia component={"img"} height={"194"} image={image} alt={"img"}/>
      <CardContent style={{ height: "100px" }}>
        <Typography variant={"body2"} color={"text.secondary"}>
          {title}<br/><br/>
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
        <Card>
          <button
            className={cn('card__favorite', { 'card__favorite_is-active': isLiked })}
            onClick={handleClickButtonLike}>
            <LikeIcon/>
            <span className={"likes-number"}>{likes?.length}</span>
          </button>
        </Card>
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
