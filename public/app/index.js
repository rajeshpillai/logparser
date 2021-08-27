import LogViewer from './pages/logviewer.js';
import UploadFiles from './pages/upload-files.js';
import Dashboard from './pages/dashboard.js';

const logViewer = new LogViewer("#root");

logViewer.render();

const upload = new UploadFiles("#root");

$(".upload-link").on("click", (e) => {
  e.preventDefault();
  upload.render();
});

$(".dashboard-link").on("click", (e) => {
  const dashboard = new Dashboard("#root");
  e.preventDefault();
  $("#chart").html("");
  $("#chart").hide();
  $("#logs-container").hide();
  dashboard.render();
  $("#chart").show();
});

$(".logs-link").on("click", (e) => {
  e.preventDefault();
  $("#logs-container").show();
  $("#chart").hide();
});


