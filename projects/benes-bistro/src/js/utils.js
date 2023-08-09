function clearInner(node) {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
}

function clear(node) {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
}


export function createElement(
    elementName = "div",
    classlist = "",
    attributes = {
        id: "",
    }
) {
    const element = document.createElement(elementName);
    element.classList.add(...classlist.split(" "));

    for (let attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }

    return element;
}

export function query(selector = "") {
    return document.querySelector(selector)
}
export function queryAll(selector = '') {
    return document.querySelectorAll(selector)
}
export function addClickListener(element, callbackFn) {
    element.addEventListener("click", callbackFn)
}
export function createContainer() {
    return createElement("div", 'container')
}

export function createWrapper(parentNode, className = "", attributes = { id: "" }) {
    const container = createContainer()

    const wrapper = createElement("div", className, attributes)

    parentNode.appendChild(
        container
    )
    container.appendChild(wrapper)
    return wrapper
}

export function removeAllChildren(element) {
    clearInner(element)
}