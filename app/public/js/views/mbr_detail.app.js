var app = new Vue({
  el: '#mbrDetails',
  data: {
    mbrList: [],
    mbrDetails: [],
    mbrCerts: [],
    mbrSelected: ''
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    fetchPageDetails: function(){
      const urlParam = new URLSearchParams(window.location.search);
      this.mbrSelected = urlParam.get('id');
      var apiPath = '/api/views/mbr_detail.php?mbrId='.concat(this.mbrSelected);
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       this.mbrDetails = data['mbr_details'][0];
       this.mbrCerts.splice(0, this.mbrCerts.length);
       for(i = 0; i < data['certs'].length; i++){
         this.mbrCerts.push(data['certs'][i]);
       }
     });
    }
  }
})
