class CR_FireStore{
    id_project="";
    api_key="";

    add(data_document,collection,act_done=null,act_fail=null){
        var firestoreUrl = 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/?key='+cr_firestore.api_key;
            var data={};
            data["fields"]=cr_firestore.convertToFirestoreFormat(data_document);
            $.ajax({
                url: firestoreUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: function(response) {
                    if(act_done)act_done();
                    console.log('Document added successfully:', response);
                },
                error: function(error) {
                    if(act_fail) act_fail();
                    console.error('Error adding document:', error);
                }
            });
    }

    get(collection,document,act_done=null,act_fail=null){
        $.ajax({
            url:'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/'+document+'/?key='+cr_firestore.api_key,
            type: 'GET',
            success: function(response) {
                if(act_done) act_done(cr_firestore.convertFromFirestoreFormat(response.fields));
                console.log("Dữ liệu document từ Firestore:", response);
            },
            error: function(error) {
                if(act_fail) act_fail();
                console.error("Lỗi khi lấy document:", error);
            }
        });
    }

    delete(collection,document,act_done=null,act_fail=null){
        $.ajax({
            url:'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/'+document+'/?key='+cr_firestore.api_key,
            type: 'DELETE',
            success: function(response) {
                if(act_done) act_done();
                console.log("Document đã bị xóa thành công:", response);
            },
            error: function(error) {
                if(act_fail) act_fail();
                console.error("Lỗi khi xóa document:", error);
            }
        });
    }

    set(data_document,collection,document,act_done=null,act_fail=null){
        this.update(data_document,collection,document,act_done,act_fail);
    }

    update(data_document,collection,document,act_done=null,act_fail=null){
        var data={};
        data["fields"]=cr_firestore.convertToFirestoreFormat(data_document);
        $.ajax({
            url: 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/'+document+'/?key='+cr_firestore.api_key,
            type: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function(response) {
                if(act_done) act_done();
                console.log("Document đã được cập nhật thành công:", response);
            },
            error: function(error) {
                if(act_fail) act_fail();
                console.error("Lỗi khi cập nhật document:", error);
            }
        });
    }
    
    list(collection,act_done=null,act_fail=null){
        $.ajax({
            url: 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/?key='+cr_firestore.api_key,
            type: 'GET',
            success: function(data) {
                var list=[];
                for(var i=0;i<data.documents.length;i++){
                    var obj_data=cr_firestore.convertFromFirestoreFormat(data.documents[i].fields);
                    obj_data["id_doc"]=data.documents[i].name.split("/").pop();
                    list.push(obj_data);
                }
                if(act_done) act_done(list);
            },
            error: function(error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                if(act_fail) act_fail();
            }
        });
    }

    convertToFirestoreFormat(data) {
        let firestoreData = {};
    
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (typeof value === 'string') {
                    firestoreData[key] = { stringValue: value };
                } else if (typeof value === 'number') {
                    if (Number.isInteger(value)) {
                        firestoreData[key] = { integerValue: value };
                    } else {
                        firestoreData[key] = { doubleValue: value };
                    }
                } else if (typeof value === 'boolean') {
                    firestoreData[key] = { booleanValue: value };
                } else if (value instanceof Date) {
                    firestoreData[key] = { timestampValue: value.toISOString() };
                } else if (Array.isArray(value)) {
                    firestoreData[key] = {
                        arrayValue: {
                            values: value.map(item => convertToFirestoreFormat({ item }).item)
                        }
                    };
                } else if (typeof value === 'object' && value !== null) {
                    firestoreData[key] = {
                        mapValue: {
                            fields: convertToFirestoreFormat(value)
                        }
                    };
                } else if (value === null) {
                    firestoreData[key] = { nullValue: null };
                } else {
                    console.error(`Unsupported data type for Firestore: ${typeof value}`);
                }
            }
        }
    
        return firestoreData;
    }

    convertFromFirestoreFormat(firestoreData) {
        let data = {};
        for (let key in firestoreData) {
            if (firestoreData.hasOwnProperty(key)) {
                let value = firestoreData[key];
    
                if (value.stringValue !== undefined) {
                    data[key] = value.stringValue;
                } else if (value.integerValue !== undefined) {
                    data[key] = parseInt(value.integerValue);
                } else if (value.doubleValue !== undefined) {
                    data[key] = parseFloat(value.doubleValue);
                } else if (value.booleanValue !== undefined) {
                    data[key] = value.booleanValue;
                } else if (value.timestampValue !== undefined) {
                    data[key] = new Date(value.timestampValue);
                } else if (value.arrayValue !== undefined) {
                    data[key] = value.arrayValue.values.map(item => convertFromFirestoreFormat({ item }).item);
                } else if (value.mapValue !== undefined) {
                    data[key] = convertFromFirestoreFormat(value.mapValue.fields);
                } else if (value.nullValue !== undefined) {
                    data[key] = null;
                } else {
                    console.error(`Unsupported Firestore data type for key: ${key}`);
                }
            }
        }
    
        return data;
    }

    upload_file(act_done=null){
        var html='<form id="uploadForm"><input type="file" id="fileInput" /><button type="submit" class="btn btn-success" id="act_upload_btn">Upload</button></form>';
        var html='';
        html+='<div class="input-group mb-3">';
        html+='<button class="btn btn-outline-secondary" type="button" id="act_upload_btn"><i class="fas fa-cloud-upload-alt"></i> Start Upload</button>';
        html+='<input type="file" class="form-control" id="fileInput" aria-describedby="act_upload_btn" aria-label="Upload">'
        html+='</div>';
        
        cr.msg(html,"Upload File",'',()=>{
            $("#act_upload_btn").click(()=>{
                var fileInput = $('#fileInput')[0];
                var file = fileInput.files[0];
                if(file) {
                  var storageUrl = 'https://firebasestorage.googleapis.com/v0/b/'+cr_firestore.id_project+'.appspot.com/o?uploadType=multipart&name=' + encodeURIComponent(file.name);
        
                  var formData = new FormData();
                  formData.append('file', file);
        
                  $.ajax({
                      url: storageUrl,
                      type: 'POST',
                      data: formData,
                      contentType: false,
                      processData: false,
                      headers: {
                          'Authorization': 'Bearer '+cr_firestore.api_key
                      },
                      success: function(response) {
                          console.log('Upload successful', response);
                          if(act_done) act_done(response);
                          cr.msg('Upload successful',"Upload File","success");
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          console.error('Upload failed', textStatus, errorThrown);
                          cr.msg("Upload Faield","Upload File","error");
                      }
                  });
              }else{
                cr.msg("Please Select File","None File","info");
              }
              return false;
            });
        });
        
    }
}

var cr_firestore=new CR_FireStore();
