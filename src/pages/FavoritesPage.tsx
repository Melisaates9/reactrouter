import React from "react";

import { useFavoritePhotos } from "../stores/favorite";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";

export const FavoritesPage = () => {
  const favoritePhotos = useFavoritePhotos((state) => state.favoriteAlbums);
  const removeFavorite = useFavoritePhotos((state) => state.removeFavorite);
  const removeFav = (id: number) => {
    removeFavorite(id);
  };
  return (
    <>
      <h2>FavoritesPage</h2>
      {favoritePhotos.map((item) => (
        <div key={item.id}>
          <div>{item.id} </div>
          <div>
            <img src={item.thumbnailUrl} alt="" />
          </div>
         
          <Link to={`/users/${item.albumId}/albums/${item.albumId}`} className="link">
            {item.title}
          </Link>

          <div>
            <Button onClick={() => removeFav(item.id)}>
              <CiTrash />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};
