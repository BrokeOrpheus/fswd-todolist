import $ from 'jquery';

let key = '?api_key=1'

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export let indexTasks = function(successCB, errorCB) {
  let request = {
    type: 'GET',
    url: 'api/tasks' + key,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export let postTask = function(content, successCB, errorCB) {
  let request = {
    type: 'POST',
    url: 'api/tasks' + key,
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export let markComplete = function(id, successCB, errorCB) {
  let request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_complete' + key,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
}

export let markActive = function(id, successCB, errorCB) {
  let request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_active' + key,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
}

export let removeTask = function(id, successCB, errorCB) {
  let request = {
    type: 'DELETE',
    url: 'api/tasks/' + id + key,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
}