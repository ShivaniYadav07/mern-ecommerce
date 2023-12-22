import { LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
      CLEAR_ERRORS} from "../constants/userConstants";
      import axios from "axios";

      export const login = (email, password) => async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST});

            const config = { Headers: { "Content-Type": "application/json"}};

            const {data} = await axios.post(
                `/api/v1/login`,
                {email, password},
                config
            );
            dispatch ({ type: LOGIN_SUCCESS, payload: data.user});
        } catch (error) {
            dispatch ({ type: LOGIN_FAIL, payload: error.response.data.message});
        }
      };

      export const signup = (name, email, password) => async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST});

            const config = { Headers: { "Content-Type": "application/json"}};

            const {data} = await axios.post(
                `/api/v1/login`,
                {name, email, password},
                config
            );
            dispatch ({ type: LOGIN_SUCCESS, payload: data.user});
        } catch (error) {
            dispatch ({ type: LOGIN_FAIL, payload: error.response.data.message});
        }
      };

      // clearing Errors
      export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS});
      }