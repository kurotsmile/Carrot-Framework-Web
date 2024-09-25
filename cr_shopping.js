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

    page_cart(){
        var html="";
        html+='<div class="row mt-5 mb-5">';
            html+='<div class="col-10">';
                html+=w.nav('Cart');
                html+='<ul class="list-group list-group-numbered">';
                $.each(cr_shopping.cart_data,function(index,c_item){
                    html+='<li class="list-group-item d-flex">';
                        html+='<div class="ms-2 me-auto">';
                            html+='<div class="fw-bold">'+c_item.name+'</div>';
                            html+='<small class="text-muted text-truncate">x 1 product</small>';
                        html+='</div>';
                        html+='<button class="btn btn-dark"><i class="fas fa-trash-alt"></i></button>';
                    html+='</li>';
                });
                html+='</ul>';
            html+='</div>';

            html+='<div class="col-2 text-center">';
                html+='<b class="fs-5">Price</b>';
                html+='<p class="fs-2">$'+cr_shopping.cart_data.length+'</p>';
                html+='<div class="btn btn-dark w-100 m-1 btn-lg" id="btn_shoping_checkout"><i class="fas fa-cart-arrow-down"></i> CheckOut</div>';
                html+='<div class="btn btn-dark w-100 m-1" id="btn_shoping_delete_all"><i class="fas fa-broom"></i> Clear All</div>';
            html+='</div>';
        html+='</div>';
        var emp_page_cart=$(html);
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
            localStorage.setItem("cart_data",JSON.stringify(cr_shopping.cart_data));
            cr.msg("Product added to cart successfully!","Cart","success");
            cr_shopping.update_cart();
        }else{
            cr.msg("The product is already in your cart!","Cart","warning");
        }
    }
}

var cr_shopping=new Carrot_Shopping();