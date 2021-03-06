var app = new Vue({
  el: '#commonSearch',
  data: {
    listContainer: [],
    idContainer:'',
    toggleMbrCert: '',
    mbrOrCert:'',
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
         fetch('/api/common/helper/list_mbr.php', requestOptions)
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
         fetch('/api/common/helper/list_cert.php', requestOptions)
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
      this.selection = i;
      // mbr
      if(this.toggleMbrCert){
        this.selectionId = this.selection.person_id;
      }
      // cert
      else{
        this.selectionId = this.selection.cert_id;
      }
      this.goNext();
    },

    setId: function(){
      this.selectionId = this.selection['id'];
      this.goNext();
    },

    // redirects to the right view
    goNext: function(){
      const host = 'http://'.concat(window.location.host);
      var path = '';
      // mbr
      if(this.toggleMbrCert){
        path = '/func/views/mbr_detail.html?id='.concat(this.selectionId);
        path = host.concat(path);
      }
      // cert
      else{
        path = '/func/views/cert_detail.html?id='.concat(this.selectionId);
        path = host.concat(path);
      }
      window.location.href = path;
    }

  }
})
