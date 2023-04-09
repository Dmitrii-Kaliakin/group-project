import { Container, Stack, Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@mui/material";

export function CardPost({ post, currentUser }) {
    const { name, author, title, text, tags, image, likes } = post || {};


    return (  
        <Container  sx={{ padding: '20px' }}  maxWidth="md">
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Button href="/" variant="contained">Назад</Button>
                </Stack>
                <Stack  direction="column-reverse"
                    justifyContent="center"                  
                    alignItems="center"                  
                    spacing={1}>                   
                <Card sx={{ maxWidth: 500 }}>
                    <CardActionArea>                       
                        <CardMedia
                            component="img"                         
                            height="140"                         
                            image={image}
                            alt="green iguana"                           
                        />                      
                        <CardContent>                         
                            <Typography gutterBottom variant="h5" component="div">                            
                                {title}                          
                            </Typography>                     
                            <Typography variant="body2" color="text.secondary"> 
                                    { text}
                            </Typography>                          
                        </CardContent>                     
                    </CardActionArea>                
                    </Card>
                    </Stack>
            </Stack>
        </Container>    
    );
}

