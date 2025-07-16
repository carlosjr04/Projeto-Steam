import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { ENV } from '../../env';

const removeWishlistItemRequest = async (id: number) => {
  await axios.delete(`${ENV.API_URL}/wishlists/${id}`);
};

export const useRemoveWishlistItem = () => {
  return useMutation({
    mutationFn: (id: number) => removeWishlistItemRequest(id),
  });
};
