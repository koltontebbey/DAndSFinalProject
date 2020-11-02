var app = new Vue({
  el: '#stationDetails',
  data: {
    certList: [],
    stationDetails: [],
    stationSelected: ''
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches certification details and members with it from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.stationSelected = urlParam.get('id');
      var apiPath = '/api/views/station_detail.php?stationId='.concat(this.stationSelected);

      // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       this.stationDetails = data['station_details'][0];
     });
   },
    // function deletes the current certification in the view
    deleteStation: function(){
      var response = confirm("Are you sure you want to delete the "
                              .concat(this.stationDetails['station_name'], " station?"));
      // on true call delete API
      if(response){
        var apiPath = '/api/mutate/delete/station.php';
        var requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'stationId': this.stationSelected})
        };
        fetch(apiPath, requestOptions)
        .then(response => response.json())
        .then(data =>{
          var results = data;
          if(results['status'] === 'ok'){
            alert("The station "
                  .concat(this.stationDetails['station_name'], " was deleted."));
            // redirects back to cert search
            var path = 'http://'.concat(window.location.host,
                      '/func/common/search_station.html');
            window.location.href = path;
          }
        })
      }
    },
    editStation: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '/func/mutate/update/station.html?id='.concat(this.stationSelected, '&rdir=1');
      path = host.concat(path);
      window.location.href = path;
    }
  }
})
