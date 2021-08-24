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

  // Setup - add a text input to each footer cell
  $('#logs thead tr').clone(true).appendTo( '#logs thead' );
  $('#logs thead tr:eq(1) th').each( function (i) {
      var title = $(this).text();
      $(this).html( `<input type="text" data-col=${i} class="col-search" placeholder="Search ${title}" />` );
      
  });
  
  // $('#logs tfoot th').each( function () {
  //   var title = $(this).text();
  //   $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
  // });

  $('#logs').removeAttr("width").DataTable({
    data: [],
    orderCellsTop: true,
    columns: [
      { data: 'date' },
      { data: 'time' },
      { data: 'ip' },
      { data: 'method' },
      { data: 'path' },
      { data: 'controller' },
    ],
    scrollY:        "300px",
    scrollX:        true,
    scrollCollapse: true,
    // columnDefs: [
    //   { width: '10%', targets: 0 }
    // ],
    fixedColumns: true,

    initComplete: function () {
      var table = this;
      // Apply the search
      //$("#logs").DataTable().column(1).search("19:09").draw()
      $(".col-search").on( 'keyup change clear', function(e) {
        e.stopImmediatePropagation();
        let colIndex = $(this).data("col");
        $("#logs").DataTable().column(colIndex).search(e.target.value).draw()
      });
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
  //dataTable.rows.add(data).draw();
  dataTable.rows.add(data.items);

  dataTable.columns.adjust().draw();

  refreshStats(data.stats_controller);
}

function refreshStats(stats) {
  console.log("Loading stats...");
  let stats_c = $("#stats_controller");
  stats_c.html("");
  let ui = ``;

  for (var key of Object.keys(stats)) {
    console.log(key + " -> " + stats[key])
    ui += `
      <div class="stats-item">
        <h4 class="kpi">${stats[key]}</h4>
        <h6>${key}</h6>
      </div>
    `
  }

  stats_c.html(`<div class="stats-container">${ui}</div>`);
}
