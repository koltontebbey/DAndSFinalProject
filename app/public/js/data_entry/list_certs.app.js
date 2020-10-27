var app = new Vue({
  el: '#listAllCerts',
  data: {
    certList: [],
  },

  created() {
    this.fetchCerts();
  },

  methods: {
    fetchCerts: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/data_entry/list_certifications.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.certList = data;
      });
    }
  }
})
