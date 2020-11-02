var app = new Vue({
  el: '#addRank',
  data: {
    usrInput: [],
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
        rank_name: "",
        rank_description: ""
      }
    },
    // posts the data to api endpoint
    postAdd: function() {
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.usrInput)
      };
      fetch('/api/mutate/add/rank.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('New rank has been added.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          var path = '/func/mutate/add/rank.html';
          path = host.concat(path);
          window.location.href = path;
        }
      });
    }
  }
})
