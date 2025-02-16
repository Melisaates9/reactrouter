import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFavoritePhotos } from '../stores/favorite';
import { Link } from 'react-router-dom';
function Navbars() {
    const favoritePhotos = useFavoritePhotos((state) => state.favoriteAlbums);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"} >Home Page</Nav.Link>
            <Nav.Link as={Link} to={"/users"} >Users</Nav.Link>
            <Nav.Link as={Link} to={"/"} >Favorite ({favoritePhotos.length}) </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  );
}
export default Navbars;