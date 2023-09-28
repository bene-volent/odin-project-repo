const { ListNode } = require("./Node.js")

class LinkedList {
    constructor() {
        this.listHead = null
        this.length = 0
    }

    isEmpty() {
        return this.listHead === null
    }

    size() {
        return this.length
    }

    head() {
        return this.listHead
    }

    tail() {
        let current = this.listHead

        while (current.hasNext()) {
            current = current.getNext()
        }
        return current
    }

    /**
     * 
     * @param {Integer} index 
    *   @returns {Any | null}
     */
    at(index) {
        let current = this.listHead
        for (let i = 0; i < index; i++) {
            if (!current.hasNext()) return null
            current = current.getNext()
        }
        return current.value

    }

    append(value) {
        if (this.isEmpty()) {
            this.listHead = new ListNode(value)
        }
        else {
            let current = this.listHead

            while (current.hasNext()) {
                current = current.getNext()
            }
            current.setNext(new ListNode(value))
        }

        this.length++
    }


    prepend(value) {
        if (this.isEmpty()) {
            this.listHead = new ListNode(value)
        }
        else {
            let newNode = new ListNode(value)

            newNode.setNext(this.listHead)

            this.listHead = newNode
        }

        this.length++
    }

    /**
     * @returns {Any}
    *   @throws Will throw an error if List is empty
     */
    pop() {
        if (this.isEmpty()) throw new Error("List is Empty")
        else if (this.size() === 1) {
            let node = this.listHead.value
            this.listHead = null
            this.length--
            return
        }
        else {
            let current = this.listHead

            while (current.hasNext() && current.getNext().hasNext()) {
                current = current.getNext()
            }

            let value = current.getNext().value
            current.setNext(null)
            this.length--
            return value
        }
    }
    /**
     * 
     * @param {Any} value 
     * @returns {Any}
     */
    contains(value) {
        let current = this.listHead
        while (current) {
            if (current.value === value)
                return true;
            current = current.getNext()
        }
        return false
    }
    /**
     * 
     * @param {Any} value Find the index of the value in the list
     * @returns {Integer}
     */
    find(value) {
        let index = 0;
        let current = this.listHead
        while (current) {
            if (current.value === value) {
                return index
            }
            current = current.getNext()
        }
        return -1
    }

    /**
     * 
     * @returns {String}
     */
    toString() {
        let values = []
        let current = this.listHead

        while (current) {
            values.push(`( ${current.value} )`)
            current = current.getNext()
        }

        values.push(' null ')

        return values.join(" -> ")


    }
    
}

exports.LinkedList = LinkedList