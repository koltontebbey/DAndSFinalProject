var app = new Vue({
  el: '#certDetails',
  data: {
    certList: [],
    certDetails: [],
    mbrsWithCertValid: [],
    mbrsWithCertExp: [],
    certSelected: '',
    expiredViewToggle: false
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches certification details and members with it from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.certSelected = urlParam.get('id');
      var apiPath = '/api/views/cert_detail.php?certId='.concat(this.certSelected);

      // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       // first item in API endpoint is details of the certification
       this.certDetails = data['cert_details'][0];

       // clears lists
       this.mbrsWithCertValid.splice(0, this.mbrsWithCertValid.length);
       this.mbrsWithCertExp.splice(0, this.mbrsWithCertExp.length);

      // iterates, pushes to two lists based on status
       for(i = 0; i < data['members'].length; i++){
         if(data['members'][i]['status'] === 'Expired'){
           this.mbrsWithCertExp.push(data['members'][i]);
         }
         else{
           this.mbrsWithCertValid.push(data['members'][i])
         }
       }

       // unhides expired table if there are any members with expired certs
       if(this.mbrsWithCertExp.length > 0){
         this.expiredViewToggle = true;
       }

     });
    }
  }
})
