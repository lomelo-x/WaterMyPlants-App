export const SET_USER_ID = 'SET_USER_ID';

export const setUserId = (id) => {
	return { type: SET_USER_ID, payload: id };
};
