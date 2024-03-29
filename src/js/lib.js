export function initAddCartAction() {

    const addCartActionElementList = document.querySelectorAll('[data-add-cart]');
    const addCartShowcaseElementList = document.querySelectorAll('[data-add-cart-showcase]');

    addCartActionElementList.forEach((element) => {
        element.addEventListener('click', handleAddCart);
    })
    addCartShowcaseElementList.forEach((element) => {
        element.addEventListener('click', handleAddCart);
    })

    function handleAddCart(event) {

        event.preventDefault();
        const targetElement = event.currentTarget
        let productId
        if(targetElement.dataset.addCart) {
            productId = parseInt(targetElement.dataset.addCart);
        } else if(targetElement.dataset.addCartShowcase) {
            productId = parseInt(targetElement.dataset.addCartShowcase);
        }
        enableBtnLoading(targetElement);

        let formData = {
            'items': [{
                    'id': productId,
                    'quantity': 1
                }]
        };

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error();
            }
            return res.json()
        })
        .then((data) => {
            updateCartCount()
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            disableBtnLoading(targetElement);
        })

        function enableBtnLoading(element) {
            element.querySelector('[data-add-state="default"]').classList.add('hidden')
            element.querySelector('[data-add-state="loading"]').classList.remove('hidden')
            element.disabled = true
        }
    
        function disableBtnLoading(element) {
            element.querySelector('[data-add-state="loading"]').classList.add('hidden')
            element.querySelector('[data-add-state="success"]').classList.remove('hidden')
            setTimeout(() => {
                element.querySelector('[data-add-state="success"]').classList.add('hidden')
                element.querySelector('[data-add-state="default"]').classList.remove('hidden')
                element.disabled = false
            }, 500);
        }

    }

}

export function updateCartCount() {

    fetch(window.Shopify.routes.root + "cart.js")
    .then((res) => {
        if(!res.ok) {
            throw new Error();
        }
        return res.json()
    })
    .then((data) => {
        handleCartCount(data.item_count)
    })
    .catch((error) => {
        console.error(error)
    })
    .finally(() => {
    })

    function handleCartTotal(total) {
        let currencySymbol = document.querySelector('[data-currency-symbol]').dataset.currencySymbol
        let text = currencySymbol
        if(total === 0) {
            text += total + '.00'
        } else if(total.toString().length === 2) {
            text += '0.' + total
        } else {
            let prefix = total.toString().slice(0,-2)
            let suffix = total.toString().slice(-2)
            text += prefix + '.' + suffix
        }
        text += ' '+window.Shopify.currency.active
        
        const cartTotalElementList = document.querySelectorAll('[data-cart-total]')
        cartTotalElementList.forEach((cartTotalElement) => {
            cartTotalElement.innerText = text
        })
    }

    function handleCartCount(count) {
        let text = ''
        if(count === 1) {
            text = '(1)';
        } else if(count > 1) {
            text = '('+count+')'
        }
        
        const cartCountElementList = document.querySelectorAll('[data-cart-count]')
        cartCountElementList.forEach((cartCountElement) => {
            if(cartCountElement.dataset.cartCount === 'full') {
                cartCountElement.innerText = text
            } else if(cartCountElement.dataset.cartCount === 'short') {
                cartCountElement.innerText = count
            }
        })
    }

}