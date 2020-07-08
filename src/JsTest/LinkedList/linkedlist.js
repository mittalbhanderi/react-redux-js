/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
    
    this.Node = function(val, next) {
        this.val = val;
        this.next = next || null;
    }
    
    this.size = 0;
    this.head = null;    
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    var currentNode = this.head,
        length = this.size,
        count = 0;
    
    if (length == 0 || index < 0 || index >= length) {
        return -1;
    }
    
    while(count < index) {
        currentNode = currentNode.next;
        count++;
    }
    
    return currentNode.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    var node = new this.Node(val, this.head);   
    this.head = node;    
    this.size++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    var node = new this.Node(val),
        currentNode = this.head;
    
    if (!currentNode) {
        this.addAtHead(val);
        return;
    }
    
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
    
    currentNode.next = node;
    this.size++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    var length = this.size;

    if (index < 0 || index > length) {
        return;
    }
    
    if (index == 0) {
        this.head = new this.Node(val, this.head);
        this.size++;
        return;
    }

    var currentNode = this.head, 
        count = 1;

    while (count < index) {
        currentNode = currentNode.next;
        count++;
    }
    currentNode.next = new this.Node(val,currentNode.next);
    this.size++;
    return;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    var currentNode = this.head, 
        length = this.size,
        count = 1;

    if (index < 0 || index >= length) {
        return;
    }

    if (index == 0) {
        this.head = this.head.next;
        this.size--;
        return;
    }

    while (count < index) {
        currentNode = currentNode.next;
        count++;
    }

    currentNode.next = currentNode.next.next || null;
    this.size--;
    return;
    
};

 
//Your MyLinkedList object will be instantiated and called as such:
var linkedList = new MyLinkedList(); // Initialize empty LinkedList
linkedList.addAtHead(4);
console.log(linkedList.get(1)); 
linkedList.addAtHead(1);
linkedList.addAtHead(5);
linkedList.deleteAtIndex(3);  // now the linked list is 1->3
linkedList.addAtHead(7);
console.log(linkedList.get(3));            // returns 3
console.log(linkedList.get(3));            // returns 3
console.log(linkedList.get(3));            // returns 3
linkedList.addAtHead(1);
console.log(linkedList.get(4));            // returns 3

/*
linkedList.addAtIndex(0, 10);
linkedList.addAtIndex(0, 20);
linkedList.addAtTail(3);
linkedList.addAtIndex(1, 2);  // linked list becomes 1->2->3
console.log(linkedList.get(1));            // returns 2
console.log(linkedList.get(1));            // returns 3
linkedList.deleteAtIndex(1);  // now the linked list is 1->3
console.log(linkedList.get(0));            // returns 3
*/