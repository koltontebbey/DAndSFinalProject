var app = new Vue({
  el: '#updateMember',
  data: {
    usrInput: [],
    stateList: [],
    rankList: [],
    mbrId: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getStateList();
    this.getRankList();
    this.getCurrentVal();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
        person_id: "",
        first_name: "",
        last_name: "",
        gender: "",
        radio_number: "",
        rank_id: "",
        is_active: "",
        date_of_birth : "",
        start_date: "",
        street_address: "",
        city: "",
        state_abbr: "",
        zip: "",
        contact_email: "",
        home_phone: "",
        work_phone: "",
        mobile_phone:""
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
    getRankList: function(){
      var requestOptions = {
        method: 'GET'
      };
      fetch('/api/common/helper/ranks.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.rankList = data;
      });
    },
    getCurrentVal: function(){
      var requestOptions = {
        method: 'GET'
      };
      const urlParam = new URLSearchParams(window.location.search);
      this.mbrId = urlParam.get('id');
      var apiPath = '/api/mutate/update/pull/mbr.php?mbrId='.concat(this.mbrId);
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.usrInput = data[0];
      });
    },
    // posts the data into api endpoint
    postAdd: function() {
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      fetch('/api/mutate/update/mbr.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Member has been updated.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/update/mbr.html?id='.concat(this.mbrId);
          path = host.concat(path);
          window.location.href = path;
          }
          else{
            console.log(data)
          }
        });
    }
  }
})
