//Front End
class Carrot_Shopping{
    paypal_api_key="";
    paypal_api_scenrest="";
    cart_data=[];
    emp_cart_menu=null;

    onLoad(id_emp_cart_menu=null){
        if(localStorage.getItem("cart_data")) cr_shopping.cart_data=JSON.parse(localStorage.getItem("cart_data"));
        if(id_emp_cart_menu) cr_shopping.emp_cart_menu=id_emp_cart_menu;
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
        var Total_price=0;
        $.each(cr_shopping.cart_data,function(index,c_item){
            Total_price+=parseFloat(c_item.price);
            $(emp_page_cart).find("#cr_list_all_item_cart").append(cr_shopping.cart_item(c_item));
        });

        $(emp_page_cart).find("#cr_cart_total_price").html(Total_price.toFixed(2));

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
}

var cr_shopping=new Carrot_Shopping();