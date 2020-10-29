var app = new Vue({
  el: '#listAllMembers',
  data: {
    mbrList: [],
  },

  // calls the fetch function when created to pull data
  created() {
    this.fetchMbrs();
  },

  methods: {
    // pulls data from list_all_mbr.php
    fetchMbrs: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/views/list_all_mbr.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.mbrList = data;
        // loops through the list and assign string values to the bool data for
        // the is_active field
        for(i = 0; i < this.mbrList.length; i++){
          var temp = this.mbrList[i]['is_active'];
          if (temp === 0){
            this.mbrList[i]['is_active'] = 'No';
          }
          else{
            this.mbrList[i]['is_active'] = 'Yes';
          }
        }
      });
    }
  }
})
