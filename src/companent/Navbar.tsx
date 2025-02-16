import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFavoritePhotos } from '../stores/favorite';

function Navbars() {
    const favoritePhotos = useFavoritePhotos((state) => state.favoriteAlbums);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home Page</Nav.Link>
            <Nav.Link href="#features">Users</Nav.Link>
            <Nav.Link href="#pricing">Favorite ({favoritePhotos.length}) </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  );
}

export default Navbars;