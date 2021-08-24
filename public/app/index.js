// Utility functions 
const showLoading = function() {
 
};

// Set active links
$(function($) {
  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
  $('.files a').each(function() {
    console.log(this.href, path);
   if (this.href === path) {
    $(this).toggleClass('active');
    $("#log-title").innerHTML = "LOGS - " + path;
   }
  });
});

$(document).ready(function() {
  fetchData(window.location.pathname);
  window.onpopstate = () => {
    fetchData(window.location.pathname);
  }
  
  $('#logs tfoot th').each( function () {
    var title = $(this).text();
    $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
  });

  $('#logs').DataTable({
    data: [],
    columns: [
      { data: 'date' },
      { data: 'time' },
      { data: 'ip' },
      { data: 'method' },
      { data: 'path' },
      { data: 'controller' },
      { data: 'query' }
    ],
    initComplete: function () {
      // Apply the search
      this.api().columns().every( function () {
          var that = this;
          $( 'input', this.footer() ).on( 'keyup change clear', function (e) {
              console.log(e.target.value);
              if ( that.search() !== this.value ) {
                  that
                      .search( this.value )
                      .draw();
              }
          } );
      } );
    }
  });
})

$(function () {
  $(".file-name").on("click", function (e) {
    e.preventDefault();
    let target = e.target;

    $('.files a').each(function() {
      $(this).removeClass('active');
    });
    $(target).toggleClass('active');

    let logName = target.href.substr(target.href.lastIndexOf('/') + 1);

    $("#log-title").html(`LOGS -  ${logName} >`);

    window.history.pushState(
      {},
      e.target.href,
      e.target.href
    )

    fetchData(e.target.href);
  });
});

function fetchData(url) {
  if (url == "/") return;
  Swal.fire({
    text: "Loading logs....",
    showCancelButton: false,
    showConfirmButton: false
  })

  const options = {
    method: "GET",
    headers: new Headers({'content-type': 'application/json'}),
    mode: 'cors'
  };

  try {
    fetch(url, options)
    .then(function(response) {
      return response.json();
    }).then(function(data) {  
      refreshDataTable(data);
      Swal.close();
    });
  } catch(e) {
    Swal.close();
    alert(e);
  }
 
}

function refreshDataTable(data) {
  var dataTable = $("#logs").DataTable();
  dataTable.clear().draw();
  dataTable.rows.add(data).draw();
}
