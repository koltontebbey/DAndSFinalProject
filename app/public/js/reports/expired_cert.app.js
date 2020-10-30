var app = new Vue({
  el: '#expiredCert',
  data: {
    reportList: [],
    uniqueCerts: '',
    filterResults: [],
    certSelection: ''
  },
  // calls the fetch function when created to pull data
  created() {
    this.fetchExpCert();
  },

  methods: {
    // pulls data from list_all_cert.php
    fetchExpCert: function() {
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api/reports/expired_cert.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.reportList = data;

        // acc for cert names
        var temp = [];

        for(i = 0; i < this.reportList.length; i++){
          if(this.reportList[i]['is_active'] === 0){
            this.reportList[i]['is_active'] = "No";
          }
          else{
            this.reportList[i]['is_active'] = "Yes";
          }
          temp.push(this.reportList[i]['cert_name']);
          this.filterResults.push(this.reportList[i]);
        }
        this.uniqueCerts = Array.from(new Set(temp));
      });
    },

    // filter certifications
    filterCerts: function(){
      this.filterResults.splice(0, this.filterResults.length);
      for(i = 0; i < this.reportList.length; i++){
        if((this.reportList[i]['cert_name'] === this.certSelection) ||
            (this.certSelection === 'all_certs')){
          this.filterResults.push(this.reportList[i]);
        }
      }
    }
  }
})
