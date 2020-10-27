var app = new Vue({
  el: '#certDetails',
  data: {
    certList: [],
    certDetails: [],
    mbrsWithCert: [],
    certSelected: ''
  },

  created() {
    this.fetchCertList();
  },

  methods: {
    fetchCertList: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/detail_view/cert/cert_helper.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.certList = data;
      });
    },
    fetchPageDetails: function(){
      var params = [['certId', this.certSelected['id']]];
      var queryStr = new URLSearchParams(params).toString();
     fetch('/api/detail_view/cert/cert.php?'.concat(queryStr))
     .then(response => response.json())
     .then(data => {
       this.certDetails = data['cert_details'][0];
       this.mbrsWithCert.splice(0, this.mbrsWithCert.length);
       for(i = 0; i < data['members'].length; i++){
         this.mbrsWithCert.push(data['members'][i]);
       }
     });
    }
  }
})
