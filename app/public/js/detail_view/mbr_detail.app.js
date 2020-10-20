var app = new Vue({
  el: '#mbrDetails',
  data: {
    mbrList: [],
    mbrDetails: [],
    mbrCerts: [],
    mbrSelected: ''
  },

  created() {
    this.fetchMbrList();
  },

  methods: {
    fetchMbrList: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/detail_view/member/member_helper.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.mbrList = data;
      });
    },
    fetchPageDetails: function(){
      var params = [['mbrId', this.mbrSelected['id']]];
      var queryStr = new URLSearchParams(params).toString();
     fetch('/api/detail_view/member/mbr_details.php?'.concat(queryStr))
     .then(response => response.json())
     .then(data => {
       this.mbrDetails = data['mbr_details'][0];
       this.mbrCerts.splice(0, this.mbrCerts.length);
       for(i = 0; i < data['certs'].length; i++){
         this.mbrCerts.push(data['certs'][i]);
       }
     });
    }
  }
})
