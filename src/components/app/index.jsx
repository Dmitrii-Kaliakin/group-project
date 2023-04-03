import { Header } from "../header";
import { Footer } from "../footer";
import "./styles.css";
import { PostList } from "../post-list";
import { WelcomeCard } from "../welcome-card";

export function App() {
  const createPost = () => {
    console.log("Есть контакт");
  };

  return (
    <>
      <Header />
      <main className="content container">
        <WelcomeCard createPost={createPost} />
        <PostList />
      </main>
      <Footer />
    </>
  );
}
