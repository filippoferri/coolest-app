import React from 'react';
import Instagram from '../lib/Instagram/urlBase'

const ProfileDetails = (username) => {
  return Instagram.urlBase(username).then(json => json.data.graphql.user);
};

export default ProfileDetails;