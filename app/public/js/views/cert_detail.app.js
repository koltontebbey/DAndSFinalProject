var app = new Vue({
  el: '#certDetails',
  data: {
    certList: [],
    certDetails: [],
    mbrsWithCert: [],
    certSelected: ''
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    fetchPageDetails: function(){
      const urlParam = new URLSearchParams(window.location.search);
      this.certSelected = urlParam.get('id');
      var apiPath = '/api/views/cert_detail.php?certId='.concat(this.certSelected);
     fetch(apiPath)
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
