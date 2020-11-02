var app = new Vue({
  el: '#updateAgency',
  data: {
    usrInput: [],
    stateList: [],
    agencyId: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.currVals = this.getCurrentVal();
    this.getStateList();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
        agency_id: "",
        agency_name: "",
        street_address: "",
        city: "",
        state_abbr: "",
        zip: "",
        email: "",
        phone_num : ""
      }
    },
    getCurrentVal: function(){
      var requestOptions = {
        method: 'GET'
      };
      const urlParam = new URLSearchParams(window.location.search);
      this.agencyId = urlParam.get('id');
      var apiPath = '/api/mutate/update/pull/agency.php?agencyId='.concat(this.agencyId);
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.usrInput = data[0];
      });
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
      fetch('/api/mutate/update/agency.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Agency has been updated.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          const urlParam = new URLSearchParams(window.location.search);
          if(urlParam.get('rdir') === '1'){
            var path = '/func/views/agency_detail.html?id='.concat(this.agencyId);
            path = host.concat(path);
            window.location.href = path;
          }
          else{
            var path = '/func/mutate/update/agency.html?id='.concat(this.agencyId);
            path = host.concat(path);
            window.location.href = path;
          }
        }
      });
    }
  }
})
