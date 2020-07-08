function Node(data) {
  this.data = data;
  this.next = null;
}

function SinglyList() {
  this._length = 0;
  this.head = null;
}

SinglyList.prototype.add = function (value) {
  var node = new Node(value),
    currentNode = this.head;

  // 1st use-case: an empty list
  if (!currentNode) {
    this.head = node;
    this._length++;

    return node;
  }

  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = node;

  this._length++;

  return node;
};

SinglyList.prototype.searchNodeAt = function (position) {
  var currentNode = this.head,
    length = this._length,
    count = 1,
    message = { failure: "Failure: non-existent node in this list." };

  // 1st use-case: an invalid position
  if (length === 0 || position < 1 || position > length) {
    throw new Error(message.failure);
  }

  while (count < position) {
    currentNode = currentNode.next;
    count++;
  }

  return currentNode;
};

SinglyList.prototype.remove = function (position) {
  var currentNode = this. head,
    length = this._length,
    count = 0,
    message = { failure: "None existent node in this list." },
    beforeNodeToDelete = null,
    nodeToDelete = null,
    deletedNode = null;

  // 1st use-case: an invalid position
  if (position < 0 || position > length) {
    throw new Error(message.failure);
  }

  // 2nd use-case: the first node is removed
  if (position === 1) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length--;

    return deletedNode;
  }

  // 3rd use-case: any other node is removed
  while (count < position) {
    beforeNodeToDelete = currentNode;
    nodeToDelete = currentNode.next;
    count++;
  }

  beforeNodeToDelete.next = nodeToDelete.next;
  deletedNode = nodeToDelete;
  nodeToDelete = null;
  this._length--;

  return deletedNode;
};

function dNode(value) {
  this.data = value;
  this.previous = null;
  this.next = null;
}

function DoublyList() {
  this._length = 0;
  this.head = null;
  this.tail = null;
}

DoublyList.prototype.add = function (value) {
  var node = new dNode(value);

  if (!this._length) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }

  this._length++;

  return node;
};

DoublyList.prototype.searchNodeAt = function (position) {
  var currentNode = this.head,
    length = this._length,
    count = 1,
    message = { failure: "Failure: non-existent node in this list." };

  // 1st use-case: an invalid position
  if (length === 0 || position > length || position < 1) {
    throw new Error(message.failure);
  }

  //2nd use-case: a valid position
  while (count < position) {
    currentNode = currentNode.next;
    count++;
  }

  return currentNode;
};

DoublyList.prototype.remove = function (position) {
  var currentNode = this.head,
    length = this._length,
    message = {
      failure: "Failure: non-existent node in this list.",
      success: "Node deleted successfully",
    },
    beforeNodeToDelete = null,
    nodeToDelete = null,
    deletedNode = null,
    afterNodeToDelete = null;

  // 1st use-case: invalid position
  if (length === 0 || position < 1 || position > length) {
    throw new Error(message.failure);
  }

  // 2nd use-case: the first node is removed
  if (position == 1) {
    this.head = currentNode.next;

    // 2nd use-case: there is a second node
    if (this.head) {
      this.head.previous = null;
      // 2nd use-case: there is no second node
    } else {
      this.tail = null;
    }
    // 3rd use-case: the last node is removed
  } else if (position == length) {
    //nodeToDelete = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;
    // 4th use-case: middle node is removed
  } else {
    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    beforeNodeToDelete = currentNode.previous;
    nodeToDelete = currentNode;
    afterNodeToDelete = currentNode.next;

    beforeNodeToDelete.next = afterNodeToDelete;
    afterNodeToDelete.previous = beforeNodeToDelete;
    deletedNode = nodeToDelete;
  }

  this._length--;

  return message.success;
};

var mergeKLists = function (lists) {
  const merge = (l1, l2) => {
    if (!l1 || !l2 || !l1.head || !l2.head) return l1 || l2;
    let node = new SinglyList();
    let currentNode;
    //const root = node;
    while (l1.head && l2.head) {
      if (l1.head.data <= l2.head.data) {
        currentNode = node.add(l1.head.data);
        l1.remove(1);
      } else {
        currentNode = node.add(l2.head.data);
        l2.remove(1);
      }
    }

    if (l1.head && currentNode) {
      currentNode.next = l1.head;
      node._length += l1._length;
    }
    if (l2.head && currentNode) {
      currentNode.next = l2.head;
      node._length += l2._length;
    }
    return node;
  };

  let root = lists[0];
  for (let i = 1; i < lists.length; i++) {
    root = merge(root, lists[i]);
  }
  return root || null;
};

function createList(a1, a2, a3, a4) {
  let a = new SinglyList();
  a.add(a1);
  a.add(a2);
  a.add(a3);
  a.add(a4);
  return a;
}

let x1 = createList(1, 2, 3, 8);
let x2 = createList(2, 3, 4, 12);
let x3 = createList(3, 4, 5, 6);
let x4 = createList(5, 8, 15, 26);

var result = mergeKLists([x4, x1, x2, x3, null]);
//console.log(result);
let currentNode = result.head;
while (currentNode.next) {
  console.log(currentNode.data);
  currentNode = currentNode.next;
}
console.log(currentNode.data);
