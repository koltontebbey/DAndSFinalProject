var app = new Vue({
  el: '#namesByStation',
  data: {
    reportList: [],
    uniqueStations: '',
    filterResults: [],
    stationSelection: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.fetchNames();
  },

  methods: {
    // pulls data from names_by_station.php
    fetchNames: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/reports/names_by_station.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.reportList = data;

        // acc for station names
        var temp = [];

        for(i = 0; i < this.reportList.length; i++){
          // replaces bool
          if(this.reportList[i]['is_active'] === 0){
            this.reportList[i]['is_active'] = "No";
          }
          else{
            this.reportList[i]['is_active'] = "Yes";
          }

          temp.push(this.reportList[i]['station_name']);
          this.filterResults.push(this.reportList[i]);
        }
        this.uniqueStations = Array.from(new Set(temp));
      });
    },

    // filter stations
    filterStation: function(){
      this.filterResults.splice(0, this.filterResults.length);
      for(i = 0; i < this.reportList.length; i++){
        if((this.reportList[i]['station_name'] === this.stationSelection) ||
            (this.stationSelection === 'all_stations')){
          this.filterResults.push(this.reportList[i]);
        }
      }
    },
    exportSelection: function(){
      var acc = [];
      //get headers
      var head = [];
      var keys = Object.keys(this.filterResults[0]);
      // -1 to remove the delta col
      for(i = 0; i < Object.keys(this.filterResults[0]).length; i++){
        head.push(keys[i]);
      }
      acc.push(head);
      // outer loop goes through all certs in filterResults
      for(i = 0; i < this.filterResults.length; i++){
        //inner loop goes through all keys
        var row = [];
        for(j = 0; j < head.length; j++){
          var keyToGet = head[j];
          // get value
          var val = this.filterResults[i][keyToGet];
          row.push(val);
        }
        acc.push(row);
        row = [];
      }
      // export acc as CSV
      // this portion is credited to :
      //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
      let csvContent = "data:text/csv;charset=utf-8," + acc.map(e => e.join(",")).join("\n");
      // get report type
      var reportPg = window.location.pathname;
      var lastSlashPos = reportPg.lastIndexOf("/") + 1;
      var dotPos = reportPg.lastIndexOf(".")
      var name = reportPg.substring(lastSlashPos, dotPos).concat(".csv");
      // source of this was the same link as above
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", name);
      document.body.appendChild(link); // Required for FF
      link.click();
    }
  }
})
