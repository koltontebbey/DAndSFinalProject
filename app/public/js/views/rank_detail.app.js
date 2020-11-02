var app = new Vue({
  el: '#rankDetails',
  data: {
    certList: [],
    rankDetails: [],
    rankSelected: ''
  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches certification details and members with it from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.rankSelected = urlParam.get('id');
      var apiPath = '/api/views/rank_detail.php?rankId='.concat(this.rankSelected);

      // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       this.rankDetails = data['rank_details'][0];
     });
   },
    // function deletes the current certification in the view
    deleteRank: function(){
      var response = confirm("Are you sure you want to delete the "
                              .concat(this.rankDetails['rank_name'], " rank?"));
      // on true call delete API
      if(response){
        var apiPath = '/api/mutate/delete/rank.php';
        var requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'rankId': this.rankSelected})
        };
        fetch(apiPath, requestOptions)
        .then(response => response.json())
        .then(data =>{
          var results = data;
          if(results['status'] === 'ok'){
            alert("The rank "
                  .concat(this.rankDetails['rank_name'], " was deleted."));
            // redirects back to cert search
            var path = 'http://'.concat(window.location.host,
                      '/func/common/search_rank.html');
            window.location.href = path;
          }
        })
      }
    },
    editRank: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '/func/mutate/update/rank.html?id='.concat(this.rankSelected, '&rdir=1');
      path = host.concat(path);
      window.location.href = path;
    }
  }
})
