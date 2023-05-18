import { PostList } from "../../components/post-list";
import { Spinner } from "../../components/spinner";
import { WelcomeCard } from "../../components/welcome-card";

export function HomePostsPage({ isLoading }) {
  return (
    <>
      <WelcomeCard />
      {isLoading ? <Spinner /> : <PostList />}
    </>
  );
}
