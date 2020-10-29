var app = new Vue({
  el: '#commonSearch',
  data: {
    listContainer: [],
    idContainer:'',
    toggleMbrCert: '',
    mbrOrCert:'',
    searchTerm:'',
    searchResults: [],
    tableToggle: false,
    noResultsText: false,
    selection: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.onCreateToggle();
  },

  methods: {

    // toggle options on create
    onCreateToggle: function() {
       // get query string params
       const urlTypeParam = new URLSearchParams(window.location.search);
       const searchType = urlTypeParam.get('type');

       // types of searches
       const types = ['members', 'certifications'];

       // sets the toggle and the correct text
       if(searchType === 'mbr'){
         this.toggleMbrCert = true;
         this.mbrOrCert = types[0];

         // calls fetch for the member list
         var requestOptions = {
           method: 'GET'
         }
         fetch('/api/common/list_mbr.php', requestOptions)
         .then(response => response.json())
         .then(data => {
           this.listContainer = data;
         });
       }
       else{
         this.toggleMbrCert = false;
         this.mbrOrCert = types[1];

         // calls fetch for the certification list
         var requestOptions = {
           method: 'GET'
         }
         fetch('/api/common/list_cert.php', requestOptions)
         .then(response => response.json())
         .then(data => {
           this.listContainer = data;
         });
       }
    },

    postSearch: function(){
      var apiPath = '';
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({'searchTerm': this.searchTerm})
      }
      // mbr search
      if(this.toggleMbrCert){
        apiPath = '/api/common/search_mbr.php';
      }
      //cert search
      else{
        apiPath = '/api/common/search_cert.php';
      }
      // fetch
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.searchResults.splice(0, this.searchResults.length);
        // check for no results
        if(data.length === 0){
          this.noResultsText = true;
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
      // mbr
      if(this.toggleMbrCert){
        this.selection = i.person_id;
      }
      // cert
      else{
        this.selection = i.cert_id;
      }

      this.goNext();
    },

    // redirects to the right view
    goNext: function(){
      const hostName = window.location.host;

      console.log(hostName);
    }


  }
})
