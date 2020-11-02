var app = new Vue({
  el: '#updateStation',
  data: {
    usrInput: [],
    stateList: [],
    stationId: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getStateList();
    this.getCurrentVals();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
        station_id: "",
        station_name: "",
        street_address: "",
        city: "",
        state_abbr: "",
        zip: "",
        station_contact_num : ""
      }
    },
    // get list of states for selection
    getStateList: function(){
      var requestOptions = {
        method: 'GET'
      };
      fetch('/api/common/helper/states.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.stateList = data;
      });
    },
    // posts the data into api endpoint
    postAdd: function() {
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      fetch('/api/mutate/update/station.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Station details has been updated.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/update/station.html?id='.concat(this.stationId);
          path = host.concat(path);
          window.location.href = path;
        }
      });
    },
    getCurrentVals: function(){
      var requestOptions = {
        method: 'GET'
      };
      const urlParam = new URLSearchParams(window.location.search);
      this.stationId = urlParam.get('id');
      var apiPath = '/api/mutate/update/pull/station.php?stationId='.concat(this.stationId);
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.usrInput = data[0];
      });
    }
  }
})
