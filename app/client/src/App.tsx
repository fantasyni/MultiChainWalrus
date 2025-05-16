import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box, Container } from "@radix-ui/themes";

function App() {
  return (
    <Box>
      <Toaster position="top-center" />
      <Container>
        <Header />
      </Container>
      <Outlet></Outlet>
    </Box>
  );
}

export default App;
