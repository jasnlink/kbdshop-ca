import Glide from "@glidejs/glide";
import { initAddCartAction } from "./lib";

window.addEventListener('DOMContentLoaded', (event) => {
    new Glide('.glide').mount();
    initAddCartAction();
    initProductTabAction();
    initCherryTabAction();
    initVariantSelector();
    initPurchaseOverlay();
});

function initPurchaseOverlay() {
    let options = {
        rootMargin: '0px',
        threshold: 1.0
    }
    
    let observeElement = document.querySelector('[data-overlay-listen]')
    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(observeElement);

    function handleIntersect(entries) {
        entries.forEach((entry) => {
            // isIntersecting means we see the target element (add to cart button)
            if (entry.isIntersecting) {
                document.querySelector('[data-overlay-action]').classList.add('hidden')
                document.querySelector('footer').classList.remove('mb-24')
            } else {
                document.querySelector('[data-overlay-action]').classList.remove('hidden')
                document.querySelector('footer').classList.add('mb-24')
            }
        });
    }
}

function initVariantSelector() {

    let selectionState = {}
    document.querySelectorAll('[data-selector-option-group-index]').forEach(element => {
        let targetOptionIndex = parseInt(element.dataset.selectorOptionGroupIndex)
        selectionState[targetOptionIndex] = {
            value: null
        }
    })
    
    document.querySelectorAll('[data-selector-element-type]').forEach(selectorElement => {
        let selectorType = selectorElement.dataset.selectorElementType
        if(selectorType === 'button') {
            document.querySelectorAll('[data-selector-element-type="button"] [data-selector-default]').forEach(element => handleSelection(element))
            let selectorActionElementList = document.querySelectorAll('[data-selector-action]');
            selectorActionElementList.forEach(element => {
                element.addEventListener('click', event => {
                    event.preventDefault();
                    handleSelection(event.currentTarget);
                })
            })
        } else if(selectorType === 'dropdown') {
            document.querySelectorAll('[data-selector-element-type="dropdown"] [data-selector-default]').forEach(element => handleSelection(element))
            selectorElement.addEventListener('change', event => {
                event.preventDefault();
                let selectedOption = event.target.options[event.target.options.selectedIndex]
                handleSelection(selectedOption);
            })
        }
    })

    function handleSelection(element) {
        let targetOptionIndex = parseInt(element.dataset.selectorAction)

        if(selectionState[targetOptionIndex]['value']) {
            document.querySelectorAll('[data-selector-option-group-index="'+targetOptionIndex+'"] [data-selector-option-value="'+selectionState[targetOptionIndex]['value']+'"]')
            .forEach((optionElement) => {
                optionElement.classList.remove('bg-black')
                optionElement.classList.remove('text-white')
                optionElement.classList.add('bg-white')
                optionElement.classList.add('text-black')
            })
        }
        selectionState[targetOptionIndex]['value'] = element.dataset.selectorOptionValue
        document.querySelectorAll('[data-selector-option-group-index="'+targetOptionIndex+'"] [data-selector-option-value="'+selectionState[targetOptionIndex]['value']+'"]')
        .forEach((optionElement) => {
            let optionGroupElement = optionElement.closest('[data-selector-element-type]')
            if(optionGroupElement.dataset.selectorElementType === 'dropdown') {
                optionGroupElement.selectedIndex = parseInt(optionElement.dataset.selectorOptionIndex)
            }
            optionElement.classList.remove('bg-white')
            optionElement.classList.remove('text-black')
            optionElement.classList.add('bg-black')
            optionElement.classList.add('text-white')
        })
        searchVariantList()
    }

    function searchVariantList() {
        let search = ''
        Object.keys(selectionState).forEach((key) => {
            search += '[data-selector-variant-option-'+key+'="'+selectionState[key]['value']+'"]'
        })
        let foundElement = document.querySelector(search)
        if(foundElement) {
            document.querySelectorAll('[data-add-cart]').forEach(element => {
                element.dataset.addCart = foundElement.dataset.selectorVariantId
                element.disabled = false
            })
            document.querySelectorAll('[data-product-display-price]').forEach(element => {
                element.dataset.productDisplayPrice = foundElement.dataset.selectorVariantPrice
            })
        } else {
            document.querySelectorAll('[data-add-cart]').forEach(element => {
                element.dataset.addCart = null
                element.disabled = true
            })
        }
    }

}

function initProductTabAction() {

    let currentTab = 0
    let productTabElementList = document.querySelectorAll('[data-product-tab-action]')
    productTabElementList.forEach(element => {
        element.addEventListener('click', event => {
            let currentTabElement = document.querySelector('[data-product-tab="'+currentTab+'"]')
            let currentTabActionElement = document.querySelector('[data-product-tab-action="'+currentTab+'"]')
            currentTabElement.classList.add('hidden')
            currentTabActionElement.classList.remove('font-bold')
            let nextTab = parseInt(event.currentTarget.dataset.productTabAction)
            let nextTabElement = document.querySelector('[data-product-tab="'+nextTab+'"]')
            let nextTabActionElement = document.querySelector('[data-product-tab-action="'+nextTab+'"]')
            nextTabElement.classList.remove('hidden')
            nextTabActionElement.classList.add('font-bold')
            currentTab = nextTab
        })
    })

}

function initCherryTabAction() {

    let currentTab = 0
    let cherryTabElementList = document.querySelectorAll('[data-cherry-tab-action]')
    cherryTabElementList.forEach(element => {
        element.addEventListener('click', event => {
            let currentTabElement = document.querySelector('[data-cherry-tab="'+currentTab+'"]')
            let currentTabActionElement = document.querySelector('[data-cherry-tab-action="'+currentTab+'"]')
            currentTabElement.classList.add('hidden')
            currentTabActionElement.classList.remove('bg-white')
            currentTabActionElement.classList.remove('text-black')
            currentTabActionElement.classList.add('bg-black')
            currentTabActionElement.classList.add('text-white')
            let nextTab = parseInt(event.currentTarget.dataset.cherryTabAction)
            let nextTabElement = document.querySelector('[data-cherry-tab="'+nextTab+'"]')
            let nextTabActionElement = document.querySelector('[data-cherry-tab-action="'+nextTab+'"]')
            nextTabElement.classList.remove('hidden')
            nextTabActionElement.classList.remove('bg-black')
            nextTabActionElement.classList.remove('text-white')
            nextTabActionElement.classList.add('bg-white')
            nextTabActionElement.classList.add('text-black')
            currentTab = nextTab
        })
    })

}