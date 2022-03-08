import * as yup from 'yup';

export default yup.object().shape({
 limit: yup.number().positive().integer(),
 page: yup.number().positive().integer(),
});
