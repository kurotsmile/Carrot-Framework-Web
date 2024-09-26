//Front End - Shppping
//Required *carrot.js

class Carrot_Shopping{
    paypal_api_key="";
    paypal_api_scenrest="";
    cart_data=[];
    emp_cart_menu=null;
    shipping_price="1";
    tax_price="1"

    Total_price=0;

    onLoad(id_emp_cart_menu=null,api_key="",api_scenrest=""){
        cr_shopping.paypal_api_key=api_key;
        cr_shopping.paypal_api_scenrest=api_scenrest;
        if(localStorage.getItem("cart_data")) cr_shopping.cart_data=JSON.parse(localStorage.getItem("cart_data"));
        if(id_emp_cart_menu) cr_shopping.emp_cart_menu=id_emp_cart_menu;
        if(cr_shopping.paypal_api_key!="") $('head').append('<script src="https://www.paypal.com/sdk/js?client-id='+cr_shopping.paypal_api_key+'&intent=authorize"><\/script>');
    }

    cart_item(data){
        var html="";
        html+='<li class="list-group-item d-flex" data-id="'+data.id_doc+'">';
            html+='<div class="ms-2 me-auto">';
                html+='<div class="fw-bold">'+data.name+'</div>';
                html+='<small class="text-muted text-truncate">x 1 product, Price : <span class="bg-light rounded p-1">$'+parseFloat(data.price).toFixed(2)+'</span></small>';
            html+='</div>';
            html+='<button class="btn btn-dark btn-remove-item"><i class="fas fa-trash-alt"></i></button>';
        html+='</li>';
        var emp_item=$(html);
        $(emp_item).find(".btn-remove-item").click(()=>{
            cr.msg_question("Are you sure you want to remove the product from your cart?","Shopping Cart",()=>{
                var id=$(emp_item).data("id");
                cr_shopping.remove_item_by_id(id);
                if(cr_shopping.cart_data.length<=0){
                    $("#cr_page_cart_content").html(cr_shopping.cart_empty());
                }else{
                    $(emp_item).remove();
                }
            });
        });
        return emp_item;
    }

    page_cart(act_checkout=null){
        var html="";
        html+='<div class="row" id="cr_page_cart_content">';
            if(cr_shopping.cart_data.length>0){
                html+='<div class="col-10">';
                    html+='<ul class="list-group list-group-numbered" id="cr_list_all_item_cart"></ul>';
                html+='</div>';

                html+='<div class="col-2 text-center">';
                    html+='<b class="fs-6">Total product</b>';
                    html+='<p class="fs-2"><i class="fas fa-people-carry"></i> '+cr_shopping.cart_data.length+'</p>';
                    html+='<b class="fs-6">Price</b>';
                    html+='<p class="fs-2"><i class="fas fa-dollar-sign"></i> <span id="cr_cart_total_price">'+cr_shopping.cart_data.length+'</span></p>';
                    html+='<div class="btn btn-dark w-100 m-1 btn-lg" id="btn_shoping_checkout"><i class="fas fa-cart-arrow-down"></i> CheckOut</div>';
                    html+='<div class="btn btn-danger w-100 m-1" id="btn_shoping_delete_all"><i class="fas fa-broom"></i> Clear All</div>';
                html+='</div>';
            }else{
                html+=cr_shopping.cart_empty();
            }
        html+='</div>';
        var emp_page_cart=$(html);
        cr_shopping.Total_price=0;
        $.each(cr_shopping.cart_data,function(index,c_item){
            cr_shopping.Total_price+=parseFloat(c_item.price);
            $(emp_page_cart).find("#cr_list_all_item_cart").append(cr_shopping.cart_item(c_item));
        });

        $(emp_page_cart).find("#cr_cart_total_price").html(cr_shopping.Total_price.toFixed(2));

        $(emp_page_cart).find("#btn_shoping_delete_all").click(()=>{
            cr.msg_question("Are you sure you want to delete all items in your cart?","Shopping cart",()=>{
                cr_shopping.remove_all_item_cart();
            });
        });

        $(emp_page_cart).find("#btn_shoping_checkout").click(()=>{
            if(act_checkout) act_checkout();
        });
        return emp_page_cart;
    }

    page_checkout(content){
        var html_page=$(`
            <div class="row mt-5 mb-5">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>

              <ul class="list-group mb-3" id="cartallitems"></ul>

              <div id="paypal-button-container" class="my-3 w-100">
                <div class="w-100 bg-light rounded p-3"><i class="fas fa-spinner fa-spin"></i> Loading...</div>
              </div>
            </div>
            <div class="col-md-8 order-md-1">${content}</div>
          </div>
        `);
        
        cr_shopping.Total_price=0;
        $.each(cr_shopping.cart_data,function(index,c){
            cr_shopping.Total_price+=parseFloat(c.price);
            $(html_page).find("#cartallitems").append(cr_shopping.checkout_cart_item(c));
        });
        
        $(html_page).find("#cartallitems").append(cr_shopping.checkout_cart_info("Total",cr_shopping.Total_price));
        return html_page;
    }

