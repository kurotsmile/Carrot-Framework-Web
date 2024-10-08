//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>

class Carrot_Realtime_DB{

    db=null;
    firebase=null;
    ref=null;
    set=null;
    onValue=null;

    onLoad(config){
        cr_realtime.db=getDatabase(initializeApp(config));
        cr_realtime.ref=ref;
        cr_realtime.set=set;
        cr_realtime.onValue=onValue;
        cr_realtime.get=get;
        cr_realtime.removedb=removedb;
    }

    add(id_collection,id_doc,data,act_done=null){
        const dbRef = cr_realtime.ref(cr_realtime.db, id_collection+'/'+id_doc);
        cr_realtime.set(dbRef,data)
        .then(() => {
            if(act_done) act_done();
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          console.error("Error writing to database: ", error);
        });
    }

    getData(id_collection,id_doc,act_done,act_fail=null) {
        const userRef = cr_realtime.ref(cr_realtime.db, id_collection+'/'+id_doc);
        cr_realtime.onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          
          if (data) {
            act_done(data);
          } else {
            act_done(null);
            console.log("No data available");
          }
        }, (error) => {
          console.error("Error reading data:", error);
          if(act_fail) act_fail();
        });
    }

    list(id_collection,act_done=null,act_fail=null){
        const usersRef = ref(cr_realtime.db,id_collection);
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          if (data) act_done(cr.convertObjectToArray(data));
        }, (error) => {
          console.error("Error reading data:", error);
          if(act_fail) act_fail();
        });
    }

    list_one(id_collection, act_done = null, act_fail = null) {
      const dataRef = ref(cr_realtime.db, id_collection); // Tham chiếu đến nhánh dữ liệu cần lấy
  
      get(dataRef).then((snapshot) => {
          if (snapshot.exists()) {
              const data = snapshot.val(); // Lấy giá trị của nhánh dữ liệu
              if (act_done) act_done(cr.convertObjectToArray(data)); // Chuyển đổi dữ liệu nếu cần
          } else {
              console.log("No data available");
              if (act_fail) act_fail(); // Xử lý trường hợp không có dữ liệu
          }
      }).catch((error) => {
          console.error("Error reading data:", error);
          if (act_fail) act_fail(); // Xử lý lỗi
      });
  }

    delete(id_collection, id_doc, act_done=null) {
      const dbRef = cr_realtime.ref(cr_realtime.db, id_collection + '/' + id_doc);
      cr_realtime.removedb(dbRef)
      .then(() => {
          if (act_done) act_done();
          console.log("Data removed successfully!");
      })
      .catch((error) => {
          console.error("Error removing data: ", error);
      });
  }
};

var cr_realtime=new Carrot_Realtime_DB();