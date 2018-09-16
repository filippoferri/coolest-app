import axios from 'axios';
import Utils from '../Const/instaConst';

export default {
  urlBase: username =>
    axios.get( Utils.URL_BASE + username)
};