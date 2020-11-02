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
   },
    // function deletes the current certification in the view
    deleteCert: function(){
      var response = confirm("Are you sure you want to delete the "
                              .concat(this.certDetails['cert_name'], " certification?"));
      // on true call delete API
      if(response){
        var apiPath = '/api/mutate/delete/cert.php';
        var requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'certId': this.certSelected})
        };
        fetch(apiPath, requestOptions)
        .then(response => response.json())
        .then(data =>{
          var results = data;
          if(results['status'] === 'ok'){
            alert("The certification "
                  .concat(this.certDetails['cert_name'], " was deleted."));
            // redirects back to cert search
            var path = 'http://'.concat(window.location.host,
                      '/func/common/search_mbr_cert.html?type=cert');
            window.location.href = path;
          }
        })
      }
    },
    editCert: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '/func/mutate/update/cert.html?id='.concat(this.certSelected, '&rdir=1');
      path = host.concat(path);
      window.location.href = path;
    }
  }
})
