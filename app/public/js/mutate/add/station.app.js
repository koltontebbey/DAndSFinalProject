var app = new Vue({
  el: '#addStation',
  data: {
    usrInput: [],
    stateList: [],
    stateSelected: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getStateList();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
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
      fetch('/api/mutate/add/station.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('New station has been added.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/add/station.html';
          path = host.concat(path);
          window.location.href = path;
        }
      });
    }
  }
})
