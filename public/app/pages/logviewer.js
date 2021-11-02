export default class LogViewer {
  constructor(el) {
    this.el =el; 
  }

  componentMounted () {
    let that = this;
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

      // TODO: Refactor this
      $("#logs-container").show();
      $("#chart").hide();

      that.fetchData(e.target.href);
    });
  }

  fetchData(url) {
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
      .then(response => {
        return response.json();
      }).then(data => {  
        this.refreshDataTable(data);
        Swal.close();
      });
    } catch(e) {
      Swal.close();
      alert(e);
    }
  }

  refreshStats(stats) {
    let stats_c = $("#stats_controller");
    stats_c.html("");
    let ui = ``;
  
    for (var key of Object.keys(stats)) {
      let normalizedKey = key.replace("/", "-");
      // console.log(key + " -> " + stats[key])
      ui += `
        <div class="stats-item ${normalizedKey}">
          <h4 class="kpi">${stats[key]}</h4>
          <h6>${key}</h6>
        </div>
      `
    }
  
    stats_c.html(`<div class="stats-container">${ui}</div>`);
  
    //animateCSS(".stats-item", "pulse");
    animateCSS(".stats-item", 'slideInDown');
  }
  

  refreshDataTable(data) {
    var dataTable = $("#logs").DataTable();
    dataTable.clear().draw();
    //dataTable.rows.add(data).draw();
    dataTable.rows.add(data.items);
  
    dataTable.columns.adjust().draw();
  
    this.refreshStats(data.stats_controller);
  
    animateCSS("#logs", "pulse");
  }
  

  setupDataTable() {
    // Set active links
    $(function($) {
      var path = window.location.href; 
      $('.files a').each(function() {
        // console.log(this.href, path);
      if (this.href === path) {
        $(this).toggleClass('active');
        $("#log-title").innerHTML = "LOGS - " + path;
      }
      });
    });

    $(document).ready(() => {
      this.fetchData(window.location.pathname);
      window.onpopstate = () => {
        this.fetchData(window.location.pathname);
      }

      // Setup - add a text input to each footer cell
      $('#logs thead tr').clone(true).appendTo( '#logs thead' );
      $('#logs thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        $(this).html( `<input type="text" data-col=${i} class="col-search" placeholder="Search ${title}" />` );
      });
      
      $('#logs').removeAttr("width").DataTable({
        data: [],
        orderCellsTop: true,
        columns: [
          { data: 'date' },
          { data: 'time' },
          { data: 'ip' },
          { data: 'method' },
          { data: 'controller' },
          { data: 'path' },
        ],
        scrollY:        "300px",
        scrollX:        true,
        scrollCollapse: true,
        fixedColumns: true,
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        initComplete: function () {
          $(".col-search").on( 'keyup change clear', function(e) {
            e.stopImmediatePropagation();
            let colIndex = $(this).data("col");
            $("#logs").DataTable().column(colIndex).search(e.target.value).draw()
          });
        }
      });
    })
  }

  render(files) {
    this.setupDataTable();
    this.componentMounted();
    return this;
  }
}