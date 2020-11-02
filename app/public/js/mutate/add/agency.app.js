var app = new Vue({
  el: '#addAgency',
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
        agency_name: "",
        street_address: "",
        city: "",
        state_abbr: "",
        zip: "",
        email: "",
        phone_num : ""
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
      this.usrInput['state_abbr'] = this.stateSelected['id'];
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      fetch('/api/mutate/add/agency.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('New agency has been added.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          const urlParam = new URLSearchParams(window.location.search);
          var isCertRedir = urlParam.get('crdir');
          if(isCertRedir === null){
            var path = '/func/mutate/add/agency.html';
            path = host.concat(path);
            window.location.href = path;
          }
          else{
            var path = '/func/mutate/add/cert.html?getinfo=1';
            path = host.concat(path);
            window.location.href = path;
          }
        }
      });
    }
  }
})
