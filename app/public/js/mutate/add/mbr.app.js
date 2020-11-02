var app = new Vue({
  el: '#addAgency',
  data: {
    usrInput: [],
    stateList: [],
    rankList: []
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getStateList();
    this.getRankList();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
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
    // posts the data into api endpoint
    postAdd: function() {
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      console.log(this.usrInput['rank_id']);
      fetch('/api/mutate/add/mbr.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('New member has been added.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/add/mbr.html';
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
