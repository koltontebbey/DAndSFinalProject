var app = new Vue({
  el: '#expiredCert',
  data: {
    reportList: [],
    uniqueCerts: '',
    filterResults: [],
    certSelection: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.fetchExpCert();
  },

  methods: {
    // pulls data from list_all_cert.php
    fetchExpCert: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/reports/expired_cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.reportList = data;

        // acc for cert names
        var temp = [];

        for(i = 0; i < this.reportList.length; i++){
          if(this.reportList[i]['is_active'] === 0){
            this.reportList[i]['is_active'] = "No";
          }
          else{
            this.reportList[i]['is_active'] = "Yes";
          }
          temp.push(this.reportList[i]['cert_name']);
          this.filterResults.push(this.reportList[i]);
        }
        this.uniqueCerts = Array.from(new Set(temp));
      });
    },

    // filter certifications
    filterCerts: function(){
      this.filterResults.splice(0, this.filterResults.length);
      for(i = 0; i < this.reportList.length; i++){
        if((this.reportList[i]['cert_name'] === this.certSelection) ||
            (this.certSelection === 'all_certs')){
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
      for(i = 0; i < Object.keys(this.filterResults[0]).length - 1; i++){
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
