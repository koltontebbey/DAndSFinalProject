var app = new Vue({
  el: '#udpateRank',
  data: {
    usrInput: [],
    rankId:''
  },
  // calls the fetch function when created to pull data
  created() {
    this.usrInput = this.createBlock();
    this.getCurrentVal();
  },

  methods: {
    // creates json block for data
    createBlock: function(){
      return {
        rank_id:"",
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
      fetch('/api/mutate/update/rank.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Rank has been updated.');
          //data has been added alright, redirect
          const host = 'http://'.concat(window.location.host);
          const urlParam = new URLSearchParams(window.location.search);
          if(urlParam.get('rdir') === '1'){
            var path = '/func/views/rank_detail.html?id='.concat(this.rankId);
            path = host.concat(path);
            window.location.href = path;
          }
          else{
            var path = '/func/mutate/update/rank.html?id='.concat(this.rankId);
            path = host.concat(path);
            window.location.href = path;
          }
        }
      });
    },
    // get rank details
    getCurrentVal: function(){
      var requestOptions = {
        method: 'GET'
      };
      const urlParam = new URLSearchParams(window.location.search);
      this.rankId = urlParam.get('id');
      var apiPath = '/api/mutate/update/pull/rank.php?rankId='.concat(this.rankId);
      fetch(apiPath, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.usrInput = data[0];
      });
    },
  }
})
