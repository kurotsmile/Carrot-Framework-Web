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
                if(act_done){
                    var obj_data=cr_firestore.convertFromFirestoreFormat(response.fields);
                    obj_data["id_doc"]=response.name.split("/").pop();
                    act_done(obj_data);
                }
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
                if(data.documents){
                    for(var i=0;i<data.documents.length;i++){
                        var obj_data=cr_firestore.convertFromFirestoreFormat(data.documents[i].fields);
                        obj_data["id_doc"]=data.documents[i].name.split("/").pop();
                        list.push(obj_data);
                    }
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
        html+='<input type="file" class="form-control" id="fileInput" aria-describedby="act_upload_btn" aria-label="Upload">';
        html+='<div class="w-100 mt-3 text-muted"><i class="fas fa-info-circle"></i> Click the <kbd>Start Upload</kbd> button once you have selected the file to upload.</div>';
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
                          cr_firestore.add(response,'file');
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


class Firestore_Query{
    
    collections=[];
    select_fields=[];
    filters_search=[];
    limit=-1;
    orderBy=[];

    constructor(collection){
        var coll={};
        coll["collectionId"]=collection;
        this.collections.push(coll);
    }

    add_select(name_field){
        var field={};
        field["fieldPath"]=name_field;
        this.select_fields.push(field);
    }

    add_where(field_name,searchValue,op="EQUAL"){
        var Filter={};
        var fieldFilter={};
        var f={};
        var v={};
        f["fieldPath"]=field_name;
        v["stringValue"]=searchValue;
        fieldFilter["field"]=f;
        fieldFilter["op"]=op;
        fieldFilter["value"]=v;
        Filter["fieldFilter"]=fieldFilter;
        this.filters_search.push(Filter);
    }

    set_order(field_name,direction_val='ASCENDING'){ //'DESCENDING'
      this.orderBy=[{ field: { fieldPath: field_name }, direction: direction_val }];
    } 

    set_limit(count){
        this.limit=count;
    }

    toJson(){
        var query={};
        var structuredQuery={};
        if(this.select_fields.length>0) structuredQuery["select"]={fields: this.select_fields};
        structuredQuery["from"]=this.collections;
        structuredQuery["where"]={compositeFilter: {op: 'AND',filters: this.filters_search}};
        if(this.limit!=-1) structuredQuery["limit"]=this.limit;
        if(this.orderBy.length>0) structuredQuery["orderBy"]=this.orderBy;
        query["structuredQuery"]=structuredQuery;
        return JSON.stringify(query);
    }

    get_data(act_done,act_fail=null){
        fetch('https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents:runQuery', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: this.toJson()
        }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            var list=[];
            if(data.length>0){
                for(var i=0;i<data.length;i++){
                    var obj_data=cr_firestore.convertFromFirestoreFormat(data[i].document.fields);
                    obj_data["id_doc"]=data[i].document.name.split("/").pop();
                    list.push(obj_data);
                }
            }
            if(act_done) act_done(list);
        }).catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            if(act_fail!=null) act_fail();
        });
    }
}
