var app = new Vue({
  el: '#mbrDetails',
  data: {
    mbrList: [],
    mbrDetails: [],
    mbrValidCerts: [],
    mbrExpiredCerts: [],
    mbrSelected: '',
    expiredViewToggle: false
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches member details and certifications from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.mbrSelected = urlParam.get('id');
      var apiPath = '/api/views/mbr_detail.php?mbrId='.concat(this.mbrSelected);

     // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       // first item in API endpoint is details of the member
       this.mbrDetails = data['mbr_details'][0];

       // clears the lists for certs
       this.mbrValidCerts.splice(0, this.mbrValidCerts.length);
       this.mbrExpiredCerts.splice(0, this.mbrExpiredCerts.length);

       // iterates, pushes to two lists based on status
       for(i = 0; i < data['certs'].length; i++){
         if(data['certs'][i]['status'] === 'Expired'){
           this.mbrExpiredCerts.push(data['certs'][i]);
         }
         else{
           this.mbrValidCerts.push(data['certs'][i]);
         }
       }

       // unhides expired table if there are any expired cert
       if(this.mbrExpiredCerts.length > 0){
         this.expiredViewToggle = true;
       }
     });
    }
  }
})
