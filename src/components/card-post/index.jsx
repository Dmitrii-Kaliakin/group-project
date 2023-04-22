import cn from "classnames";
import "./styles.module.css";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ReactComponent as LikeIcon } from "../../images/save.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { PostsContext } from '../../contexts/post-context';

export function CardPost({ post, handlePagePostLike }) {

  const location = useLocation();

  const currentUser = useContext(UserContext);
  const { handleDeletePost, handleEditPost } = useContext(PostsContext);

  const navigate = useNavigate();
  const { author, title, text, tags, image, likes = [], created_at } = post || {};
  const isPostMine = currentUser?._id === post?.author._id;
  const isLiked = post?.likes?.some(i => i === currentUser?._id);
  const avatar = <Avatar src={author?.avatar} alt={""}/>;
  const actionIcon = <IconButton aria-label="settings"><MoreVertIcon/></IconButton>;

  function handlePostLike() {
    handlePagePostLike(post);
  }

  function deletePost() {
    handleDeletePost(post);
    navigate(-1);
  }
 

  return (
    <Container sx={{ padding: '20px', margin: '0, auto' }} maxWidth="md">
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ height: 'auto' }}>
          <Link to={`/`} className="buttonBack">
            <Button href="" variant='contained'>Назад</Button>
          </Link>
        </Stack>
        <Stack
          sx={{ height: 'auto', padding: '0px', backgroundColor: 'white' }}
          direction={{ md: 'row', sm: 'row' }}
        >
          <CardContent sx={{ padding: '0', width: 'auto' }}>
            <CardMedia
              height={'300px'}
              component="img"
              image={image}
              alt="картинка поста"
            />

          </CardContent>
          <CardContent sx={{ padding: '0', backgroundColor: 'white', width: 'fit-content' }}>
            <CardHeader
              sx={{padding: "16px 16px 0px 16px"}}
              avatar={avatar}
              action={actionIcon}
              title={author?.name}
              subheader={`${author?.about} | ${dayjs(created_at).format("DD/MM/YYYY")}`}
            />
            <CardContent style={{}}>
              <Typography style={{}} variant={"body2"} color={"text.secondary"}>

                {title}<br/><br/>
                {text}
              </Typography>
            </CardContent>
            <Stack sx={{ padding: "0px 16px", height: "32px" }} direction="row" spacing={1}>
              {tags?.map((tag, index) => (
                <Chip
                  key={`tag_${index}`}
                  label={tag}
                  color={"info"}
                  variant="outlined"
                />
              ))}
            </Stack>
            <CardActions sx={{padding: "16px 16px 0px 16px"}} disableSpacing>
              <Card sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "none",
              }}>
                <IconButton size={"small"}
                            className={cn("card__favorite",
                              {
                                "card__favorite_is-active": isLiked,
                                "card__has-likes": likes?.length
                              }
                            )
                            }
                            onClick={handlePostLike}>
                  <LikeIcon/>
                  <span className={"likes-number"}>{likes?.length}</span>
                </IconButton>

                <IconButton size={"small"}
                            aria-label="share">
                  <QuestionAnswerIcon/>
                </IconButton>

                {isPostMine &&
                  <>
                  <IconButton
                    onClick={deletePost}
                    size={"small"}
                    aria-label="share">
                    <DeleteOutlineIcon sx={{ color: "#757579" }} aria-label="delete"/>
                  </IconButton>

                  <Link to={`/post/edit/${post._id}`} replace state={{ backgroundLocation: location, initialPath: location.pathname, post: post }}>
                    <IconButton 
                              size={"small"}
                              aria-label="edit">
                    <EditNoteIcon sx={{ color: "#757579" }}/>
                  </IconButton>
                  </Link>
                  </>
                }
              </Card>
            </CardActions>
          </CardContent>
        </Stack>
      </Stack>
    </Container>
  );
}
