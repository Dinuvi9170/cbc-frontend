export const GetCart =()=>{
    let cart= localStorage.getItem("cart");
    if(cart===null){
        cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
    }else{
        cart=JSON.parse(cart);
    }
    return cart
}

export const Addcart=(product,quantity)=>{
    let cart= GetCart();
    let index=cart.findIndex((item)=>{
        return item.productId=== product.productId;
    })
    if(index!==-1){
        const newqty= cart[index].quantity+quantity ||1;
        if(newqty<=0){
            DeleteCart(product.productId);
            return;
        }else{
            cart[index].quantity=newqty;
        }
    }else{
        cart.push({
            productId:product.productId,
            name:product.name, 
            labeledPrice:product.labeledPrice,
            normalPrice:product.normalPrice,
            image:product.images[0],
            quantity:quantity
        });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
}

export const DeleteCart =(productId)=>{
    let cart= GetCart();
    let updateCart= cart.filter((item)=>{
        return item.productId != productId;
    })

    localStorage.setItem("cart",JSON.stringify(updateCart));
    window.dispatchEvent(new Event("cartUpdated"));
}

export const GetTotal =()=>{
    let cart = GetCart();
    let Subtotal =0;
    let Total=0;

    for(let i=0;i<cart.length;i++){
        Subtotal+=(cart[i].labeledPrice*cart[i].quantity);
        Total+=(cart[i].normalPrice*cart[i].quantity);
    }
    let Discount=(Subtotal-Total);
    return {Subtotal,Total,Discount};
}



