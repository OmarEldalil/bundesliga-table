import * as yup from 'yup';

export default yup.object().shape({
  home: yup.object().shape({
    teamId: yup.number().positive().integer().required(),
    goalsScored: yup.number().positive().integer().required(),
  }).required(),
  away: yup.object().shape({
    teamId: yup.number().positive().integer().required(),
    goalsScored: yup.number().positive().integer().required(),
  }).required()
});
