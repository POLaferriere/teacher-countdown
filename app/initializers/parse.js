import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'W1aM3aMPf0VKCDF1RrEUK2KfnyaNee1lcRv4M2IU');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'RnA4twXz3S4KUrC9hTOJPVkGyALObPRW4BMEwogQ');
      if(localStorage.getItem('parse-session-token')) {
      	xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'))
      }
    }
  }
});