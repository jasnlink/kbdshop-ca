import Glide from "@glidejs/glide";
import { initAddCartAction } from "./lib";

window.addEventListener('DOMContentLoaded', (event) => {
    new Glide('.glide').mount();
    initAddCartAction();
    initProductTabAction();
    initCherryTabAction();
});

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