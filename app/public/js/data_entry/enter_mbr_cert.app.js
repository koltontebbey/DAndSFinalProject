var app = new Vue({
  el: '#mbrCertEntry',
  data: {
    mbrList: [],
    mbrDetails: [],
    mbrCerts: [],
    mbrSelected: '',
    blockInsert: false,
    certList: [],
    certSelected: '',
    certDetails: [],
    date_obt: ''
  },

  created() {
    this.fetchMbrList();
  },

  methods: {
    fetchMbrList: function() {
      var requestOptions = {
        method: 'GET'
      }
      fetch('/api/detail_view/member/member_helper.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.mbrList = data;
      });
    },
    fetchMbrDetails: function(){
      // add clear all var
      var params = [['mbrId', this.mbrSelected['id']]];
      var queryStr = new URLSearchParams(params).toString();
     fetch('/api/detail_view/member/mbr_details.php?'.concat(queryStr))
     .then(response => response.json())
     .then(data => {
       this.mbrDetails = data['mbr_details'][0];
       this.mbrCerts.splice(0, this.mbrCerts.length);
       for(i = 0; i < data['certs'].length; i++){
         this.mbrCerts.push(data['certs'][i]);
       }
     });
    },
    unhideCertEntry: function(){
       this.blockInsert = true;
       this.fetchCertList();
     },
    cancelEntry: function(){
       this.blockInsert = false;
     },
    fetchCertList: function() {
       var requestOptions = {
         method: 'GET'
       }
       fetch('/api/detail_view/cert/cert_helper.php', requestOptions)
       .then(response => response.json())
       .then(data => {
         this.certList = data;
       });
     },
    fetchCertDetails: function(){
       var params = [['certId', this.certSelected['id']]];
       var queryStr = new URLSearchParams(params).toString();
      fetch('/api/detail_view/cert/cert.php?'.concat(queryStr))
      .then(response => response.json())
      .then(data => {
        this.certDetails = data['cert_details'][0];
      });
    },
    insertCert:function(){
      var inputs = {"mbrSelected": this.mbrSelected['id'],
                    "certSelected": this.certSelected['id'],
                    "date_obt": this.date_obt};
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(inputs)
      };

      fetch('/api/data_entry/add_mbr_cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (Object.keys(data).length === 0){
          this.fetchMbrDetails();
        }
      })
      ;
    }
  }
})
