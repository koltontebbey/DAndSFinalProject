var app = new Vue({
  el: '#addCert',
  data: {
    usrInput: [],
    agencyList: []
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getAgencyList();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      var result = {
        cert_name: "",
        cert_agency_id: "",
        default_exp: ""
      }
      const urlParam = new URLSearchParams(window.location.search);
      var redir = urlParam.get('getinfo');
      if(redir === "1"){

        fetch('/api/mutate/add/redir_search_sesh.php?getinfo=1')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data['cert_name'] != null){
             result['cert_name'] = data['cert_name']
          }
          if(data['default_exp'] != null){
             result['default_exp'] = data['default_exp']
          }
        });
      }
      return result;
    },
    // get list of agency for selection
    getAgencyList: function(){
      var requestOptions = {
        method: 'GET'
      };
      fetch('/api/common/helper/agency.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.agencyList = data;
      });
    },
    // posts the data into api endpoint
    postAdd: function() {
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      fetch('/api/mutate/add/cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('New certification has been added.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/add/cert.html';
          path = host.concat(path);
          window.location.href = path;
        }
      });
    },
    // TODO finish
    redirAgency: function(){
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      console.log(requestOptions);
      fetch('/api/mutate/add/redir_search_sesh.php', requestOptions)
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        // if(data['status'] === 'ok'){
        //   // redirect
        //   const host = 'http://'.concat(window.location.host);
        //   var path = '/func/mutate/add/agency.html?crdir=yes';
        //     path = host.concat(path);
        //   window.location.href = path;
        // }
      });
    }
  }
})
