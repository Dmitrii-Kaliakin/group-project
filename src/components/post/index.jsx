import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, Chip,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './styles.css';

export const Post = ({ text, author, img, tags }) => {

  const avatar = <Avatar src={author?.avatar} alt={''}/>;
  const actionIcon = <IconButton aria-label={'settings'}></IconButton>;

  return <Card sx={{ minWidth: 250 }}>
    <CardHeader avatar={avatar} action={actionIcon} title={author?.name} subheader={author?.about}/>
    <CardMedia component={'img'} height={'194'} image={img} alt={'img'}/>
    < CardContent>
      <Typography variant={'body2'} color={'text.secondary'}>
        {text}
      </Typography>
    < /CardContent>
    <Stack sx={{padding: '10px'}} direction="row" spacing={1}>
      {tags?.map((tag, index) => (<Chip key={`tag_${index}`} label={tag} color={"info"} variant="outlined"/>))}
    </Stack>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon/>
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon/>
      </IconButton>
    </CardActions>
  </Card>;
};