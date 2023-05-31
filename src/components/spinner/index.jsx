import { CircularProgress, Container, styled } from "@mui/material";

const StyledSpinnerContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}));

export function Spinner() {
  return <StyledSpinnerContainer maxWidth={"lg"} sx={{ marginTop: "20px" }}>
    <CircularProgress/>
  </StyledSpinnerContainer>;
}
