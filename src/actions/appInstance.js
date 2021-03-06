import {
  APP_INSTANCES_ENDPOINT,
  DEFAULT_GET_REQUEST,
  DEFAULT_PATCH_REQUEST,
} from '../config/api';
import { flag, getApiContext, isErrorResponse } from './common';
import {
  CHANGE_THEME_COLOR,
  FLAG_GETTING_APP_INSTANCE,
  FLAG_PATCHING_APP_INSTANCE,
  GET_APP_INSTANCE_FAILED,
  GET_APP_INSTANCE_SUCCEEDED,
  GET_CONTEXT_SUCCEEDED,
  PATCH_APP_INSTANCE_FAILED,
  PATCH_APP_INSTANCE_SUCCEEDED,
  TOGGLE_HEADER,
} from '../types';

const flagGettingAppInstance = flag(FLAG_GETTING_APP_INSTANCE);
const flagPatchingAppInstance = flag(FLAG_PATCHING_APP_INSTANCE);

const getAppInstance = async () => async (dispatch, getState) => {
  dispatch(flagGettingAppInstance(true));
  try {
    const { appInstanceId, apiHost } = getApiContext(getState);

    const url = `//${apiHost + APP_INSTANCES_ENDPOINT}/${appInstanceId}`;

    const response = await fetch(url, DEFAULT_GET_REQUEST);

    // throws if it is an error
    await isErrorResponse(response);

    const appInstance = await response.json();

    // extract layout properties from settings and apply, if present
    if (appInstance && appInstance.settings) {
      const {
        showHeader,
        themeColor,
        lang,
      } = appInstance.settings;
      if (typeof showHeader !== 'undefined') {
        dispatch({
          type: TOGGLE_HEADER,
          payload: showHeader,
        });
      }
      if (typeof themeColor !== 'undefined') {
        dispatch({
          type: CHANGE_THEME_COLOR,
          payload: themeColor,
        });
      }
      // allow certain parts of the settings to override context
      if (typeof lang !== 'undefined') {
        dispatch({
          type: GET_CONTEXT_SUCCEEDED,
          payload: { lang },
        });
      }
    }

    // send the app instance to the reducer
    return dispatch({
      type: GET_APP_INSTANCE_SUCCEEDED,
      payload: appInstance,
    });
  } catch (err) {
    return dispatch({
      type: GET_APP_INSTANCE_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingAppInstance(false));
  }
};

const patchAppInstance = async ({ data } = {}) => async (dispatch, getState) => {
  dispatch(flagPatchingAppInstance(true));
  try {
    const { appInstanceId, apiHost } = getApiContext(getState);

    const url = `//${apiHost + APP_INSTANCES_ENDPOINT}/${appInstanceId}`;
    const body = {
      settings: data,
    };

    const response = await fetch(
      url,
      {
        ...DEFAULT_PATCH_REQUEST,
        body: JSON.stringify(body),
      },
    );

    // throws if it is an error
    await isErrorResponse(response);

    const appInstance = await response.json();

    return dispatch({
      type: PATCH_APP_INSTANCE_SUCCEEDED,
      payload: appInstance,
    });
  } catch (err) {
    return dispatch({
      type: PATCH_APP_INSTANCE_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagPatchingAppInstance(false));
  }
};

export {
  patchAppInstance,
  getAppInstance,
};
