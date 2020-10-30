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
    }
  }
})
