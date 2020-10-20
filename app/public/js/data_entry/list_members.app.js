var app = new Vue({
  el: '#listAllMembers',
  data: {
    mbrList: [],
  },

  created() {
    this.fetchMbrs();
  },

  methods: {
    fetchMbrs: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/data_entry/list_members.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.mbrList = data;
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
