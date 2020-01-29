export default function generateTree() {
    let tree = {
      0: {
        nodeId: 0,
        counter: 0,
        childNodeIds: []
      }
    }
  
    for (let i = 1; i < 10; i++) {
      let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
      tree[i] = {
        nodeId: i,
        counter: 0,
        childNodeIds: []
      }
      tree[parentId].childNodeIds.push(i)
    }
  
    return tree
  }
  