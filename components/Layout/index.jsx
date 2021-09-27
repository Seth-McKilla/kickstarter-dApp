import { Container } from "semantic-ui-react";
import { Header } from "..";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
