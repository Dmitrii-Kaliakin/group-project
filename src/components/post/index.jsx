import cn from "classnames";
import "./styles.css";
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
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import { ReactComponent as LikeIcon } from "../../images/save.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { PostsContext } from '../../contexts/post-context';

const MAX_POST_TEXT_LENGTH = 100;

export const Post = ({ post }) => {

  const currentUser = useContext(UserContext);
  const { handlePostLike, handleDeletePost } = useContext(PostsContext);

  const { author, title, text, tags, image, likes, created_at } = post || {};

  const isPostMine = currentUser._id === post.author._id;

  const avatar = <Avatar src={author?.avatar} alt={""}/>;
  const actionIcon =
    <IconButton aria-label="settings">
      <MoreVertIcon/>
    </IconButton>;
  const isLiked = post.likes?.some(i => i === currentUser?._id);

  function handleClickButtonLike() {
    handlePostLike(post);
  }

  function deleteCard() {
    handleDeletePost(post);
  }

  return (
    <Card sx={{ minWidth: 250, height: "100%" }}>
      <CardHeader
        avatar={avatar}
        action={actionIcon}
        title={author?.name}
        subheader={`${author?.about} | ${dayjs(created_at).format("DD/MM/YYYY")}`}
      />
      <Link to={`/product/${post._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia component={"img"} height={"194"} image={image} alt={"img"}/>
        <CardContent style={{ height: "100px" }}>
          <Typography variant={"body2"} color={"text.secondary"}>
            {title}<br/><br/>
            {text?.length > MAX_POST_TEXT_LENGTH ? text.substring(0, MAX_POST_TEXT_LENGTH) + "..." : text}
          </Typography>
        </CardContent>
        <Stack sx={{ padding: "10px", height: "32px" }} direction="row" spacing={1}>
          {tags?.map((tag, index) => (
            <Chip
              key={`tag_${index}`}
              label={tag}
              color={"info"}
              variant="outlined"
            />
          ))}
        </Stack>
      </Link>
      <CardActions style={{ position: "relative", marginLeft: "7px" }} disableSpacing>
        <Card sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
        }}>
          <IconButton size={"small"}
                      className={cn("card__favorite", {
                        "card__favorite_is-active": isLiked,
                        "card__has-likes": likes?.length
                      })}
                      onClick={handleClickButtonLike}>
            <LikeIcon/>
            <span className={"likes-number"}>{likes?.length}</span>
          </IconButton>

          <IconButton size={"small"}
                      aria-label="share">
            <QuestionAnswerIcon/>
          </IconButton>

          {isPostMine &&
            <IconButton onClick={deleteCard}
                        size={"small"}
                        aria-label="share">
              <DeleteOutlineIcon sx={{ color: "#757579" }} aria-label="delete"/>
            </IconButton>
          }
        </Card>
      </CardActions>
    </Card>
  );
};
