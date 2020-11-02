var app = new Vue({
  el: '#stationSearch',
  data: {
    listContainer: [],
    idContainer:'',
    searchTerm:'',
    searchTermStatic:'',
    searchResults: [],
    tableToggle: false,
    noResultsText: false,
    selection: '',
    selectionId: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.onCreateToggle();
  },

  methods: {

    // toggle options on create
    onCreateToggle: function() {
         // calls fetch for the member list
         var requestOptions = {
           method: 'GET'
         }
         fetch('/api/common/helper/stations.php', requestOptions)
         .then(response => response.json())
         .then(data => {
           this.listContainer = data;
         });

    },

    postSearch: function(){
      var apiPath = '/api/common/search_station.php';
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({'searchTerm': this.searchTerm})
      }
      // fetch
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.searchResults.splice(0, this.searchResults.length);
        // check for no results
        if(data.length === 0){
          this.searchTermStatic = (' ' + this.searchTerm).slice(1);
          this.noResultsText = true;
          this.tableToggle = false;
        }
        else{
          for(i = 0; i < data.length; i++){
            this.searchResults.push(data[i]);
          }
          this.noResultsText = false;
          this.tableToggle = true;
        }
      });
    },

    // handles click events on search table
    tableOnClickHandler: function(i){
      this.selection = i
      this.selectionId = this.selection.station_id;
      this.goNext();
    },

    setId: function(){
      this.selectionId = this.selection['id'];
      this.goNext();
    },

    // redirects to the right view
    goNext: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '/func/views/station_detail.html?id='.concat(this.selectionId);
      window.location.href = path;
    }

  }
})
