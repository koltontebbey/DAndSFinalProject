var app = new Vue({
  el: '#agencyDetails',
  data: {
    certList: [],
    agencyDetails: [],
    agencySelected: ''
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches certification details and members with it from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.agencySelected = urlParam.get('id');
      var apiPath = '/api/views/agency_detail.php?agencyId='.concat(this.agencySelected);

      // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       this.agencyDetails = data['agency_details'][0];
     });
   },
    // function deletes the current certification in the view
    deleteAgency: function(){
      var response = confirm("Are you sure you want to delete the "
                              .concat(this.agencyDetails['agency_name'], " agency?"));
      // on true call delete API
      if(response){
        var apiPath = '/api/mutate/delete/agency.php';
        var requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'agencyId': this.agencySelected})
        };
        fetch(apiPath, requestOptions)
        .then(response => response.json())
        .then(data =>{
          var results = data;
          if(results['status'] === 'ok'){
            alert("The agency "
                  .concat(this.agencyDetails['agency_name'], " was deleted."));
            // redirects back to cert search
            var path = 'http://'.concat(window.location.host,
                      '/func/common/search_agency.html');
            window.location.href = path;
          }
        })
      }
    },
    editAgency: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '/func/mutate/update/agency.html?id='.concat(this.agencySelected, '&rdir=1');
      path = host.concat(path);
      window.location.href = path;
    }
  }
})
