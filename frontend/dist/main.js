(()=>{"use strict";const e=()=>localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],n=e=>{localStorage.setItem("cartItems",JSON.stringify(e))},t=({_id:e="",name:n="",email:t="",token:a="",isAdmin:i=!1})=>{localStorage.setItem("userInfo",JSON.stringify({_id:e,name:n,email:t,token:a,isAdmin:i}))},a=()=>localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{},i=()=>localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{address:"",country:"",postalCode:"",city:""},r=()=>{const{name:e}=a();return`\n      <div class="brand">\n        <a href="/#/"><h2>Amazon</h2></a>\n      </div>\n      <nav class="nav">\n        <a href="/#/cart"><i class="fas fa-shopping-cart fa-lg"></i></a>\n        ${e?`<a href='/#/profile'>${e}</a>`:'<a href="/#/signin">Sign In</a>'}\n        \n      </nav>\n        `},s=()=>{},o=async e=>{try{const n=await fetch("/api/products/"+e,{headers:{"content-type":"application/json"}});if(!n||!n.ok)throw new Error("Cannot Fetch Data");return await n.json()}catch(e){return console.log(e.message),{error:e.message}}},d=()=>{const e=document.location.hash.toLowerCase().split("/");return{resource:e[1],id:e[2],verb:e[3]}},l=async e=>{document.getElementById("main").innerHTML=await e.render(),await e.after_render()},c=()=>{document.getElementById("loading-overlay").classList.add("active")},m=()=>{document.getElementById("loading-overlay").classList.remove("active")},p=(e,n)=>{document.getElementById("message-overlay").innerHTML=`\n    <div>\n      <div id = 'message-overlay-content'>${e}</div>\n      <button id="message-overlay-close-button" class='ok-button'>OK</button>\n    </div>\n  `,document.getElementById("message-overlay").classList.add("active"),document.getElementById("message-overlay-close-button").addEventListener("click",(()=>{document.getElementById("message-overlay").classList.remove("active"),n&&n()}))},u=()=>{0!==e().length?document.location.hash="/shipping":document.location.hash="/"},v=(t,a=!1)=>{let i=e();const r=i.find((e=>e.product_id===t.product_id));r?a&&(i=i.map((e=>e.product_id===r.product_id?t:e))):i=[...i,t],n(i),a&&l(h)},h={after_render:()=>{const t=document.getElementsByClassName("qty");Array.from(t).forEach((n=>{n.addEventListener("change",(t=>{const a=e().find((e=>e.product_id===n.id));v({...a,qty:Number(t.target.value)},!0)}))}));const a=document.getElementsByClassName("delete-btn");Array.from(a).forEach((t=>{t.addEventListener("click",(()=>{var a;a=t.id,n(e().filter((e=>e.product_id!==a))),a===d().id?document.location.hash="/cart":l(h)}))})),document.getElementById("checkout-btn").addEventListener("click",(()=>{document.location.hash="/signIn"}))},render:async()=>{c();const n=d();if(n.id){const e=await o(n.id);e._id?v({product_id:e._id,name:e.name,image:e.image,price:e.price,count:e.countInStock,qty:1}):console.log("Invalid product ID")}m();const t=e();return`\n    \n      <div class="cart">\n        <div class="cart-items">\n            <ul class='cart-list'>\n                <li>\n                    <h3>Shopping Cart</h3>\n                    <h3>Price</h3>\n                </li>\n                ${0===t.length?'<h3 style="color:red;text-align:center">No Items in Cart</h3>':t.map((e=>`\n                <li class='cart-item-container'>\n                    <div class='cart-item'>\n                        <div class="product-image-sm">\n                            <img src="${e.image}" alt="${e.name}">\n                        </div> \n                        <div class ="item-detail">\n                            <p>${e.name}</p>\n                            <div>\n                                <span>Qty :</span>\n                                <select name="qty" class='qty' id="${e.product_id}">\n                                    ${[...Array(e.count).keys()].map((n=>e.qty===n+1?`<option selected value='${n+1}'>${n+1}</option>`:`<option  value='${n+1}'>${n+1}</option>`))}\n                                </select>\n                                <button class='delete-btn' id="${e.product_id}"><i class="fas fa-trash fa-lg" ></i></button>\n                            </div>\n                        </div>\n                    </div> \n                    <div class='cart-item-price'>\n                        $${e.price}\n                    </div>\n                 </li>\n                `)).join("\n")}                \n            </ul>\n        </div>\n        ${0===t.length?"":`\n        <div class="subtotal-container">\n            <div class="subtotal">\n                <h2>Subtotal (${t.reduce(((e,n)=>e+n.qty),0)}) : $${t.reduce(((e,n)=>e+n.price*n.qty),0)}\n                </h2>\n                <button id ="checkout-btn"class='proceed-to-checkout'>Proceed to Checkout</button>\n            </div>\n        </div>\n        `}\n        \n    </div>`}},y={render:()=>"<h1>Oops!! This page is not Valid :P</h1>"},g=e=>e.value?`\n      <div class='rating'>\n          <i class='${e.value>=1?"fas fa-star":e.value>=.5?"fas fa-star-half-alt":"fas fa-star-alt"}'></i>\n          <i class='${e.value>=2?"fas fa-star":e.value>=1.5?"fas fa-star-half-alt":"fas fa-star-alt"}'></i>\n          <i class='${e.value>=3?"fas fa-star":e.value>=2.5?"fas fa-star-half-alt":"fas fa-star-alt"}'></i>\n          <i class='${e.value>=4?"fas fa-star":e.value>=3.5?"fas fa-star-half-alt":"fas fa-star-alt"}'></i>\n          <i class='${e.value>=5?"fas fa-star":e.value>=4.5?"fas fa-star-half-alt":"fas fa-star-alt"}'></i>\n        <span>${e.text}</span>\n      </div>\n        `:"<div></div>",f=e=>`\n        <div class="checkout-steps">\n            <div class='${e.step1?"active":""}'>SignIn</div>\n            <div class='${e.step2?"active":""}'>Shipping</div>\n            <div class='${e.step3?"active":""}'>Place Order</div>\n        </div>\n      `,$=()=>{const n=e();0===n.length&&(document.location.hash="/cart");const t=i();t.address||(document.location.hash="/shipping");const a=localStorage.getItem("payment")?JSON.parse(localStorage.getItem("payment")):{paymentMethod:"paypal"};a.paymentMethod||(document.location.hash="/payment");const r=n.reduce(((e,n)=>e+n.price*n.qty),0),s=r>100?0:10,o=Math.round(.15*r);return{orderItems:n,shipping:t,payment:a,itemPrice:r,shippingPrice:s,tax:o,totalPrice:r+s+o}},b=(e,n)=>{window.paypal.Button.render({env:"sandbox",client:{sandbox:e,production:""},locale:"en_US",style:{size:"responsive",color:"gold",shape:"pill"},commit:!0,payment:(e,t)=>t.payment.create({transactions:[{amount:{total:n,currency:"USD"}}]}),onAuthorize:(e,n)=>n.payment.execute().then((async()=>{c(),await(async(e,n)=>{try{const{token:t}=a(),i=await fetch(`/api/orders/${e}/pay`,{method:"PUT",headers:{"content-type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)});if(!i||!i.ok)throw new Error(i.statusText);return await i.json()}catch(e){return console.log(e.message),{error:e.message}}})(d().id,{orderID:e.orderID,payerID:e.payerID,paymentID:e.paymentID}),m(),p("Payment was Successful",(()=>{l(w)}))}))},"#paypal-button").then((()=>{m()}))},w={after_render:async()=>{},render:async()=>{const e=d(),{_id:n,orderItems:t,shipping:i,payment:r,itemPrice:s,shippingPrice:o,tax:l,totalPrice:p,isDelivered:u,isPaid:v,deliveredAt:h,paidAt:y}=await(async e=>{try{const{token:n}=a(),t=await fetch(`/api/orders/${e}`,{headers:{"content-type":"application/json",Authorization:`Bearer ${n}`}});if(!t||!t.ok)throw new Error(t.statusText);return await t.json()}catch(e){return console.log(e.message),{error:e.message}}})(e.id);return v||(async e=>{const n=await(async()=>{try{const e=await fetch("/api/paypal/clientId",{headers:{"content-type":"application/json"}});if(!e||!e.ok)throw new Error(e.statusText);return(await e.json()).clientId}catch(e){return console.log(e.message),{error:e.message}}})();if(c(),window.paypal)b(n,e);else{const t=document.createElement("script");t.type="text/javascript",t.src="https://www.paypalobjects.com/api/checkout.js",t.async=!0,t.onLoad=()=>b(n,e),document.body.appendChild(t)}m()})(p),`\n    <div>\n    <h2>Order : ${n}</h2>\n        <div class='order'>\n            <div class="order-info">\n                <div>\n                    <h3>Shipping</h3>\n                    <div>${i.address},\n                        ${i.city} -\n                        ${i.postalCode},\n                        ${i.country}\n                    </div>\n                    ${u?`<div class="success">Delivered at ${h}</div>`:'<div class="error">Not Delivered</div>'}\n                </div>\n                <div>\n                    <h3>Payment</h3>\n                    <div>Payment Method: ${r.paymentMethod}</div>\n                    ${v?`<div class="success">Paid at ${y}</div>`:'<div class="error">Not Paid</div>'}\n                </div>\n                <div class="cart-items">\n                    <ul class='cart-list'>\n                        <li>\n                            <h3>Shopping Cart</h3>\n                            <h3>Price</h3>\n                        </li>\n                        ${t.map((e=>`\n                        <li class='cart-item-container'>\n                            <div class='cart-item'>\n                                <div class="product-image-sm">\n                                    <img src="${e.image}" alt="${e.name}">\n                                </div> \n                                <div class ="item-detail">\n                                    <p>${e.name}</p>\n                                    <div>\n                                        <span>Qty :${e.qty}</span>\n                                    </div>\n                                </div>\n                            </div> \n                            <div class='cart-item-price'>\n                                $${e.price}\n                            </div>\n                        </li>\n                        `)).join("\n")}                \n                    </ul>\n                </div>\n            </div>\n            <div class="order-action">\n                <ul>\n                    <li>\n                        <h2>Order Summary</h2>\n                    </li>\n                    <li><div>Items</div><div>$${s}</div></li>\n                    <li><div>Shipping</div><div>$${o}</div></li>\n                    <li><div>Tax</div><div>$${l}</div></li>\n                    <li class="total"><div >Total</div><div>$${p}</div></li>\n                    <li><div class="fw"id="paypal-button"></div></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    `}},I={"/":{render:async()=>{c();const e=await fetch("/api/products",{headers:{"content-type":"application/json"}});return m(),e&&e.ok?`\n        <ul class='products'>\n        ${(await e.json()).map((e=>`\n        <li>\n            <div class="product">\n              <div class="product-image">\n                <a href="/#/product/${e._id}">\n                  <img src="${e.image}" alt="${e.name}"\n                /></a>\n              </div>\n              <div class="product-info">\n                <div class="product-title">\n                  <a href="/#/product/${e._id}">${e.name}</a>\n                </div>\n                <div class='product-rating'>\n                ${g({value:e.rating,text:e.numReviews+" reviews"})}\n                </div>\n                <div class="product-brand">${e.brand}</div>\n                <div class="product-price">$${e.price}</div>\n              </div>\n            </div>\n        </li>`)).join("\n")}</ul>`:"<div>Error in Getting Data</div>"}},"/product/:id":{after_render:()=>{const e=d();document.getElementById("add-to-cart").addEventListener("click",(()=>{document.location.hash=`/cart/${e.id}`}))},render:async()=>{c();const e=d(),n=await o(e.id);return n.error?`<div>${n.error}</div>`:(m(),`\n    <div class='back-link'>\n      <a href="/#/"><i class="fas fa-arrow-left"></i> Back</a>\n    </div>\n    <div class="product-container">\n      <div class="product-image">\n        <img src='${n.image}' alt='${n.name}'>\n      </div>\n      <div class="product-details">\n        <div class="product-title">\n          <a href="/#/product/${n._id}">${n.name}</a>\n        </div>\n        <div class='product-rating'>\n          ${g({value:n.rating,text:n.numReviews+" reviews"})}\n        </div>\n        <div class="product-brand">${n.brand}</div>\n        <div class="product-price">$${n.price}</div>\n        <div class="product-status">${n.countInStock>0?'<p class="success">In-stock</p>':'<p class="error">Out of Stock</p>'}</div>\n        <button id="add-to-cart"class='add-to-cart ${n.countInStock>0?"enabled":"disabled"}' ${n.countInStock>0?"":"disabled"}>Add To Cart</button>\n      </div>\n    </div>`)}},"/cart/:id":h,"/cart":h,"/signin":{after_render:()=>{document.getElementById("signin-form").addEventListener("submit",(async e=>{e.preventDefault(),c();const n=await(async({email:e,password:n})=>{try{const t=await fetch("/api/users/signin",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:e,password:n})});if(!t||!t.ok)throw new Error(t.statusText+", Invalid username or Password");return await t.json()}catch(e){return console.log(e.message),{error:e.message}}})({email:document.getElementById("email").value,password:document.getElementById("password").value});m(),n.error?p(n.error):(t(n),u())}))},render:()=>(a().name&&u(),"\n            <div class=\"form-container\">\n                <form id=\"signin-form\">\n                    <ul class='form-items'>\n                        <li>\n                            <h2>Sign-In Form</h2>\n                        </li>          \n                        <li>\n                            <label for='email'>Email:</label>\n                            <input type='email' name='email' id='email'>\n                        </li> \n                        <li>\n                            <label for='password'>Password:</label>\n                            <input type='password' name='password' id='password'>\n                        </li> \n                        <li>\n                            <button type=\"submit\" class=\"signin-button\">Sign In</button>\n                        </li>\n                        <li>\n                            <div>\n                                New User? <a href='/#/register'>Create Account</a>\n                            </div>\n                        </li>        \n                    </ul>\n                </form>\n            </div>\n        ")},"/register":{after_render:()=>{document.getElementById("register-form").addEventListener("submit",(async e=>{e.preventDefault(),c();const n=await(async({name:e,email:n,password:t})=>{try{const a=await fetch("/api/users/register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:e,email:n,password:t})});if(!a||!a.ok)throw new Error(a.statusText);return await a.json()}catch(e){return console.log(e.message),{error:e.message}}})({name:document.getElementById("name").value,email:document.getElementById("email").value,password:document.getElementById("password").value});m(),n.error?p(n.error):(t(n),u())}))},render:()=>(a().name&&u(),"\n            <div class=\"form-container\">\n                <form id=\"register-form\">\n                    <ul class='form-items'>\n                        <li>\n                            <h2>Register</h2>\n                        </li>\n                        <li>\n                            <label for='name'>Name:</label>\n                            <input type='text' name='name' id='name'>\n                        </li>           \n                        <li>\n                            <label for='email'>Email:</label>\n                            <input type='email' name='email' id='email'>\n                        </li> \n                        <li>\n                            <label for='password'>Password:</label>\n                            <input type='password' name='password' id='password'>\n                        </li> \n                        <li>\n                            <button type=\"submit\" class=\"register-button\">Register</button>\n                        </li>\n                        <li>\n                            <div>\n                                Already have an account? <a href='/#/signin'>Sign-In</a>\n                            </div>\n                        </li>        \n                    </ul>\n                </form>\n            </div>\n        ")},"/profile":{after_render:()=>{document.getElementById("signout-button").addEventListener("click",(()=>{localStorage.removeItem("userInfo"),document.location.hash="/"})),document.getElementById("profile-form").addEventListener("submit",(async e=>{e.preventDefault(),c();const n=await(async({name:e,email:n,password:t})=>{try{const{_id:i,token:r}=a(),s=await fetch("/api/users/"+i,{method:"PUT",headers:{"content-type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify({name:e,email:n,password:t})});if(!s||!s.ok)throw new Error(s.statusText);return await s.json()}catch(e){return console.log(e.message),{error:e.message}}})({name:document.getElementById("name").value,email:document.getElementById("email").value,password:document.getElementById("password").value});m(),n.error?p(n.error):(t(n),document.location.hash="/")}))},render:async()=>{const{name:e,email:n}=a();e||(document.location.hash="/");const t=await(async()=>{try{const{token:e}=a(),n=await fetch("/api/orders/mine",{headers:{"content-type":"application/json",Authorization:`Bearer ${e}`}});if(!n||!n.ok)throw new Error(n.statusText);return await n.json()}catch(e){return console.log(e.message),{error:e.message}}})();return`\n            <div class="profile">\n              <div class="profile-info">\n                <div class="form-container">\n                  <form id="profile-form">\n                    <ul class='form-items'>\n                      <li>\n                          <h2>User Profile</h2>\n                      </li>\n                      <li>\n                          <label for='name'>Name:</label>\n                          <input type='text' name='name' id='name' placeholder="${e}">\n                      </li>           \n                      <li>\n                          <label for='email'>Email:</label>\n                          <input type='email' name='email' id='email' placeholder="${n}">\n                      </li> \n                      <li>\n                          <label for='password'>Password:</label>\n                          <input type='password' name='password' id='password'>\n                      </li> \n                      <li>\n                          <button type="submit" class="register-button">Update</button>\n                      </li>\n                      <li>\n                        <button type = "button"class="signout-button" id="signout-button">Sign Out</button>\n                      </li>       \n                    </ul>\n                  </form>\n                </div>\n              </div>\n              <div class="profile-orders expand">\n              <h2>Order History</h2>\n                <table>\n                  <thead>\n                    <tr>\n                      <th>ORDER ID</th>\n                      <th>DATE</th>\n                      <th>TOTAL</th>\n                      <th>PAID</th>\n                      <th>DELIVERED</th>\n                      <th>ACTIONS</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                  ${0===t.length?"<tr><td colspan='6'>No Orders Found</td></tr>":t.map((e=>`\n                      <tr>\n                        <td>${e._id}</td>\n                        <td>${e.createdAt}</td>\n                        <td>${e.totalPrice}</td>\n                        <td>${e.paidAt||"NO"}</td>\n                        <td>${e.deliveredAt||"NO"}</td>\n                        <td><a href='/#/order/${e._id}'>Details</a></td>\n                      </tr>\n                    `)).join("\n")}\n                  </tbody>\n                </table>\n              </div>\n              <div class="profile-orders reduce">\n              <h2>Order History</h2>\n                <table>\n                  <thead>\n                    <tr>\n                      <th>ORDER ID</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                  ${0===t.length?"<tr><td colspan='6'>No Orders Found</td></tr>":t.map((e=>`\n                      <tr>\n                        <td><a href='/#/order/${e._id}'>${e._id}</a></td>\n                      </tr>\n                    `)).join("\n")}\n                  </tbody>\n                </table>\n              </div>\n            </div>\n            \n        `}},"/shipping":{after_render:()=>{document.getElementById("shipping-form").addEventListener("submit",(async e=>{e.preventDefault(),(({address:e="",country:n="",postalCode:t="",city:a=""})=>{localStorage.setItem("shippingInfo",JSON.stringify({address:e,country:n,postalCode:t,city:a}))})({address:document.getElementById("address").value,country:document.getElementById("country").value,postalCode:document.getElementById("postalCode").value,city:document.getElementById("city").value}),document.location.hash="/placeorder"}))},render:()=>{const{name:e}=a();e||(document.location.hash="/");const{address:n,country:t,postalCode:r,city:s}=i();return`\n      ${f({step1:!0,step2:!0})}\n            <div class="form-container">\n                <form id="shipping-form">\n                    <ul class='form-items'>\n                        <li>\n                            <h2>Shipping Details</h2>\n                        </li>\n                        <li>\n                            <label for='address'>Address:</label>\n                            <input type='text' name='address' id='address' value="${n}">\n                        </li>           \n                        <li>\n                            <label for='country'>Country:</label>\n                            <input type='text' name='country' id='country' value="${t}">\n                        </li>\n                        <li>\n                            <label for='postalCode'>Postal Code:</label>\n                            <input type='text' name='postalCode' id='postalCode' value="${r}">\n                        </li>\n                        <li>\n                            <label for='city'>City:</label>\n                            <input type='text' name='city' id='city' value="${s}">\n                        </li>\n                        <li>\n                            <button type="submit" class="register-button">Continue</button>\n                        </li>     \n                    </ul>\n                </form>\n            </div>\n        `}},"/placeorder":{after_render:async()=>{document.getElementById("placeorder-button").addEventListener("click",(async()=>{const e=$();c();const n=await(async e=>{try{const{token:n}=a(),t=await fetch("/api/orders",{method:"POST",headers:{"content-type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(e)});if(!t||!t.ok)throw new Error(t.statusText);return await t.json()}catch(e){return console.log(e.message),{error:e.message}}})(e);m(),n.error?p(n.error):(localStorage.removeItem("cartItems"),document.location.hash=`/order/${n.order._id}`)}))},render:()=>{const{orderItems:e,shipping:n,payment:t,itemPrice:a,shippingPrice:i,tax:r,totalPrice:s}=$();return`\n    <div>\n        ${f({step1:!0,step2:!0,step3:!0})}\n        <div class='order'>\n            <div class="order-info">\n                <div>\n                    <h3>Shipping</h3>\n                    <div>${n.address},\n                        ${n.city} -\n                        ${n.postalCode},\n                        ${n.country}\n                    </div>\n                </div>\n                <div>\n                    <h3>Payment</h3>\n                    <div>Payment Method: ${t.paymentMethod}</div>\n                </div>\n                <div class="cart-items">\n                    <ul class='cart-list'>\n                        <li>\n                            <h3>Shopping Cart</h3>\n                            <h3>Price</h3>\n                        </li>\n                        ${e.map((e=>`\n                        <li class='cart-item-container'>\n                            <div class='cart-item'>\n                                <div class="product-image-sm">\n                                    <img src="${e.image}" alt="${e.name}">\n                                </div> \n                                <div class ="item-detail">\n                                    <p>${e.name}</p>\n                                    <div>\n                                        <span>Qty :${e.qty}</span>\n                                    </div>\n                                </div>\n                            </div> \n                            <div class='cart-item-price'>\n                                $${e.price}\n                            </div>\n                        </li>\n                        `)).join("\n")}                \n                    </ul>\n                </div>\n            </div>\n            <div class="order-action">\n                <ul>\n                    <li>\n                        <h2>Order Summary</h2>\n                    </li>\n                    <li><div>Items</div><div>$${a}</div></li>\n                    <li><div>Shipping</div><div>$${i}</div></li>\n                    <li><div>Tax</div><div>$${r}</div></li>\n                    <li class="total"><div >Total</div><div>$${s}</div></li>\n                    <li>\n                        <button id = "placeorder-button"class="signin-button">Place Order</button>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    `}},"/order/:id":w},E=async()=>{c();const e=d(),n=(e.resource?`/${e.resource}`:"/")+(e.id?"/:id":"")+(e.verb?`/${e.verb}`:""),t=I[n]?I[n]:y;document.getElementById("header").innerHTML=await r(),await s(),document.getElementById("main").innerHTML=await t.render(),t.after_render&&await t.after_render(),m()};window.addEventListener("load",E),window.addEventListener("hashchange",E)})();