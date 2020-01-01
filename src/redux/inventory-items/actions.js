import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_INVENTORY_ITEMS_REQUEST: 'inventoryItems/FETCH_INVENTORY_ITEMS_REQUEST',
  FETCH_INVENTORY_ITEMS_SUCCESS: 'inventoryItems/FETCH_INVENTORY_ITEMS_SUCCESS',
  FETCH_INVENTORY_ITEMS_FAILURE: 'inventoryItems/FETCH_INVENTORY_ITEMS_FAILURE',
};

export const fetchInventoryItems = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_INVENTORY_ITEMS_REQUEST });
    try {
      const response = await axios.get(`/api/inventory-items`);
      const inventoryItems = response.data.data;
      dispatch({ type: Type.FETCH_INVENTORY_ITEMS_SUCCESS, inventoryItems });
      return inventoryItems;
    } catch (err) {
      dispatch({ type: Type.FETCH_INVENTORY_ITEMS_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
