var app = new Vue({
  el: '#mbrDetails',
  data: {
    mbrList: [],
    mbrDetails: [],
    allCerts: [],
    mbrValidCerts: [],
    mbrExpiredCerts: [],
    mbrSelected: '',
    expiredViewToggle: false,
    blockInsert: false,
    certList: [],
    certSelected: '',
    date_obt:'',
    exp_date:'',
    stationInsert: false,
    stationAssgn: [],
    stationSelected: '',
    stationList: [],
    stationRemove:false,
    stationSelectedRmv: '',
    certRemove: false,
    certSelectedRmv: ''

  },

  created() {
    this.fetchPageDetails();
  },

  methods: {
    // fetches member details and certifications from API
    fetchPageDetails: function(){
      // gets id from query string to build path to API
      const urlParam = new URLSearchParams(window.location.search);
      this.mbrSelected = urlParam.get('id');
      var apiPath = '/api/views/mbr_detail.php?mbrId='.concat(this.mbrSelected);

     // fetches
     fetch(apiPath)
     .then(response => response.json())
     .then(data => {
       this.allCerts = data['certs'];
       // first item in API endpoint is details of the member
       this.mbrDetails = data['mbr_details'][0];
       this.stationAssgn = data['stations'];

       // clears the lists for certs
       this.mbrValidCerts.splice(0, this.mbrValidCerts.length);
       this.mbrExpiredCerts.splice(0, this.mbrExpiredCerts.length);

       // iterates, pushes to two lists based on status
       for(i = 0; i < data['certs'].length; i++){
         if(data['certs'][i]['status'] === 'Expired'){
           this.mbrExpiredCerts.push(data['certs'][i]);
         }
         else{
           this.mbrValidCerts.push(data['certs'][i]);
         }
       }
       // unhides expired table if there are any expired cert
       if(this.mbrExpiredCerts.length > 0){
         this.expiredViewToggle = true;
       }
       else{
         this.expiredViewToggle = false;
       }
     });

   },
   // function deletes the current certification in the view
   deleteMbr: function(){
     var mbrName = this.mbrDetails['first_name'].concat(" ", this.mbrDetails['last_name']);
     var response = confirm("Are you sure you want to delete "
                             .concat(mbrName, " from the system?"));
     // on true call delete API
     if(response){
       var apiPath = '/api/mutate/delete/mbr.php';
       var requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({'personId': this.mbrSelected})
       };
       fetch(apiPath, requestOptions)
       .then(response => response.json())
       .then(data =>{
         var results = data;
         if(results['status'] === 'ok'){
           alert("The member "
                 .concat(mbrName, " was deleted."));
           // redirects back to mbr search
           var path = 'http://'.concat(window.location.host,
                     '/func/common/search_mbr_cert.html?type=mbr');
           window.location.href = path;
         }
       })
     }
   },
   addCertTrigger: function(){
     this.blockInsert = true;
     this.getCertList();
   },
   getCertList: function(){
     // api path
     var apiPath = '/api/common/helper/list_cert.php';
    // fetches
    fetch(apiPath)
    .then(response => response.json())
    .then(data => {
      this.certList = data;
    });
  },
   triggerCancel: function(){
    this.blockInsert = false;
    this.certSelected = '';
    this.date_obt = '';
    this.exp_date = '';
   },
   addCert: function(){
    if(this.date_obt === ''){
      alert('Add an obtained date');
    }
    else{
      var dataToInsert = {
        'cert_id': this.certSelected,
        'person_id': this.mbrSelected,
        'date_obt': this.date_obt
      }
      if(this.exp_date === ''){
        this.exp_date = null;
      }
      else{
        dataToInsert['exp_date'] = this.exp_date;
      }
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToInsert)
      };
      fetch('/api/mutate/add/cert_assoc.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data['status'] === 'ok'){
          alert('Certification has been added.');
          this.blockInsert = false;
          this.certSelected = '';
          this.date_obt = '';
          this.exp_date = '';
          this.fetchPageDetails();
          }
          else{
            console.log(data)
          }
        });
     }
   },
   getStationList: function(){
     // api path
     var apiPath = '/api/common/helper/stations.php';
    // fetches
    fetch(apiPath)
    .then(response => response.json())
    .then(data => {
      this.stationList = data;
    });
   },
   addStationTrigger: function(){
     this.stationInsert = true;
     this.getStationList();
   },
   addStation: function(){
     if(this.stationSelected === ''){
       alert("Select a station.");
     }
     else{
       var dataToInsert = {
         'person_id': this.mbrSelected,
         'station_id': this.stationSelected
       }
       var requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(dataToInsert)
       };
       fetch('/api/mutate/add/station_assoc.php', requestOptions)
       .then(response => response.json())
       .then(data => {
         if(data['status'] === 'ok'){
           alert('Station has been added.');
           this.stationInsert = false;
           this.stationSelected = '';
           this.fetchPageDetails();
           }
           else{
             console.log(data)
           }
         });
     }

   },
   triggerCancelStation: function(){
     this.stationSelected = '';
     this.stationInsert = false;
   },
   updateRedir: function(){
     const host = 'http://'.concat(window.location.host);
     var path = '/func/mutate/update/mbr.html?id='.concat(this.mbrSelected,"&dt=yes");
     path = host.concat(path);
     window.location.href = path;
   },
   removeStationTrigger: function(){
     this.stationRemove = true;
   },
   removeStationGo: function(){
     var dataToInsert = {
       'person_id': this.mbrSelected,
       'station_id': this.stationSelectedRmv
     }
     var requestOptions = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(dataToInsert)
     };
     fetch('/api/mutate/delete/station_assoc.php', requestOptions)
     .then(response => response.json())
     .then(data => {
       if(data['status'] === 'ok'){
         alert('Station has been deleted.');
         this.triggerCancelStationRmv();
         this.fetchPageDetails();
         }
         else{
           console.log(data)
         }
       });
   },
   triggerCancelStationRmv: function(){
     this.stationRemove = false;
     this.stationSelectedRmv = '';
   },
   removeCertTrigger: function(){
     this.certRemove = true;
   },
   removeCertGo: function(){
     var dataToInsert = {
       'person_id': this.mbrSelected,
       'cert_id': this.certSelectedRmv
     }
     var requestOptions = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(dataToInsert)
     };
     fetch('/api/mutate/delete/cert_assoc.php', requestOptions)
     .then(response => response.json())
     .then(data => {
       if(data['status'] === 'ok'){
         alert('Certification has been deleted.');
         this.triggerCancelCertRmv();
         this.fetchPageDetails();
         }
         else{
           console.log(data)
         }
       });
   },
   triggerCancelCertRmv: function(){
       this.certRemove = false;
       this.certSelectedRmv = '';
   }
  }
})
