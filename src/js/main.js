import { initAddCartAction } from "./lib";
import { updateCartCount } from "./lib";

window.addEventListener('DOMContentLoaded', (event) => {
    initShopMenu();
    initSecurePopover();
    initCartDrawer();
});

function initShopMenu() {
    const shopMenuOverlayElement = document.querySelector(`#main-shop-menu-overlay`)
    const shopMenuElement = document.querySelector(`#main-shop-menu`)
    const shopButtonElement = document.querySelector(`#main-shop-button`)
    if (!shopMenuElement || !shopButtonElement || !shopMenuOverlayElement) {
        return
    }

    let scrollPosition = 0
    let isMenuOpen = false
    
    shopButtonElement.addEventListener(`click`, (event) => {
        event.preventDefault()
        handleMenu()
    })
    shopMenuOverlayElement.addEventListener(`click`, (event) => {
        event.preventDefault()
        handleMenu()
    })
    
    function handleMenu() {
        if (!isMenuOpen) {

            scrollPosition = window.scrollY
            document.body.style.overflow = `hidden`
            document.body.style.position = `fixed`
            document.body.style.top = `-${scrollPosition}px`
            document.body.style.width = `100%`

            shopMenuOverlayElement.classList.remove(`hidden`)
            shopMenuElement.classList.remove(`hidden`)
            setTimeout(() => {
                shopMenuOverlayElement.classList.replace(`opacity-0`, `opacity-100`)
                shopMenuElement.classList.replace(`opacity-0`, `opacity-100`)
                isMenuOpen = true
            }, 10)
        } else {

            document.body.style.removeProperty(`overflow`)
            document.body.style.removeProperty(`position`)
            document.body.style.removeProperty(`top`)
            document.body.style.removeProperty(`width`)
            window.scrollTo(0, scrollPosition)

            shopMenuOverlayElement.classList.replace(`opacity-100`, `opacity-0`)
            shopMenuElement.classList.replace(`opacity-100`, `opacity-0`)
            shopMenuElement.addEventListener(`transitionend`, () => {
                shopMenuOverlayElement.classList.add(`hidden`)
                shopMenuElement.classList.add(`hidden`)
                isMenuOpen = false
            }, { once: true })
        }
    }
}

function initSecurePopover() {

    const secureBtnElementList = document.querySelectorAll('[data-secure-action]');
    const secureCloseBtnElementList = document.querySelectorAll('[data-secure-close]');
    const securePopoverElement = document.getElementById('secure-popover');

    let popperInstanceList = [];

    secureCloseBtnElementList.forEach(secureCloseBtnElement => {secureCloseBtnElement.addEventListener('click', hideSecure)})
    
    secureBtnElementList.forEach((secureBtnElement, index) => {
        secureBtnElement.addEventListener('click', (event, secureBtnElement) => {handleSecureToggle(secureBtnElement, index)});

        const popperInstance = Popper.createPopper(secureBtnElement, securePopoverElement, {
            placement: 'top',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 24],
                    },
                },
            ],
        });
        popperInstanceList.push(popperInstance)
    })

    function handleSecureToggle(secureBtnElement, index) {
        securePopoverElement.classList.toggle('hidden');
        popperInstanceList[index].update();
    }

    function hideSecure() {
        securePopoverElement.classList.add('hidden');
    }

}

function initCartDrawer() {

    let scrollPosition = 0
    let drawerOpen = false;
    const backdropOpacity = 0.4;

    const cartBtnElementList = document.querySelectorAll('[data-cart-open]');
    cartBtnElementList.forEach((cartBtnElement) => {
        cartBtnElement.addEventListener('click', handleCartToggle);
    })

    const cartCloseBtnElement = document.getElementById('cart-close-btn');
    cartCloseBtnElement.addEventListener('click', handleCartToggle);

    const cartWrapperElement = document.getElementById('cart-drawer-overlay');
    const cartDrawerElement = document.getElementById('cart-drawer');

    cartWrapperElement.style.opacity = 0;
    cartDrawerElement.style.transform = 'translateX(100%)';
    cartWrapperElement.addEventListener('click', handleCartToggle);

    updateCartCount();

    function handleCartToggle(event) {

        event.preventDefault();

        if(drawerOpen === false) {

            scrollPosition = window.scrollY
            document.body.style.overflow = `hidden`
            document.body.style.position = `fixed`
            document.body.style.top = `-${scrollPosition}px`
            document.body.style.width = `100%`

            cartWrapperElement.classList.remove('hidden');
            cartDrawerElement.classList.remove('hidden');
            setTimeout(() => {
                cartWrapperElement.style.opacity = backdropOpacity;
                cartDrawerElement.style.transform = 'translateX(0%)';
            }, 20);
            drawerOpen = true
            handleCartFetch();
        } else if(drawerOpen === true) {

            document.body.style.removeProperty(`overflow`)
            document.body.style.removeProperty(`position`)
            document.body.style.removeProperty(`top`)
            document.body.style.removeProperty(`width`)
            window.scrollTo(0, scrollPosition)

            cartWrapperElement.style.opacity = 0;
            cartDrawerElement.style.transform = 'translateX(100%)';
            cartWrapperElement.addEventListener('transitionend', () => {
                cartWrapperElement.classList.add('hidden');
                cartDrawerElement.classList.add('hidden');
            }, {once:true})
            drawerOpen = false
        }
    }

    function handleCartFetch() {
        enableLoading()
        const section = 'cart-content'
        const elementCartDrawerContentSection = document.getElementById('cart-drawer-content');
        fetch(window.Shopify.routes.root + "?sections=" + section)
        .then((res) => {
            if(!res.ok) {
                throw new Error();
            }
            return res.json()
        })
        .then((data) => {
            elementCartDrawerContentSection.innerHTML = data[section];
            document.getElementById('shopify-section-'+section).classList.add('h-full', 'flex', 'flex-col', 'shrink', 'overflow-auto');
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            disableLoading()
            initCartAction();
            initSecurePopover();
        })

        function enableLoading() {
            document.querySelector('[data-cart-drawer-state="default"]').classList.add('hidden');
            document.querySelector('[data-cart-drawer-state="loading"]').classList.remove('hidden');
        }

        function disableLoading() {
            document.querySelector('[data-cart-drawer-state="default"]').classList.remove('hidden');
            document.querySelector('[data-cart-drawer-state="loading"]').classList.add('hidden');
        }

    }

    function initCartAction() {

        const cartDrawerElement = document.getElementById('cart-drawer')
        const cartActionElementList = cartDrawerElement.querySelectorAll('[data-cart-action]')

        const cartShopBtnElement = document.getElementById('cart-shop-btn');

        if(cartShopBtnElement !== null) {
            cartShopBtnElement.addEventListener('click', handleCartToggle);
        }

        cartActionElementList.forEach(cartActionElement => {
            cartActionElement.addEventListener('click', handleCartAction)
        })

        function handleCartAction(event) {
            let currentId = parseInt(event.currentTarget.dataset.cartItemId)
            let currentQuantity = parseInt(event.currentTarget.dataset.cartItemQuantity)

            let currentAction = event.currentTarget.dataset.cartAction
            if(currentAction === 'minus') {
                currentQuantity--;
            } else if(currentAction === 'plus') {
                currentQuantity++;
            }

            let formData = {
                'line': currentId,
                'quantity': currentQuantity
            };
    
            fetch(window.Shopify.routes.root + 'cart/change.js', {
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
                handleCartFetch();
            })

        }
    }
}