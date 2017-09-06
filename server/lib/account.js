/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//

/* Overide the default user content */
Accounts.onCreateUser(function (profile, rawdata, err) {
  
  if (rawdata.services.facebook) {
    rawdata.services.facebook.picture = "https://graph.facebook.com/" + rawdata.services.facebook.id + "/picture?width=40&height=40";
  }
  
  if (rawdata.services.twitter) {
    rawdata.services.twitter.picture = rawdata.services.twitter.profile_image_url;
    delete rawdata.services.twitter.profile_image_url;
    delete rawdata.services.twitter.profile_image_url_https;
  }

  return rawdata;
});
