import "./styles.css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";

export const WelcomeCard = ({ createPost }) => {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: "20px" }}>
      <Card>
        <CardHeader title={"Добро пожаловать"} />
        <CardContent>
          <Button onClick={createPost}>Создать пост</Button>
        </CardContent>
      </Card>
    </Container>
  );
};
