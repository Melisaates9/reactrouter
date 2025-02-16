import { Link, useLoaderData, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import styled from "styled-components";
interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface AlbumProps {
  userId: number;
  id: number;
  title: string;
}
interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextBlock = styled.div`
  text-align: center;
  margin-inline: 30px;
  background: linear-gradient(134deg, #f6d9d9, #7c3739b3);
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  margin-block: 10px;
  color: #3d3b3ae0;
  
  &:hover {
    transform: scale(1.05);
  }
`;

//kart için detaylar
const Card = styled.div`
  width: 350px;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  margin-block: 10px;
  color: #3d3b3a;
  &:hover {
    transform: scale(1.05);
  }
`;

export async function userDetail({ params }: { params: { userId: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  console.log("Fetched user:", user);

  return user;
}

export const UserDetail = () => {
  const [postData, setPostData] = useState<PostProps[]>([]); // API'den gelen veriler burada saklanır
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata mesajlarını saklamak için
  const [albumData, setAlbumData] = useState<AlbumProps[]>([]);
  const [todosData, setTodosData] = useState<TodoProps[]>([]);

  const { userId } = useParams<{ userId: string }>();
  const user = useLoaderData() as {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      city: string;
    };
  };
  async function fetchPostData() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data = await response.json();
      setPostData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  //part2
  async function fetchAlbumData() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      const data = await response.json();
      setAlbumData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  //part 3
  async function fetchTodosData() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      const data = await response.json();
      setTodosData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPostData();
    fetchAlbumData();
    fetchTodosData();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata:{error} </p>;
  return (
    <>
      <Wrapper>
        <Card>
          {" "}
          <h1>Kullanıcı Detayları</h1>
          <p>
            <strong>Adı:</strong> {user.name}
          </p>
          <p>
            <strong>Kullanıcı Adı:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Telefon:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Adres:</strong> {user.address.street}, {user.address.city}
          </p>
        </Card>
      </Wrapper>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Posts">
          {postData.map((post) => (
            <Link to={`/users/${userId}/posts/${post.id}`}key={post.id}>
            <TextBlock>
              <h5>{post.title}</h5>
              <p> {post.body} </p>
             
            </TextBlock>
            </Link>
          ))}

        </Tab>
        <Tab eventKey="profile" title="Albums">
          {albumData.map((album) => (
            <Link to={ `/users/${userId}/albums/${album.id}`} key={album.id} >
            <TextBlock>
              <h5> {album.title} </h5>
            </TextBlock>
            </Link>
          ))}
        </Tab>
        <Tab eventKey="contact" title="Todos">
          {todosData.map((todo) => (
            <TextBlock key={todo.id}>
              <h5> {todo.title} </h5>
              <div> {todo.completed ? <p>true</p> : <p>false </p>}</div>
            </TextBlock>
          ))}
        </Tab>
      </Tabs>
    </>
  );
};
