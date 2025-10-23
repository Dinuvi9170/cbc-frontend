export const GetCart =()=>{
    let cart= JSON.parse(localStorage.getItem("cart"));
    if(cart===null){
        cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart
}

export const Addcart=(product,quantity)=>{
    let cart= GetCart();
    let index=cart.findIndex((item)=>{
        return item.productId=== product.productId;
    })
    if(index!==-1){
        const newqty= cart[index].quantity+quantity;
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
}

export const DeleteCart =(productId)=>{
    let cart= GetCart();
    let updateCart= cart.filter((item)=>{
        return item.productId != productId;
    })

    localStorage.setItem("cart",JSON.stringify(updateCart));
}



