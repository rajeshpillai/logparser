import LogViewer from './pages/logviewer.js';
import UploadFiles from './pages/upload-files.js';
const logViewer = new LogViewer("#root");

logViewer.render();

const upload = new UploadFiles("#root");

$(".upload-link").on("click", (e) => {
  e.preventDefault();
  upload.render();
});