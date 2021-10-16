import {v4 as uuidv4} from 'uuid';
import {DateTime} from 'luxon';

export const state = () => ({
  audits: []
});

export const mutations = {
  setAudits(state, val) {
    state.audits = val;
  }
};

export const actions = {

  addAudit({commit, state}, audit) {
    const now = DateTime.now();
    const audits = [...state.audits];
    audit.uuid = uuidv4();
    audit.timestamp = now.toString();
    audits.push(audit);
    commit('setAudits', audits);

    return audit.uuid;
  }
};
