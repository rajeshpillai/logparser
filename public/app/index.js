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
    window.history.pushState(
      {},
      e.target.href,
      e.target.href
    )

    fetchData(e.target.href);
  });
});

function fetchData(url) {
  const options = {
    method: "GET",
    headers: new Headers({'content-type': 'application/json'}),
    mode: 'cors'
  };

  fetch(url, options)
    .then(function(response) {
      return response.json();
    }).then(function(data) {  
      refreshDataTable(data);
    });
}

function refreshDataTable(data) {
  var dataTable = $("#logs").DataTable();
  dataTable.clear().draw();
  dataTable.rows.add(data).draw();
}
