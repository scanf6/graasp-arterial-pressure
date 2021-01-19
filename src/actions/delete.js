import {
  SECTION_ERASE_ALL, STIMULATION_ERASE_ALL, DELETE_BULBAR, DELETE_MEDULAR,
} from '../types';

export const deleteBulbar = () => (dispatch) => {
  dispatch({ type: SECTION_ERASE_ALL });
  dispatch({ type: STIMULATION_ERASE_ALL });
  dispatch({ type: DELETE_BULBAR });
};

export const deleteMedular = () => (dispatch) => {
  dispatch({ type: SECTION_ERASE_ALL });
  dispatch({ type: STIMULATION_ERASE_ALL });
  dispatch({ type: DELETE_MEDULAR });
};
