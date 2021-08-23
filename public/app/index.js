$(document).ready(function() {
  $('#logs tfoot th').each( function () {
    var title = $(this).text();
    $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
  });

  $('#logs').DataTable({
    data: [],
    columns: [
      { data: 'date' },
      { data: 'time' },
      { data: 'method' },
      { data: 'url' },
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
    fetch(e.target.href)
      .then(function(response) {
        return response.json();
      }).then(function(data) {  
        refreshData(data);
      });
  });
});

function refreshData(data) {
  var dataTable = $("#logs").DataTable();
  dataTable.clear().draw();
  dataTable.rows.add(data).draw();
}
