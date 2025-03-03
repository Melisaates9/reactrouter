import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritePhotos {
  userId: number;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoriteState {
  favoriteAlbums: FavoritePhotos[];
  addFavoriteAlbums: (favorite: FavoritePhotos) => void;
  removeFavorite: (albumId: number) => void;
}
export const useFavoritePhotos = create(
  persist<FavoriteState>(
    (set) => ({
      favoriteAlbums: [],
      addFavoriteAlbums: (favorite) =>
        set((state) => ({
          favoriteAlbums: [...state.favoriteAlbums, favorite],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favoriteAlbums: state.favoriteAlbums.filter(
            (favorite) => favorite.id !== id
          ),
        })),
    }),

    {
      name: "favorite-Photos",
    }
  )
);

//post comment
interface CommentProps {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

interface FavoriteComState {
  CommentProps: CommentProps[];
  addFavoriteComments: (favorite: CommentProps) => void;
  removeFavComment: (id: number) => void;
}
export const usePostFavPage = create(
  persist<FavoriteComState>(
    (set) => ({
      CommentProps: [],
      addFavoriteComments: (favorite) =>
        set((state) => ({
          CommentProps: [...state.CommentProps, favorite],
        })),
      removeFavComment: (id) =>
        set((state) => ({
          CommentProps: state.CommentProps.filter(
            (favorite) => favorite.id !== id
          ),
        })),
    }),
    {
      name: "Post-FavPage",
    }
  )
);
