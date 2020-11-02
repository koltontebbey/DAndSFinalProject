var app = new Vue({
  el: '#updateCert',
  data: {
    usrInput: [],
    agencyList: [],
    certSelected: '',
    rdir:''
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getAgencyList();
    this.getCurrentCert();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      var result = {
        cert_id:"",
        cert_name: "",
        cert_agency_id: "",
        default_exp: ""
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
    getCurrentCert: function(){
      const urlParam = new URLSearchParams(window.location.search);
      this.certSelected = urlParam.get('id');
      var apiPath = '/api/mutate/update/pull/cert.php?certId='.concat(this.certSelected);
      fetch(apiPath)
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
      fetch('/api/mutate/update/cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Certification has been updated.');
          const urlParam = new URLSearchParams(window.location.search);
          this.rdir = urlParam.get('rdir');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          if(this.rdir === '1'){
            var path = '/func/views/cert_detail.html?id='.concat(this.certSelected);
            path = host.concat(path);
            window.location.href = path;
          }
          else{
            var path = '/func/mutate/update/cert.html?id='.concat(this.certSelected);
            path = host.concat(path);
            window.location.href = path;
          }
        }
      });
    }
  }
})
