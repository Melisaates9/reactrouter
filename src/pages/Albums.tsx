import React, { useEffect, useState } from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useFavoritePhotos } from "../stores/favorite";
import { RiHeartsFill } from "react-icons/ri";
import { RiHeartsLine } from "react-icons/ri";
import { Button } from "react-bootstrap";

const Photo = styled.div`
  text-align: center;
  margin-inline: 30px;
  background: linear-gradient(134deg, #33adc5c0, #9448bc);
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  margin-block: 10px;
  color: #212120;

  &:hover {
    transform: scale(1.05);
  }
`;

const PhotoText = styled.h1`
  text-align: center;
`;

interface AlbumProps {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}
interface UserProps {
  id: number;
  name: string;
}

export async function albumLoader({ params }: { params: { albumId: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const albums = await response.json();

  return albums;
}

export const Albums = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const albums = useLoaderData() as AlbumProps[];
  const { userId } = useParams<{ userId: string }>();
  const fetchUsers = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const usersName = await response.json();
    setUsers(usersName);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const favoritePhotos = useFavoritePhotos((state) => state.favoriteAlbums);
  const addFavoriteAlbums = useFavoritePhotos(
    (state) => state.addFavoriteAlbums
  );
  const removeFavorite = useFavoritePhotos((state) => state.removeFavorite);
  const addFav = (album: any) => {
    const favPic = {
      id: album.id,
      albumId: album.albumId,
      thumbnailUrl: album.thumbnailUrl,
      title: album.title,
      url: album.url,
    };
    const savedPhotos = favoritePhotos.find((item)=>item.id===album.id) 
    if (savedPhotos) { removeFavorite(album.id) 

    }
    else { addFavoriteAlbums(favPic)

    }
  };

  return (
    <>
      <PhotoText>Albums</PhotoText>
      {albums.map((album) => {
        const foundUser = users.find((user) => user.id === Number(userId));

        return (
          <Photo key={album.id}>
            <div>{album.id} </div>
            <div>
              <img src={album.thumbnailUrl} alt="" />
            </div>
            <div>{album.title} </div>
            <Link to={`/users/${userId}`}>
              {" "}
              {foundUser ? foundUser.name : "Bilinmeyen kullanıcı"}
            </Link>
            <div>
              <Button onClick={() => addFav(album)}>
                {favoritePhotos.some((fav) => fav.id === album.id) ? (
             <RiHeartsFill />
                ) : (
                  <RiHeartsLine />
                 
                )}
              </Button>
            </div>
          </Photo>
        );
      })}
    </>
  );
};
