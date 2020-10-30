var app = new Vue({
  el: '#listAllCerts',
  data: {
    certList: [],
  },
  // calls the fetch function when created to pull data
  created() {
    this.fetchCerts();
  },

  methods: {
    // pulls data from list_all_cert.php
    fetchCerts: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/views/list_all_cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.certList = data;
      });
    }
  }
})
