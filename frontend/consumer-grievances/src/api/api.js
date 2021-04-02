import axios from "axios";

export default {
  getPopulationData: async () => {
    return await axios.get("/fetchPopulationData");
  },
  getRobocallData: async (searchedState) => {
    return axios.get(`/fetchRobocallComplaints/${searchedState}`);
  },
  getConsumerComplaintData: async (abbr) => {
    return axios.get(`/fetchConsumerComplaints/${abbr}`);
  },
};