import $ from 'jquery';
import {indexTasks, postTask, markComplete, markActive, removeTask} from './requests';

// Setup

let taskLayout = function(task) {
  let checkbox = $("<input type='checkbox' />").prop('checked', task.completed);
  let content = $("<span class='mx-4'></span>").append(task.content);
  let button = "<button class='btn btn-danger remove'>x</button>";

  let newDiv = $('<div></div>').attr('data-id', task.id).addClass('col-12 mb-3 p-2 border rounded task').append(checkbox, content, button);

  $('#tasks').append(newDiv);

  checkboxHandler($('#tasks div:last-child input'));
  removeHandler($('#tasks div:last-child button'));
  applyFilter();
}

indexTasks(function(response) {
  response.tasks.map(function(task) {taskLayout(task);});
});

$(function() {
  $('#all-btn').on('click', function() {
    showAll();
    changeColor(this);
  });
  $('#active-btn').on('click', function() {
    showActive();
    changeColor(this);
  });
  $('#complete-btn').on('click', function() {
    showComplete();
    changeColor(this);
  });
  $('form').on('submit', function(e) {
    e.preventDefault();
    submitHandler();
  });
});
// End Setup

// Handlers

let checkboxHandler = function(checkbox) {
  $(checkbox).on('change', function() {
    let status = $(this).prop('checked');
    let id = $(this).closest('div').attr('data-id');

    if (status) {
      markComplete(id);
    } else {
      markActive(id);
    }

    applyFilter();
  });
}

let submitHandler = function() {
  let content = $('input:text').val();
  postTask(content, function(response) {taskLayout(response.task)});
  $('input:text').val('');
}

let removeHandler = function(button) {
  $(button).on('click', function() {
    let parent = $(this).closest('div');
    let id = parent.attr('data-id');
    removeTask(id, function() {parent.remove();});
  })
}
// End Handlers

// Filters

let filter = {current: 'all'}

let changeColor = function(button) {
  $('#filter-buttons button').removeClass('selected');
  $(button).addClass('selected');
}

let showAll = function() {
  $('input:checkbox').closest('div').show();
  filter.current = 'all';
}

let showActive = function() {
  showAll();
  $('input:checked').closest('div').hide();
  filter.current = 'active';
}

let showComplete = function() {
  showAll();
  $('input:checkbox').not('input:checked').closest('div').hide();
  filter.current = 'complete';
}

let applyFilter = function() {
  switch (filter.current) {
    case 'active':
      showActive();
      break;
    case 'complete':
      showComplete();
      break;
    default:
      showAll();
  }
}
// End Filters


