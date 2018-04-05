var list1 = [
    { src: './bg1.jpg' },
    { src: './bg2.jpg' },
    { src: './bg3.jpg' },
    { src: './bg4.jpg' }
]
var list2 = [
    { src: './bg2.jpg' }
]

var transNewList = (nlist) => {
    let list = list1;
    let tl = list.filter(item => {
        let itemSameFlag = true;
        nlist.forEach(i => {
            if (i.src == item.src) {
                itemSameFlag = false;
                return;
            }
        })
        return itemSameFlag;
    })
    return tl;
}

let n = transNewList(list2)
console.log('n:',n);
