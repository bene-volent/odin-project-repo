
class ListNode {
    /**
     * Node for Linked List
     * @param {any} value 
     */
    constructor(value) {
        this.value = value;
        this.next = null
    }
    /**
     * Return the next Node in the linkedList
     * @returns {ListNode | null}
     */
    getNext() {
        return this.next
    }
    /**
     * @param {ListNode} nextNode 
     */
    setNext(nextNode) {
        this.next = nextNode
    }
    hasNext() {
        return this.next !== null
    }

}

exports.ListNode = ListNode