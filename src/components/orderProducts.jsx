const OrderProducts=(props)=>{
    const products= props.products;
  
    return(
      <div className="bg-gray-50">
        <div className="p-4">
          <h3 className="font-bold mb-2 text-left text-red-800">
            Products in this Order:
          </h3>
          <table className="w-full text-sm border border-acsent text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2 flex items-center">Image</th>
              </tr>
              </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.productInfo.productId}>
                      <td className="p-2">{p.productInfo.productId}</td>
                      <td className="p-2">{p.productInfo.name}</td>
                      <td className="p-2">{p.quantity}</td>
                      <td className="p-2">
                        Rs. {p.productInfo.normalPrice.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <img
                          src={p.productInfo.images[0]}
                          alt={p.productInfo.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>          
          </table>
        </div>
      </div>                    
    )
}
export default OrderProducts;