    checkout_cart_item(data){
        var html=$(`
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">${data.name}</h6>
                    <small class="text-muted text-truncate">1 Product</small>
                  </div>
                  <span class="text-muted">$${parseFloat(data.price).toFixed(2)}</span>
                </li>
            `);
        return html;
    }

    checkout_cart_info(label,price){
        var html=$(`
            <li class="list-group-item d-flex justify-content-between bg-light">
                <span>${label}</span>
                <strong>$${price}</strong>
            </li>
        `);
      return html;
    }

    update_cart(){
        var info_cart=$(cr_shopping.emp_cart_menu).find('#info_cart');
        var count_p=$(cr_shopping.cart_data).length;
        if(info_cart.length>0)
            $(info_cart).html(count_p);
        else
            $(cr_shopping.emp_cart_menu).append(' <span id="info_cart" class="bg-light p-1 rounded">'+count_p+'</span>');
    }

    add_cart(data){
        function check_product(){
            let is_ready=true;
            $.each(cr_shopping.cart_data,function(index,c_item){
                if(c_item.id_doc==data.id_doc){
                    is_ready=false;
                    return false;
                }
            });
            return is_ready;
        }
        if(check_product()){
            cr_shopping.cart_data.push(data);
            cr_shopping.save_cart();
            cr.msg("Product added to cart successfully!","Cart","success");
            cr_shopping.update_cart();
        }else{
            cr.msg("The product is already in your cart!","Cart","warning");
        }
    }

    remove_item_by_id(id_doc){
        let list_carts=[];
        $.each(cr_shopping.cart_data,function(index,data){
            if(data.id_doc!=id_doc) list_carts.push(data);
        });
        cr_shopping.cart_data=list_carts;
        cr_shopping.save_cart();
        cr_shopping.update_cart();
    }

    save_cart(){
        localStorage.setItem("cart_data",JSON.stringify(cr_shopping.cart_data));
    }

    remove_all_item_cart(){
        $("#cr_page_cart_content").html(cr_shopping.cart_empty());
        cr_shopping.cart_data=[];
        cr_shopping.save_cart();
        cr_shopping.update_cart();
    }

    cart_empty(){
        var html='';
        html+='<div class="col-12 text-center"><div class="bg-light p-5 rounded"><b><i class="fas fa-sad-tear fa-lg"></i></b><br/>Cart is empty!</div></div>';
        return html;
    }

    create_btn_checkout(id_emp_btn_paypal="#paypal-button-container"){
        setTimeout(()=>{
            $(id_emp_btn_paypal).empty();
              paypal.Buttons({
                createOrder: function (data, actions) {
                  var allFilled = true;
                  w.error_pay=false;

                  $('input[required]').each(function() {
                    if ($(this).val() === '') {
                      allFilled = false;
                      w.error_pay=true;
                      $(this).css('border', '2px solid red');
                    } else {
                      $(this).css('border', '');
                    }
                  });
    
                  if(allFilled==false){
                    cr.msg("Please fill in all information!","Missing data","warning")
                    return true;
                  }else{
                    let data_bill={};
                    $('input').each(function() {
                        var id_field=$(this).attr("id");
                        data_bill[id_field]=$(this).val();
                    });
                    data_bill["date"]=new Date().toLocaleString();
                    w.data_bill=data_bill;
                    localStorage.setItem("data_bill",JSON.stringify(data_bill));
                  }
                  // Lấy giá trị sản phẩm, phí vận chuyển và thuế từ DOM hoặc tính toán chúng
                  var itemTotal = parseFloat($('#tt_price').html())||1; // Giá trị của sản phẩm
                  var shippingCost = parseFloat(cr_shopping.shipping_price);
                  var taxAmount = parseFloat(cr_shopping.tax_price);
    
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        currency_code: "USD",
                        value: (itemTotal + shippingCost + taxAmount).toFixed(2), // Tổng giá trị đơn hàng bao gồm phí vận chuyển và thuế
                        breakdown: {
                          item_total: {
                            currency_code: "USD",
                            value: itemTotal.toFixed(2) // Giá trị của sản phẩm
                          },
                          shipping: {
                            currency_code: "USD",
                            value: shippingCost.toFixed(2) // Phí vận chuyển
                          },
                          tax_total: {
                            currency_code: "USD",
                            value: taxAmount.toFixed(2) // Thuế
                          }
                        }
                      }
                    }]
                  });
                },
                onApprove: function (data, actions) {
                  return actions.order.authorize().then(function (authorization) {
                    var authorizationID = authorization.purchase_units[0].payments.authorizations[0].id;
                    window.location.href = "index.html?p=done&authorization_id=" + authorizationID;
                  });
                },
                onCancel: function (data) {
                  Swal.fire({
                    icon: 'info',
                    title: 'Payment Cancelled',
                    text: 'You have cancelled the payment.',
                  });
                },
                onError: function (err) {
                  console.log(err);
                  if(w.error_pay==false){
                    Swal.fire({
                      icon: 'error',
                      title: 'Payment Error',
                      text: 'There was an issue with your payment. Please try again.',
                    });
                  }
                }
              }).render(id_emp_btn_paypal);
        },1000);
    }
}

var cr_shopping=new Carrot_Shopping();